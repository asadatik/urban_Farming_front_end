import { useQuery } from "@tanstack/react-query";
import type { Produce } from "@/types";

export const MOCK_PRODUCE: Produce[] = [
  { id: "p1",  vendorId: "v1", name: "Heirloom Cherry Tomatoes",  description: "Vine-ripened cherry tomatoes bursting with sweetness. Grown without pesticides in urban rooftop plots.",          price: 6.99,  category: "VEGETABLES", certificationStatus: "APPROVED", availableQuantity: 120, imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=Tomatoes",   isActive: true, vendor: { id: "v1", farmName: "Green Acres Farm",   farmLocation: "Brooklyn, NY" } },
  { id: "p2",  vendorId: "v2", name: "Organic Basil Bunch",        description: "Fresh Genovese basil, hand-picked daily. Perfect for pesto, salads, and garnishes.",                               price: 3.50,  category: "HERBS",      certificationStatus: "APPROVED", availableQuantity: 80,  imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=Basil",     isActive: true, vendor: { id: "v2", farmName: "Urban Roots Co.",    farmLocation: "Austin, TX"   } },
  { id: "p3",  vendorId: "v1", name: "Rainbow Chard",              description: "Vibrant, nutrient-rich rainbow chard with tender stems. A superstar in stir-fries and smoothies.",                 price: 5.25,  category: "VEGETABLES", certificationStatus: "APPROVED", availableQuantity: 65,  imageUrl: "https://placehold.co/600x400/0f172a/34d399?text=Chard",     isActive: true, vendor: { id: "v1", farmName: "Green Acres Farm",   farmLocation: "Brooklyn, NY" } },
  { id: "p4",  vendorId: "v3", name: "Strawberry Punnet",          description: "Locally grown strawberries picked at peak ripeness. Sweet, juicy, and 100% spray-free.",                          price: 8.99,  category: "FRUITS",     certificationStatus: "APPROVED", availableQuantity: 45,  imageUrl: "https://placehold.co/600x400/0f172a/f43f5e?text=Strawberry", isActive: true, vendor: { id: "v3", farmName: "Metro Garden Hub",  farmLocation: "Chicago, IL"  } },
  { id: "p5",  vendorId: "v2", name: "Microgreen Mix",             description: "A blend of sunflower, pea shoots, and radish microgreens. Packed with nutrients and ready to eat.",               price: 7.50,  category: "VEGETABLES", certificationStatus: "APPROVED", availableQuantity: 90,  imageUrl: "https://placehold.co/600x400/0f172a/6ee7b7?text=Microgreens", isActive: true, vendor: { id: "v2", farmName: "Urban Roots Co.",    farmLocation: "Austin, TX"   } },
  { id: "p6",  vendorId: "v4", name: "Lavender Honey",             description: "Raw wildflower honey infused with dried lavender from our urban apiary. Rich, floral and unfiltered.",            price: 14.00, category: "OTHER",      certificationStatus: "APPROVED", availableQuantity: 30,  imageUrl: "https://placehold.co/600x400/0f172a/fbbf24?text=Honey",     isActive: true, vendor: { id: "v4", farmName: "Skyline Sprouts",   farmLocation: "Seattle, WA"  } },
  { id: "p7",  vendorId: "v3", name: "Heritage Tomato Seed Kit",   description: "A curated kit of 6 heirloom tomato varieties. Perfect for first-time gardeners and balcony growers.",            price: 9.99,  category: "SEEDS",      certificationStatus: "APPROVED", availableQuantity: 200, imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=Seeds",     isActive: true, vendor: { id: "v3", farmName: "Metro Garden Hub",  farmLocation: "Chicago, IL"  } },
  { id: "p8",  vendorId: "v5", name: "Mint & Lemon Verbena",       description: "A fragrant duo of fresh spearmint and lemon verbena. Great for teas, cocktails, and desserts.",                    price: 4.00,  category: "HERBS",      certificationStatus: "APPROVED", availableQuantity: 110, imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=Mint",      isActive: true, vendor: { id: "v5", farmName: "Rooftop Harvest",   farmLocation: "Denver, CO"   } },
  { id: "p9",  vendorId: "v4", name: "Blueberry Pint",             description: "Plump, antioxidant-rich blueberries grown in vertical hydroponic towers.",                                        price: 10.50, category: "FRUITS",     certificationStatus: "APPROVED", availableQuantity: 55,  imageUrl: "https://placehold.co/600x400/0f172a/818cf8?text=Blueberry",  isActive: true, vendor: { id: "v4", farmName: "Skyline Sprouts",   farmLocation: "Seattle, WA"  } },
  { id: "p10", vendorId: "v5", name: "Compost Starter Kit",        description: "Everything you need to start composting at home. Includes activator powder, guide, and worm castings.",           price: 18.00, category: "OTHER",      certificationStatus: "APPROVED", availableQuantity: 40,  imageUrl: "https://placehold.co/600x400/0f172a/92400e?text=Compost",   isActive: true, vendor: { id: "v5", farmName: "Rooftop Harvest",   farmLocation: "Denver, CO"   } },
  { id: "p11", vendorId: "v1", name: "Butterhead Lettuce",         description: "Tender, buttery leaves that are ready in 60 days. Crisp and perfect for wraps.",                                  price: 4.50,  category: "VEGETABLES", certificationStatus: "APPROVED", availableQuantity: 75,  imageUrl: "https://placehold.co/600x400/0f172a/84cc16?text=Lettuce",   isActive: true, vendor: { id: "v1", farmName: "Green Acres Farm",   farmLocation: "Brooklyn, NY" } },
  { id: "p12", vendorId: "v2", name: "Rosemary Sprig Bundle",      description: "Woody, aromatic rosemary harvested fresh from terrace gardens. Excellent for roasting and infusions.",             price: 3.00,  category: "HERBS",      certificationStatus: "APPROVED", availableQuantity: 95,  imageUrl: "https://placehold.co/600x400/0f172a/10b981?text=Rosemary",  isActive: true, vendor: { id: "v2", farmName: "Urban Roots Co.",    farmLocation: "Austin, TX"   } },
];

export const VENDOR_DETAILS: Record<string, { bio: string; since: string; rating: number; sold: number; avatar: string }> = {
  v1: { bio: "Green Acres has been at the forefront of Brooklyn rooftop farming since 2018, pioneering vertical grow methods that maximize yield in urban environments.", since: "2018", rating: 4.9, sold: 1420, avatar: "GA" },
  v2: { bio: "Urban Roots specialises in culinary herbs grown using reclaimed water systems. Every bunch is hand-harvested the morning of your order.", since: "2020", rating: 4.8, sold: 870,  avatar: "UR" },
  v3: { bio: "Metro Garden Hub runs Chicago's largest community-supported urban agriculture network, connecting 80+ local gardeners to your table.", since: "2019", rating: 4.7, sold: 1100, avatar: "MG" },
  v4: { bio: "Skyline Sprouts grows high-value crops in Seattle's Pacific climate using rainwater collection and solar power.", since: "2021", rating: 4.9, sold: 650,  avatar: "SS" },
  v5: { bio: "Rooftop Harvest converts unused Denver building terraces into productive growing spaces. 100% of profits fund urban farming education.", since: "2022", rating: 4.8, sold: 390,  avatar: "RH" },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type MarketplaceFilters = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  certifiedOnly?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "rating";
};

async function fetchProduce(filters: MarketplaceFilters): Promise<Produce[]> {
  await sleep(700);
  let data = [...MOCK_PRODUCE];
  if (filters.search)       data = data.filter((p) => p.name.toLowerCase().includes(filters.search!.toLowerCase()) || p.description?.toLowerCase().includes(filters.search!.toLowerCase()));
  if (filters.category)     data = data.filter((p) => p.category === filters.category);
  if (filters.minPrice)     data = data.filter((p) => p.price >= filters.minPrice!);
  if (filters.maxPrice)     data = data.filter((p) => p.price <= filters.maxPrice!);
  if (filters.certifiedOnly) data = data.filter((p) => p.certificationStatus === "APPROVED");
  if (filters.sortBy === "price_asc")  data.sort((a, b) => a.price - b.price);
  if (filters.sortBy === "price_desc") data.sort((a, b) => b.price - a.price);
  return data;
}

async function fetchProduceById(id: string): Promise<Produce & { vendorMeta: typeof VENDOR_DETAILS[string] }> {
  await sleep(500);
  const p = MOCK_PRODUCE.find((x) => x.id === id);
  if (!p) throw new Error("Not found");
  return { ...p, vendorMeta: VENDOR_DETAILS[p.vendorId] ?? VENDOR_DETAILS.v1 };
}

export const useMarketplace = (filters: MarketplaceFilters) =>
  useQuery({ queryKey: ["marketplace", filters], queryFn: () => fetchProduce(filters), staleTime: 30_000 });

export const useProduceDetail = (id: string) =>
  useQuery({ queryKey: ["produce", id], queryFn: () => fetchProduceById(id), enabled: !!id, staleTime: 60_000 });
