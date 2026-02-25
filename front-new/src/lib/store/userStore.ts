import {create} from "zustand";

type UserState = {
  user: {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    status: string;
    isAdmin: boolean;
  } | null;
  setUser: (user: UserState["user"]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));