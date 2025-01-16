import { API_URL, productsApi } from "@/core/auth/api/productsApi";
import { Product } from "../interfaces/product";

export const getProducts = async(id: string): Promise<Product> => {

  try {
    const { data } = await productsApi.get<Product>('/products/' + id);
    return {
      ...data,
      images: data.images.map(image => `${API_URL}/files/product/${image}`)
    };
  } catch (error) {
    console.log(error);
    throw new Error('Product not found');
  }
}