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
