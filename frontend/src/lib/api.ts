import axios from "axios";

const API_URL = "http://localhost:5050/api";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Only redirect if we aren't already on the login page
      if (!window.location.pathname.includes("login")) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

// --- TYPES ---
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageUrl: string;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

// --- ACTIONS ---
export const authActions = {
  // .NET Identity API returns { accessToken, refreshToken, expiresIn, ... }
  login: (credentials: unknown) =>
    api.post("/auth/login", credentials).then((res) => res.data),
  register: (data: unknown) => api.post("/auth/register", data),
};

export const productActions = {
  getAll: () => api.get<Product[]>("/product").then((res) => res.data),
  getOne: (id: number) =>
    api.get<Product>(`/product/${id}`).then((res) => res.data),
  create: (data: unknown) => api.post("/product", data).then((res) => res.data),
};

export const orderActions = {
  placeOrder: (order: { productId: number; quantity: number }) =>
    api.post<Order>("/order", order).then((res) => res.data),
  getAll: () => api.get<Order[]>("/order").then((res) => res.data),
};

export const paymentActions = {
  createSession: (orderId: number) =>
    api
      .post<{ url: string }>("/payment/create-session", { OrderId: orderId })
      .then((res) => res.data),
};
