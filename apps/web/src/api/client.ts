import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
let accessToken: string | null = localStorage.getItem("accessToken");
let isRefreshing = false;
let pendingQueue: Array<{ resolve: (token: string | null) => void; reject: (err: any) => void }> = [];

function processQueue(error: any, token: string | null = null) {
  pendingQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  pendingQueue = [];
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/login") &&
      !original.url.includes("/auth/register")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && original.headers) {
              original.headers.Authorization = `Bearer ${token}`;
            }
            return api(original);
          })
          .catch((err) => Promise.reject(err));
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const resp = await api.post("/api/v1/auth/refresh");
        const newToken = resp.data.accessToken as string;
        setAccessToken(newToken);
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(original);
      } catch (err) {
        setAccessToken(null);
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
