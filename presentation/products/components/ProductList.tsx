import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import {ProductCard} from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  products: [];
  loadNextPage: () => void;
}

const ProductList = ({products, loadNextPage}: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false)

  const queryClient = useQueryClient()

  const onPullRefresh = async() => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    queryClient.invalidateQueries({
      queryKey: ['products', 'infinite'],
    })
    setIsRefreshing(false)
  }

  return (
    <FlatList data={products} keyExtractor={(item) => item.id } numColumns={2}  renderItem={({item}) => (
      <ProductCard product={item} />
    )}
    onEndReached={loadNextPage}
    onEndReachedThreshold={0.8}
    showsVerticalScrollIndicator={false}
    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullRefresh} />}
    />
  )
}

export default ProductList