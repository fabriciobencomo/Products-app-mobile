import { User } from "@/core/auth/interface/user";
import { create } from "zustand";
import { authCheckStatus, authLogin, authRegister } from "../actions/auth-actions";
import { secureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";

export type AuthStatus = 'authenticated' | 'unaunthenticated' | 'checking';


export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;


  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  changeStatus: (token?: string, user?:User) => Promise<boolean>; 
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set,get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  
  // actions
  changeStatus: async (token?: string, user?:User) => {
    if(!token || !user){
      set({status: 'unaunthenticated', token: undefined, user: undefined})
      await get().logout()
      return false
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    })

    await secureStorageAdapter.setItem('token', token)

    return true
  },
  
  login: async(email: string, password:string) => {
    const resp = await authLogin(email, password)
    return get().changeStatus(resp?.token, resp?.user)
  },


  checkStatus: async() => {
    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user)
  },

  logout: async() => {
    secureStorageAdapter.removeItem('token')
    set({status: 'unaunthenticated', token: undefined, user: undefined})
  },

  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);
    return get().changeStatus(resp?.token, resp?.user);
  }
}))
