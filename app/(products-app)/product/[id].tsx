import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemeTextInput from '@/presentation/theme/components/ThemeTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import ProductImages from '@/presentation/products/components/ProductImages'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import { Formik } from 'formik'
import { Size } from '@/core/products/interfaces/product'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import { useCameraStore } from '@/presentation/store/useCameraStore'

const ProductScreen = () => {

  const navigation = useNavigation()
  const {selectedImages, clearImages} = useCameraStore()

  const {id } = useLocalSearchParams()
  const { productQuery, productMutation } = useProduct(`${id}`)

  useEffect(() => {
    
    return () => {
    clearImages()
    }
  }, [])
  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton onPress={() => router.push('/camera')} icon='camera-outline'/>
      )
    })
  }, [])

  useEffect(() => {
    if(productQuery.data){
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [productQuery.data])
  
  
  if(productQuery.isLoading){
    return (
      <ThemedView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={25}/>
      </ThemedView>
    )
  }

  if(!productQuery){
    return <Redirect href='/'/>
  }

  const product = productQuery.data!

  return (
    <Formik initialValues={product} onSubmit={(productLike) => productMutation.mutate(productLike)}>

      {
        ({values, handleSubmit, handleChange, setFieldValue}) => (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
            <ScrollView >
              <ProductImages images={[...values.images, ...selectedImages]}></ProductImages>
              <ThemedView style={{marginHorizontal: 10, marginTop: 20}}>
                <ThemeTextInput placeholder='Nombre del Producto' style={{marginVertical: 5}} value={values.title} onChangeText={handleChange('title')}/>
                <ThemeTextInput placeholder='slug' style={{marginVertical: 5}} value={values.slug} onChangeText={handleChange('slug')}/>
                <ThemeTextInput placeholder='description' multiline numberOfLines={10} style={{marginVertical: 5}} value={values.description} onChangeText={handleChange('description')}/>
              </ThemedView>

              <ThemedView style={{marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10}}>
                <ThemeTextInput placeholder='Precio' style={{flex: 1}} value={values.price.toString()} onChangeText={handleChange('price')} />
                <ThemeTextInput placeholder='Inventario' style={{flex: 1}} value={values.stock.toString()} onChangeText={handleChange('stock')}/>
              </ThemedView>

              <ThemedView style={{marginHorizontal: 10}}>
                <ThemedButtonGroup  
                  options={['XS', 'S', 'M', 'L', 'XL', 'XXL']} 
                  selectedOptions={values.sizes} 
                  onSelect={(option) => {
                    setFieldValue('sizes', values.sizes.includes(option as Size) ? values.sizes.filter(size => size !== option) : [...values.sizes, option])
                  }}
                />
                <ThemedButtonGroup  
                  options={['kid', 'men', 'women', 'unisex']} 
                  selectedOptions={[values.gender]} 
                  onSelect={(option) => setFieldValue('gender', option)}
                />
              </ThemedView>

              {/* Boton para Guardar */}
              <View style={{marginHorizontal: 10, marginBottom: 50, marginTop: 20}}>
                <ThemedButton icon='save-outline' onPress={() => handleSubmit()}>
                  Guardar
                </ThemedButton>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }


    </Formik>
  )
}

export default ProductScreen