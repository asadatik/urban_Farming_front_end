export type Role = "ADMIN" | "VENDOR" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type CertStatus = "PENDING" | "APPROVED" | "REJECTED";
export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PlantStatus = "SEEDLING" | "GROWING" | "FLOWERING" | "FRUITING" | "HARVESTING" | "HARVESTED";
export type ProduceCategory = "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  vendorProfile?: VendorProfile;
}

export interface VendorProfile {
  id: string;
  userId: string;
  farmName: string;
  farmLocation: string;
  farmDescription?: string;
  certificationStatus: CertStatus;
}

export interface Produce {
  id: string;
  vendorId: string;
  name: string;
  description?: string;
  price: number;
  category: ProduceCategory;
  certificationStatus: CertStatus;
  availableQuantity: number;
  imageUrl?: string;
  isActive: boolean;
  vendor?: Pick<VendorProfile, "id" | "farmName" | "farmLocation">;
}

export interface RentalSpace {
  id: string;
  vendorId: string;
  location: string;
  size: string;
  price: number;
  availability: boolean;
  description?: string;
  vendor?: Pick<VendorProfile, "id" | "farmName" | "farmLocation">;
}

export interface Order {
  id: string;
  userId: string;
  produceId: string;
  vendorId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  orderDate: string;
  produce?: Pick<Produce, "id" | "name" | "imageUrl" | "price">;
}

export interface PlantTracking {
  id: string;
  userId: string;
  rentalSpaceId: string;
  plantName: string;
  status: PlantStatus;
  healthNotes?: string;
  plantedDate: string;
  harvestDate?: string;
  rentalSpace?: Pick<RentalSpace, "id" | "location" | "size">;
}

export interface CommunityPost {
  id: string;
  userId: string;
  title: string;
  postContent: string;
  tags: string[];
  postDate: string;
  user?: Pick<User, "id" | "name" | "role">;
}

export interface SustainabilityCert {
  id: string;
  vendorId: string;
  certifyingAgency: string;
  certificationDate: string;
  expiryDate?: string;
  documentUrl?: string;
  certificationStatus: CertStatus;
  adminNotes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number; totalPages: number };
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  roles?: Role[];
}
