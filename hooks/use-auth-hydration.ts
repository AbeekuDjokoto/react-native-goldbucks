import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(useAuthStore.persist.hasHydrated());

    return unsub;
  }, []);

  return hydrated;
}
