import { productsApi } from "@/core/auth/api/productsApi";
import { Product } from "../interfaces/product";

export const updateCreateProduct = (product: Partial<Product>) => {

  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)

  if(product.id && product.id !== 'new'){
    return updateProduct(product)
  }

  return createProduct(product)
}

const updateProduct = async (product: Partial<Product>) => {
  
  const {id, images = [], user, ...rest} = product

  try {
    const {data} = await productsApi.patch(`/products/${id}`, {
      
      // TODO: IMAGES PROCESS
      ...rest
    })

    return data
  } catch (error) {
    
    throw new Error("Error al Actualizar.");
  }
}
const createProduct = async(product: Partial<Product>) => {
  const {id, images = [], user, ...rest} = product

  try {
    const {data} = await productsApi.post(`/products`, {
      
      // TODO: IMAGES PROCESS
      ...rest
    })

    return data
  } catch (error) {
    
    throw new Error("Error al Crear Producto.");
  }
}

