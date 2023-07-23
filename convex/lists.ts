import { DatabaseReader, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getMe } from "./utils/misc";
import { ensure } from "../src/common/misc/ensure";
import { Doc } from "./_generated/dataModel";

const getListsForUser = ({ db, user }: { db: DatabaseReader; user: Doc<"users"> }) =>
  db
    .query("lists")
    .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
    .order("asc")
    .collect();

export const list = query({
  args: {},
  handler: async ({ db, auth }) => {
    const user = await getMe({ auth, db });
    const lists = await getListsForUser({ db, user });
    return lists;
  },
});

export const create = mutation({
  args: {
    data: v.union(
      v.object({
        kind: v.literal("all_messages"),
        name: v.string(),
      }),
      v.object({
        kind: v.literal("search"),
        name: v.string(),
        query: v.string(),
        includeReplies: v.boolean(),
      }),
    ),
  },
  handler: async ({ auth, db }, { data }) => {
    const user = await getMe({ auth, db });

    const count = await getListsForUser({ db, user }).then((c) => c.length);

    if (count >= 10) throw new Error("too many lists.");

    await db.insert("lists", { ...data, ownerId: user._id });
  },
});

export const remove = mutation({
  args: {
    id: v.id("lists"),
  },
  handler: async ({ auth, db }, { id }) => {
    const user = await getMe({ auth, db });
    const list = ensure(await db.get(id), `couldnt get list ${id}`);
    if (list.ownerId !== user._id) throw new Error("not allowed");
    await db.delete(id);
  },
});
