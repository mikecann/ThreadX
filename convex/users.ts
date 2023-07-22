import { mutation, query } from "./_generated/server";
import { ensure } from "../src/common/misc/ensure";
import { generateRandomHandle } from "../src/common/misc/generateHandle";
import { iife } from "../src/common/misc/misc";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = ensure(await ctx.auth.getUserIdentity(), `not authenticated`);

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) await ctx.db.patch(user._id, { name: identity.name });
      if (user.pictureUrl !== identity.pictureUrl)
        await ctx.db.patch(user._id, { pictureUrl: identity.pictureUrl ?? null });
      return user._id;
    }

    // Generate a random handle gaurenteeing uniqueness
    const handle = await iife(async () => {
      const handle = generateRandomHandle();
      let existingUser: Doc<"users"> | null;
      do {
        existingUser = await ctx.db
          .query("users")
          .withIndex("by_handle", (q) => q.eq("handle", handle))
          .unique();
      } while (existingUser != null);
      return handle;
    });

    // Create a the new user
    const createdUser = await ctx.db.insert("users", {
      name: identity.name!,
      handle,
      tokenIdentifier: identity.tokenIdentifier,
      pictureUrl: identity.pictureUrl ?? null,
    });

    // While we are at it lets create the initial list for the user
    await ctx.db.insert("lists", { name: "All Threads", ownerId: createdUser, query: "" });

    return createdUser;
  },
});

export const get = query({
  args: { id: v.id("users") },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});
