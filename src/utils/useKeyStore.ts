import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Keys {
  openweather?: string;
  openai?: string;
  wikipedia?: string;
}

interface KeyStore {
  keys: Keys;
  setKeys: (keys: Keys) => void;
}

const useKeyStore = create(
  persist<KeyStore>(
    (set) => ({
      keys: <Keys>{},
      setKeys: (keys) => set(() => ({ keys })),
    }),
    {
      name: "keyStore",
    }
  )
);

export default useKeyStore;
export type { Keys };
