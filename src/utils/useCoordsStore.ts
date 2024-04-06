import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Coords {
  lat?: string;
  lon?: string;
}

export interface CoordsStore {
  coords: Coords;
  setCoords: (coords: Coords) => void;
}

const useCoordsStore = create(
  persist<CoordsStore>(
    (set) => ({
      coords: <Coords>{},
      setCoords: (coords) => set(() => ({ coords })),
    }),
    {
      name: "CoordsStore",
    }
  )
);

export default useCoordsStore;
export type { Coords };
