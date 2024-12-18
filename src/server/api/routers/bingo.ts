import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  tasks,
  tasklists,
  playfields,
  playfieldEntries,
  games,
  gameToPlayfield,
} from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const bingoRouter = createTRPCRouter({
  getUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user.id;
  }),

  getTasks: protectedProcedure.query(async ({ ctx }) => {
    const taskListId = (
      await ctx.db
        .select({ id: tasklists.id })
        .from(tasklists)
        .where(eq(tasklists.userId, ctx.session.user.id))
        .limit(1)
    )[0]?.id;
    if (!taskListId) {
      return [];
    }
    return ctx.db
      .select({
        id: tasks.id,
        text: tasks.text,
      })
      .from(tasks)
      .where(eq(tasks.tasklistId, taskListId))
      .orderBy(desc(tasks.createdAt));
  }),

  addTask: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      let tasklistId = (
        await ctx.db
          .select({ id: tasklists.id })
          .from(tasklists)
          .where(eq(tasklists.userId, ctx.session.user.id))
          .limit(1)
      )[0]?.id;
      if (!tasklistId) {
        tasklistId = (
          await ctx.db
            .insert(tasklists)
            .values({ name: "unnamed", userId: ctx.session.user.id })
            .returning()
        )[0]?.id;
        if (!tasklistId) {
          throw "Inserting new tasklist into database failed unexpected";
        }
      }
      return ctx.db.insert(tasks).values({ tasklistId, text: input });
    }),

  deleteTask: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(tasks).where(eq(tasks.id, input));
    }),

  deleteTasklist: protectedProcedure.mutation(async ({ ctx }) => {
    const tasklist = await ctx.db
      .select({ id: tasklists.id })
      .from(tasklists)
      .where(eq(tasklists.userId, ctx.session.user.id));
    if (!tasklist) {
      throw new Error("Tasklist not found");
    }
    const taskListId = tasklist[0]?.id;
    if (taskListId) {
      await ctx.db.delete(tasks).where(eq(tasks.tasklistId, taskListId));
      return { success: true };
    }
  }),

  createGame: protectedProcedure
    .input(z.object({ name: z.string(), entries: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        return ctx.db.transaction(async (tx) => {
          const playfield = await tx
            .insert(playfields)
            .values({
              userId,
            })
            .returning();
          const playfieldId = playfield[0]?.id;
          if (playfieldId) {
            const entries = input.entries.map((text) => ({
              playfieldId,
              text,
              isCrossed: false,
            }));
            await tx.insert(playfieldEntries).values(entries);
          }

          const game = await tx
            .insert(games)
            .values({ userId: ctx.session.user.id, name: input.name })
            .returning();
          const gameId = game[0]?.id;
          if (gameId && playfieldId) {
            return tx.insert(gameToPlayfield).values({
              gameId,
              playfieldId,
            });
          }
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    }),

  getPlayfield: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(playfields)
      .leftJoin(
        playfieldEntries,
        eq(playfields.id, playfieldEntries.playfieldId),
      )
      .where(eq(playfields.userId, ctx.session.user.id))
      .orderBy(desc(playfields.updatedAt));
  }),

  deletePlayfield: protectedProcedure.mutation(async ({ ctx }) => {
    const playfield = await ctx.db
      .select({ id: playfields.id })
      .from(playfields)
      .where(eq(playfields.userId, ctx.session.user.id));
    if (!playfield) {
      throw new Error("Playfield not found");
    }
    const playfieldId = playfield[0]?.id;
    if (playfieldId) {
      await ctx.db
        .delete(playfieldEntries)
        .where(eq(playfieldEntries.playfieldId, playfieldId));
      await ctx.db.delete(playfields).where(eq(playfields.id, playfieldId));
    }
    return { success: true };
  }),

  getGames: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(games)
      .where(eq(games.userId, ctx.session.user.id))
      .orderBy(desc(games.updatedAt));
  }),
});
