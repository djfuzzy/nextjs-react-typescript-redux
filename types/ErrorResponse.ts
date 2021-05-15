export type ErrorResponse = {
  title: string;
  content: string;
};

export const isErrorResponse = (
  error: ErrorResponse | string | undefined
): error is ErrorResponse => (error as ErrorResponse)?.title !== undefined;
