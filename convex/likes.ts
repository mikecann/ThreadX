import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getMe } from "./utils/misc";
import { ensure } from "../src/common/misc/ensure";

export const create = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async ({ auth, db }, { messageId }) => {
    const user = await getMe({ auth, db });
    const message = ensure(await db.get(messageId), `couldnt get message ${messageId}`);
    const existing = await db
      .query("likes")
      .withIndex("by_messageId_likerId", (q) =>
        q.eq("messageId", messageId).eq("likerId", user._id),
      )
      .unique();

    if (existing) throw new Error("cant like same message twice");

    await db.insert("likes", { likerId: user._id, messageId });
    await db.patch(message._id, { likes: message.likes + BigInt(1) });
  },
});

export const remove = mutation({
  args: {
    id: v.id("likes"),
  },
  handler: async ({ auth, db }, { id }) => {
    const user = await getMe({ auth, db });
    const like = ensure(await db.get(id), `couldnt get like ${id}`);
    if (like.likerId !== user._id) throw new Error("not allowed");
    await db.delete(id);
    const message = ensure(await db.get(like.messageId), `couldnt get message ${id}`);
    await db.patch(message._id, { likes: message.likes - BigInt(1) });
  },
});

export const removeForMessage = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (context, { messageId }) => {
    const user = await getMe(context);

    const like = await context.db
      .query("likes")
      .withIndex("by_messageId_likerId", (q) =>
        q.eq("messageId", messageId).eq("likerId", user._id),
      )
      .unique();

    if (!like) return;

    await remove(context, { id: like._id });
  },
});
