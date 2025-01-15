import { User } from "@/core/auth/interface/user";
import { create } from "zustand";
import { authCheckStatus, authLogin } from "../actions/auth-actions";

export type AuthStatus = 'authenticated' | 'unaunthenticated' | 'checking';


export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;


  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  changeStatus: (token?: string, user?:User) => boolean; 
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set,get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  
  // actions
  changeStatus: (token?: string, user?:User) => {
    if(!token || !user){
      set({status: 'unaunthenticated', token: undefined, user: undefined}
/*       TODO: llamar logout */
      )
      return false
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    })

    return true
  },
  
  login: async(email: string, password:string) => {
    /* TODO: login */
    const resp = await authLogin(email, password)

    return get().changeStatus(resp?.token, resp?.user)
  },


  checkStatus: async() => {
    /* TODO: check status */
    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user)
  },

  logout: async() => {
    /* TODO: clear token del secure storage */
    set({status: 'unaunthenticated', token: undefined, user: undefined})
  }



}))