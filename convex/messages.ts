import { DatabaseReader, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ensure } from "../src/common/misc/ensure";
import { iife, pick } from "../src/common/misc/misc";
import { findMe, getMe } from "./utils/misc";
import { Doc } from "./_generated/dataModel";

const convertToDetailedMessage = async ({
  db,
  messages,
  me,
}: {
  db: DatabaseReader;
  messages: Doc<"messages">[];
  me?: Doc<"users">;
}) =>
  Promise.all(
    messages.map(async (message) => ({
      ...message,
      isLikedByMe: await iife(async () => {
        if (!me) return false;
        const like = await db
          .query("likes")
          .withIndex("by_messageId_likerId", (q) =>
            q.eq("messageId", message._id).eq("likerId", me._id),
          )
          .unique();
        return like != null;
      }),
      author: await iife(async () => {
        const user = ensure(await db.get(message.authorId), `missing message author`);
        return pick(user, "_id", "name", "handle", "pictureUrl");
      }),
    })),
  );

export const listAll = query({
  args: {},
  handler: async (context) => {
    const me = await findMe(context);
    const messages = await context.db
      .query("messages")
      .filter((q) => q.eq(q.field("isReplyToMessageId"), undefined))
      .take(10);
    return convertToDetailedMessage({ ...context, messages, me });
  },
});

export const listForList = query({
  args: {
    listId: v.id("lists"),
  },
  handler: async (context, { listId }) => {
    const me = await getMe(context);
    const list = await context.db.get(listId);
    if (!list) throw new Error(`cant find list ${listId}`);
    if (list.ownerId != me._id) throw new Error(`cant access list ${listId}`);

    const messages = list.query
      ? await context.db
          .query("messages")
          .withSearchIndex("search_by_body", (q) => q.search("body", list.query))
          .filter((q) => q.eq(q.field("isReplyToMessageId"), undefined))
          .take(10)
      : await context.db
          .query("messages")
          .filter((q) => q.eq(q.field("isReplyToMessageId"), undefined))
          .take(10);

    return convertToDetailedMessage({ ...context, messages, me });
  },
});

export const listReplies = query({
  args: {
    toMessageId: v.id("messages"),
  },
  handler: async (context, { toMessageId }) => {
    const me = await findMe(context);

    const messages = await context.db
      .query("messages")
      .filter((q) => q.eq(q.field("isReplyToMessageId"), toMessageId))
      .take(10);

    return convertToDetailedMessage({ ...context, messages, me });
  },
});

export const send = mutation({
  args: {
    body: v.string(),
  },
  handler: async ({ auth, db }, { body }) => {
    const user = await getMe({ auth, db });
    await db.insert("messages", { body, authorId: user._id, likes: BigInt(0), replies: BigInt(0) });
  },
});

export const reply = mutation({
  args: {
    body: v.string(),
    toMessageId: v.id("messages"),
  },
  handler: async ({ auth, db }, { body, toMessageId }) => {
    const user = await getMe({ auth, db });
    await db.insert("messages", {
      body,
      authorId: user._id,
      likes: BigInt(0),
      isReplyToMessageId: toMessageId,
      replies: BigInt(0),
    });
    const message = ensure(await db.get(toMessageId), `couldnt get message ${toMessageId}`);
    await db.patch(toMessageId, { replies: message.replies + BigInt(1) });
  },
});
