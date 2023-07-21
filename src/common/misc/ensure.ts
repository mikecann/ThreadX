import { isKind } from "./filter";

export const ensureNotUndefined = <T>(
  obj: T | undefined,
  err = `variable was undefined when it shouldnt have been.`
): T => {
  if (obj === undefined) throw new Error(err);
  return obj;
};

export const ensureNotNull = <T>(
  obj: T | null,
  err = `variable was null when it shouldnt have been.`
): T => {
  if (obj === null) throw new Error(err);
  return obj;
};

export const ensure = <T>(
  obj: Nullable<T>,
  err = `variable was undefined or null when it shouldnt have been.`
): T => {
  obj = ensureNotUndefined(obj, err);
  obj = ensureNotNull(obj, err);
  return obj;
};

export const createEnsurer =
  <TVal, TArgs>(
    fn: (...args: TArgs[]) => TVal | undefined | null,
    err = `variable was undefined or null when it shouldnt have been.`
  ) =>
  (...args: TArgs[]) =>
    ensure(fn(...args), err);

export const ensureFP =
  (err = `variable was undefined or null when it shouldnt have been.`) =>
  <T>(obj: Nullable<T>): T => {
    obj = ensureNotUndefined(obj, err);
    obj = ensureNotNull(obj, err);
    return obj;
  };

export const ensureNotUndefinedFP =
  (err = `variable was undefined when it shouldnt have been.`) =>
  <T>(obj: T | undefined): T => {
    if (obj === undefined) throw new Error(err);
    return obj;
  };

export const ensureKind = <
  TKindable extends {
    kind: string;
  },
  TKind extends TKindable["kind"]
>(
  kind: TKind,
  val: TKindable
): Extract<TKindable, { kind: TKind }> => {
  if (!isKind(kind)(val)) throw new Error(`Expected ${kind} but got ${val.kind}`);
  return val as any;
};

export type Nullable<T> = T | undefined | null;
