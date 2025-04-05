import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      retry: 1,
    },
  },
});

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type ApiRequestProps = {
  path: string;
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
};

// Helper for making API requests with fetch
export async function apiRequest<T>({
  path,
  method = 'GET',
  body,
  headers = {},
}: ApiRequestProps): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 
      `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}