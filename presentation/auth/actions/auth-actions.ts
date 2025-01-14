import { productsApi } from "@/core/auth/api/productsApi";
import { User } from "@/core/auth/interface/user";

export interface AuthResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}


const returnUserToken = (data: AuthResponse): {user: User, token: string} => { 
  const {id, email, fullName, isActive, roles, token} = data;

  const user: User = {
    id,
    email,
    fullName,
    isActive,
    roles,
  }

  return {
    user,
    token
  }
}

export const authLogin = async(email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const {data} = await productsApi.post<AuthResponse>('/auth/login', {
      email, password
    })

    return returnUserToken(data)
  } catch(error) {
    console.log(error)
    throw new Error('Usuario no valido')
  }
}

export const authCheckStatus = async() => {
  try{
    const {data} = await productsApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data)
  } catch(error) {
    return null
  }
}

/* TODO: MAKE REGISTER FUNCTION */