import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface Props {
  images: string[]
}

const ProductImages = ({images}: Props) => {
  return (
    <>
      {
        (images.length === 0) ? (
          <Image style={{width: 300, height: 300}} source={ require('../../../assets/images/no-product-image.png')}/>
        )
        : (
          <FlatList data={images} keyExtractor={(item) => item} horizontal showsHorizontalScrollIndicator={false} renderItem={({item}) => (
            <Image source={{uri: item}} style={{width: 300, height: 300, marginHorizontal: 7, borderRadius: 5}}/>
          )} />
        )
      }
    </>
  )
}

export default ProductImages