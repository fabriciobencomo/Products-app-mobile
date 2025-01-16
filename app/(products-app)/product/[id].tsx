import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemeTextInput from '@/presentation/theme/components/ThemeTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'

const ProductScreen = () => {

  const navigation = useNavigation()

  const {id } = useLocalSearchParams()
  const { productQuery } = useProduct(`${id}`)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons  name='camera-outline' size={25}/>
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
      <ScrollView >
        <ThemedView style={{marginHorizontal: 10, marginTop: 20}}>
          <ThemeTextInput placeholder='Nombre del Producto' style={{marginVertical: 5}}/>
          <ThemeTextInput placeholder='slug' style={{marginVertical: 5}}/>
          <ThemeTextInput placeholder='description' multiline numberOfLines={10} style={{marginVertical: 5}}/>
        </ThemedView>

        <ThemedView style={{marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10}}>
          <ThemeTextInput placeholder='Precio' style={{flex: 1}}/>
          <ThemeTextInput placeholder='Inventario' style={{flex: 1}}/>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProductScreen