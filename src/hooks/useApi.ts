import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";
import type { Produce, RentalSpace, CommunityPost, PlantTracking, Order } from "@/types";

interface ApiList<T> { data: T[]; meta?: { page: number; limit: number; total: number; totalPages: number } }
interface ApiSingle<T> { data: T }

// ── Marketplace ──────────────────────────────────────────────────────────
export interface MarketplaceFilters {
  search?: string; category?: string; minPrice?: number; maxPrice?: number;
  certifiedOnly?: boolean; sortBy?: string; page?: number; limit?: number;
}

export function useMarketplace(filters: MarketplaceFilters) {
  return useQuery({
    queryKey: ["marketplace", filters],
    queryFn: async () => {
      const params: Record<string, unknown> = { page: filters.page ?? 1, limit: filters.limit ?? 12 };
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.certifiedOnly) params.certificationStatus = "APPROVED";
      if (filters.sortBy) params.sortBy = filters.sortBy;
      const { data } = await api.get<ApiList<Produce>>("/produce", { params });
      return data;
    },
    staleTime: 30_000,
    retry: 2,
  });
}

export function useProduceDetail(id: string) {
  return useQuery({
    queryKey: ["produce", id],
    queryFn: async () => {
      const { data } = await api.get<ApiSingle<Produce>>(`/produce/${id}`);
      return data.data;
    },
    enabled: !!id,
    staleTime: 60_000,
  });
}

// ── Rentals ──────────────────────────────────────────────────────────────
export interface RentalFilters { location?: string; minPrice?: number; maxPrice?: number; availability?: boolean; page?: number; limit?: number; }

export function useRentals(filters: RentalFilters) {
  return useQuery({
    queryKey: ["rentals", filters],
    queryFn: async () => {
      const params: Record<string, unknown> = { page: filters.page ?? 1, limit: filters.limit ?? 12 };
      if (filters.location) params.location = filters.location;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.availability !== undefined) params.availability = filters.availability;
      const { data } = await api.get<ApiList<RentalSpace>>("/rentals", { params });
      return data;
    },
    staleTime: 30_000,
    retry: 2,
  });
}

export function useRentalDetail(id: string) {
  return useQuery({
    queryKey: ["rental", id],
    queryFn: async () => {
      const { data } = await api.get<ApiSingle<RentalSpace>>(`/rentals/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// ── Community ────────────────────────────────────────────────────────────
export interface CommunityFilters { search?: string; tag?: string; page?: number; limit?: number; }

export function useCommunityPosts(filters: CommunityFilters) {
  return useQuery({
    queryKey: ["community", filters],
    queryFn: async () => {
      const params: Record<string, unknown> = { page: filters.page ?? 1, limit: filters.limit ?? 12 };
      if (filters.search) params.search = filters.search;
      if (filters.tag) params.tag = filters.tag;
      const { data } = await api.get<ApiList<CommunityPost>>("/community", { params });
      return data;
    },
    staleTime: 20_000,
    retry: 2,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { title: string; postContent: string; tags: string[] }) =>
      api.post("/community", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/community/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community"] }),
  });
}

// ── Plant Tracking ───────────────────────────────────────────────────────
export function useMyTrackings() {
  return useQuery({
    queryKey: ["tracking", "my"],
    queryFn: async () => {
      const { data } = await api.get<ApiList<PlantTracking>>("/tracking/my");
      return data.data ?? [];
    },
    staleTime: 15_000,
    retry: 2,
  });
}

export function useStartTracking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { rentalSpaceId: string; plantName: string; healthNotes?: string; plantedDate?: string }) =>
      api.post("/tracking", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracking"] }),
  });
}

export function useUpdateTrackingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, healthNotes }: { id: string; status: string; healthNotes?: string }) =>
      api.patch(`/tracking/${id}/status`, { status, healthNotes }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracking"] }),
  });
}

export function useDeleteTracking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/tracking/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tracking"] }),
  });
}

// ── Orders ───────────────────────────────────────────────────────────────
export function useMyOrders(page = 1, status?: string) {
  return useQuery({
    queryKey: ["orders", "my", page, status],
    queryFn: async () => {
      const params: Record<string, unknown> = { page, limit: 10 };
      if (status) params.status = status;
      const { data } = await api.get<ApiList<Order>>("/orders/my", { params });
      return data;
    },
    staleTime: 15_000,
    retry: 2,
  });
}

export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ produceId, quantity }: { produceId: string; quantity: number }) =>
      api.post("/orders", { produceId, quantity }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/orders/${id}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ── Vendor: own produce + stats ──────────────────────────────────────────
export function useVendorProduce(page = 1) {
  return useQuery({
    queryKey: ["vendor-produce", page],
    queryFn: async () => {
      const { data } = await api.get<ApiList<Produce>>("/produce/my/listings", { params: { page, limit: 20 } });
      return data;
    },
    staleTime: 20_000,
  });
}

export function useVendorCerts() {
  return useQuery({
    queryKey: ["vendor-certs"],
    queryFn: async () => {
      const { data } = await api.get("/certifications/my");
      return data.data ?? [];
    },
    staleTime: 30_000,
  });
}

// ── Admin stats ──────────────────────────────────────────────────────────
export function useAdminUsers(page = 1, role?: string) {
  return useQuery({
    queryKey: ["admin-users", page, role],
    queryFn: async () => {
      const params: Record<string, unknown> = { page, limit: 20 };
      if (role) params.role = role;
      const { data } = await api.get("/users", { params });
      return data;
    },
    staleTime: 20_000,
  });
}

export function useAdminCerts(status?: string) {
  return useQuery({
    queryKey: ["admin-certs", status],
    queryFn: async () => {
      const params: Record<string, unknown> = { limit: 50 };
      if (status) params.status = status;
      const { data } = await api.get("/certifications", { params });
      return data;
    },
    staleTime: 20_000,
  });
}

export function useAdminVendors(certStatus?: string) {
  return useQuery({
    queryKey: ["admin-vendors", certStatus],
    queryFn: async () => {
      const params: Record<string, unknown> = { limit: 50 };
      if (certStatus) params.certStatus = certStatus;
      const { data } = await api.get("/vendors", { params });
      return data;
    },
    staleTime: 20_000,
  });
}

// ── Auth/me ──────────────────────────────────────────────────────────────
export function useMe(enabled: boolean) {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data.data;
    },
    enabled,
    staleTime: 60_000,
    retry: 1,
  });
}
