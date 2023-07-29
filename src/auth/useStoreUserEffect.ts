import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useErrors } from "../common/misc/useErrors";
import { iife } from "../common/misc/misc";

// This function "syncs" the Clerk user with the Convex user.
export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();
  const { user: clerkUser } = useUser();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation(api.users.store);
  const { onNonCriticalError } = useErrors();

  useEffect(() => {
    if (!isAuthenticated) return;
    iife(storeUser).catch(onNonCriticalError);
    return () => setUserId(null);
  }, [isAuthenticated, storeUser, clerkUser?.id]);

  return userId;
}
