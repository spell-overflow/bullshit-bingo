import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks, tasklists } from "~/server/db/schema";
import { eq } from "drizzle-orm";

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
});
