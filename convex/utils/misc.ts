import { QueryCtx } from "../_generated/server";
import { ensure } from "../../src/common/misc/ensure";

export const findMe = async ({ auth, db }: { auth: QueryCtx["auth"]; db: QueryCtx["db"] }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) return undefined;

  const user = ensure(
    await db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique(),
    "couldnt find user",
  );

  return user;
};

export const getMe = async ({ auth, db }: { auth: QueryCtx["auth"]; db: QueryCtx["db"] }) => {
  return ensure(await findMe({ auth, db }), "couldnt find user");
};
