import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    authorId: v.id("users"),
    body: v.string(),
    likes: v.int64(),
  }).searchIndex("search_by_body", {
    searchField: "body",
    filterFields: ["authorId"],
  }),

  users: defineTable({
    handle: v.string(),
    name: v.string(),
    pictureUrl: v.union(v.string(), v.null()),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_handle", ["handle"]),

  lists: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    query: v.string(),
  }).index("by_ownerId", ["ownerId"]),

  likes: defineTable({
    likerId: v.id("users"),
    messageId: v.id("messages"),
  })
    .index("by_likerId", ["likerId"])
    .index("by_messageId", ["messageId"])
    .index("by_messageId_likerId", ["messageId", "likerId"]),
});
