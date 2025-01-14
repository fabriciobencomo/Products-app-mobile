import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unaunthenticated' | 'checking';


export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;


  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthStatusStore = create<AuthState>()((set,get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  // actions
  login: async(email: string, password:string) => {
    /* TODO: login */
    return true
  },

  checkStatus: async() => {
    /* TODO: check status */
  
  },

  logout: async() => {
    /* TODO: logout */
  
  }



}))