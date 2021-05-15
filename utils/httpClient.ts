class HttpError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const get = async <T>(path: string): Promise<T> => {
  return await request<T>(path, 'get');
};

export const post = async <T>(path: string, payload: T): Promise<T> => {
  return await request<T>(path, 'post', payload);
};

export const put = async <T>(path: string, payload: T): Promise<T> => {
  return await request<T>(path, 'put', payload);
};

const request = async <T>(
  path: string,
  method: string,
  payload?: T
): Promise<T> => {
  // const token = await authService.getAccessToken();

  let request = {
    method,
  } as RequestInit;

  // if (token) {
  //   request = {
  //     ...request,
  //     headers: { ...request.headers, Authorization: `Bearer ${token}` },
  //   };
  // }

  if (payload) {
    request = {
      ...request,
      headers: { ...request.headers, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    };
  }

  const response = await fetch(new Request(path, request));

  if (response.ok) {
    return response.json();
  } else {
    throw new HttpError(`Error response: ${response.status}`, response.status);
  }
};
