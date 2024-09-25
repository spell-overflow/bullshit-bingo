import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  tasks,
  tasklists,
  playfields,
  playfieldEntries,
} from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const bingoRouter = createTRPCRouter({
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
      .where(eq(tasks.tasklistId, taskListId));
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

  createPlayfield: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        const playfield = await ctx.db
          .insert(playfields)
          .values({
            userId,
          })
          .returning();

        const playfieldId = playfield[0]?.id;
        if (playfieldId) {
          const entries = input.map((text) => ({
            playfieldId,
            text,
            isCrossed: false,
          }));

          return ctx.db.insert(playfieldEntries).values(entries);
        }
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
});
