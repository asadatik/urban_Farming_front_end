"use client";
import { useRouter } from "next/navigation";

export function useRoleRedirect() {
  const router = useRouter();
  return (role: string, farmLocation?: string) => {
    if (role === "ADMIN")    return router.replace("/admin");
    if (role === "VENDOR") {
      const isNew = !farmLocation || farmLocation === "To be updated";
      return router.replace(isNew ? "/onboarding/vendor" : "/vendor");
    }
    router.replace("/customer");
  };
}
