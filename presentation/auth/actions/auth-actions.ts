import { productsApi } from "@/core/auth/api/productsApi";
import { User } from "@/core/auth/interface/user";
export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (
  data: AuthResponse
): {
  user: User;
  token: string;
} => {

  const { token, ...user } = data;

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};

// TODO: Tarea: Hacer el register

export const authRegister = async (
  email: string,
  password: string,
  fullName: string
) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};