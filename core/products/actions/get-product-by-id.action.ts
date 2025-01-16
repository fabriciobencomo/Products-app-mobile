import { API_URL, productsApi } from "@/core/auth/api/productsApi";
import { Gender, Product } from "../interfaces/product";

const emptyProduct: Product = {
  id: '',
  title: 'Nuevo Producto',
  description: '',
  price: 0,
  images: [],
  gender: Gender.Men,
  slug: '',
  stock: 0,
  tags: [],
  sizes: [],

}

export const getProductById = async(id: string): Promise<Product> => {

  if(id === 'new') return emptyProduct

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