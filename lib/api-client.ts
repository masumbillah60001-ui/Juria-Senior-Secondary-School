type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
};

const BASE_URL = "/api/v1";

async function fetcher<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", headers = {}, body, ...restOptions } = options;

    const config: RequestInit & { next?: NextFetchRequestConfig } = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...restOptions,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `API Error: ${response.statusText}`);
    }

    return response.json();
}

export const apiClient = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: "POST", body }),

    put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: "PUT", body }),

    patch: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: "PATCH", body }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        fetcher<T>(endpoint, { ...options, method: "DELETE" }),
};
