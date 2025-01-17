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

const prepareImages = async(images: string[]): Promise<string[]> => {
  const fileImages = images.filter(image => {
    if(image.includes('file')){
      return image
    }
  })

  const currentImages = images.filter(image => {
    if(!image.includes('file')){
      return image
    }
  }) 

  if(fileImages.length > 0){
    const uploadPromises = fileImages.map(uploadImages)
    const uploadedImages = await Promise.all(uploadPromises)
    currentImages.push(...uploadedImages)
  }

  return currentImages.map(img => img.split('/').pop()!)
}

const uploadImages = async(image: string): Promise<string> => {
  const formData = new FormData() as any;
  formData.append('file', {
    uri: image,
    name: image.split('/').pop(),
    type: 'image/jpeg'
  })

  const {data} = await productsApi.post<{image: string}>('/files/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.image;
}

const updateProduct = async (product: Partial<Product>) => {
  
  const {id, images = [], user, ...rest} = product

  try {
    const checkImages = await prepareImages(images)
    const {data} = await productsApi.patch(`/products/${id}`, {
      
      images: checkImages,
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
    const checkImages = await prepareImages(images)
    const {data} = await productsApi.post(`/products`, {    
      images: checkImages,
      ...rest
    })

    return data
  } catch (error) {
    
    throw new Error("Error al Crear Producto.");
  }
}

