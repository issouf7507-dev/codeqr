import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  passwordHash: string;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt: Date;
}

interface UserState {
  user: User | null;

  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => set({ user }),

      setLoading: (loading) => set({ loading }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // nom de la clé dans le localStorage
    }
  )
);

// Processing image failed
// unable to decode image data

// Caused by:
// - Format error decoding Ico: ICO image entry has too many color planes or too large hotspot value
// - ICO image entry has too many color planes or too large hotspot value

// j ai besion toi pour deplyer mon site
// c est site fait avec next js
// pour le clone github on a https://github.com/issouf7507-dev/codeqr.git  a la branch main

// un va utilise nginx et pm2
