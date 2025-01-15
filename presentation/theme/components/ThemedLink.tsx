import { View, Text } from 'react-native'
import React from 'react'
import { Link, LinkProps } from 'expo-router'
import { ThemedText } from './ThemedText';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps<string | object> {}

const ThemedLink = ({style, ...rest}: Props) => {

  const primary = useThemeColor({}, 'primary')

  return (
    <Link style={[{color: primary}, style]} {...rest}/>
  )
}

export default ThemedLink