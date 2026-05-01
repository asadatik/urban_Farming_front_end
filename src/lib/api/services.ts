import api from "./client";
import type { Produce, Order, PlantTracking, RentalSpace, SustainabilityCert, User } from "@/types";

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  signup: (name: string, email: string, password: string, role: string) =>
    api.post("/auth/signup", { name, email, password, role }),
  me: () => api.get("/auth/me"),
};

export const produceApi = {
  list: (params: Record<string, unknown>) =>
    api.get<{ data: Produce[]; meta: unknown }>("/produce", { params }),
  getById: (id: string) => api.get<{ data: Produce }>(`/produce/${id}`),
  myListings: (params?: Record<string, unknown>) =>
    api.get("/produce/my/listings", { params }),
  create: (data: Partial<Produce>) => api.post("/produce", data),
  update: (id: string, data: Partial<Produce>) => api.patch(`/produce/${id}`, data),
  remove: (id: string) => api.delete(`/produce/${id}`),
  updateCert: (id: string, status: string) =>
    api.patch(`/produce/${id}/certification`, { certificationStatus: status }),
};

export const orderApi = {
  place: (produceId: string, quantity: number) =>
    api.post("/orders", { produceId, quantity }),
  mine: (params?: Record<string, unknown>) => api.get("/orders/my", { params }),
  getById: (id: string) => api.get<{ data: Order }>(`/orders/${id}`),
  cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
  all: (params?: Record<string, unknown>) => api.get("/orders", { params }),
};

export const vendorApi = {
  getById: (id: string) => api.get(`/vendors/${id}`),
  updateProfile: (data: Record<string, unknown>) =>
    api.patch("/vendors/me/profile", data),
  all: (params?: Record<string, unknown>) => api.get("/vendors", { params }),
  approve: (id: string, status: "APPROVED" | "REJECTED") =>
    api.patch(`/vendors/${id}/approve`, { status }),
};

export const rentalApi = {
  list: (params?: Record<string, unknown>) => api.get("/rentals", { params }),
  getById: (id: string) => api.get<{ data: RentalSpace }>(`/rentals/${id}`),
  create: (data: Partial<RentalSpace>) => api.post("/rentals", data),
  update: (id: string, data: Partial<RentalSpace>) =>
    api.patch(`/rentals/${id}`, data),
  remove: (id: string) => api.delete(`/rentals/${id}`),
};

export const certApi = {
  mine: () => api.get("/certifications/my"),
  submit: (data: Record<string, unknown>) => api.post("/certifications", data),
  all: (params?: Record<string, unknown>) =>
    api.get("/certifications", { params }),
  review: (id: string, status: string, adminNotes?: string) =>
    api.patch(`/certifications/${id}/review`, { status, adminNotes }),
};

export const trackingApi = {
  start: (data: Record<string, unknown>) => api.post("/tracking", data),
  mine: (params?: Record<string, unknown>) =>
    api.get("/tracking/my", { params }),
  updateStatus: (id: string, status: string, healthNotes?: string) =>
    api.patch(`/tracking/${id}/status`, { status, healthNotes }),
  remove: (id: string) => api.delete(`/tracking/${id}`),
  all: (params?: Record<string, unknown>) => api.get("/tracking", { params }),
};

export const userApi = {
  all: (params?: Record<string, unknown>) => api.get("/users", { params }),
  getById: (id: string) => api.get<{ data: User }>(`/users/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/users/${id}/status`, { status }),
  remove: (id: string) => api.delete(`/users/${id}`),
};
