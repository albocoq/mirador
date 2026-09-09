export type ActionResult<T> = {
  data: T | null;
  error: string | null;
};

export function success<T>(data: T): ActionResult<T> {
  return { data, error: null };
}

export function failure<T = never>(error: string): ActionResult<T> {
  return { data: null, error };
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}
