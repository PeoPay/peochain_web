import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Helper function to get the stored API key
function getApiKey(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminApiKey');
  }
  return null;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: HeadersInit = {
    ...(data ? { "Content-Type": "application/json" } : {})
  };
  
  // Add API key for analytics endpoints
  const apiKey = getApiKey();
  if (apiKey && url.includes('/api/analytics')) {
    headers['x-api-key'] = apiKey;
  }
  
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const headers: HeadersInit = {};
    
    // Add API key for analytics endpoints
    const apiKey = getApiKey();
    if (apiKey && url.includes('/api/analytics')) {
      headers['x-api-key'] = apiKey;
    }
    
    const res = await fetch(url, {
      credentials: "include",
      headers
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    const data = await res.json();
    return data.data || data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
