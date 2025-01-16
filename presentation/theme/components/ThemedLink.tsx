import React, { useRef, useState } from 'react'
import { Link, LinkProps, useFocusEffect } from 'expo-router'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps {}

const ThemedLink = ({style, ...rest}: Props) => {

  const [clicked, setClicked] = useState(false)

  useFocusEffect(() => {
    setClicked(false)
    if(clicked){

    }
  },)

  const handleClick = () => {
    setClicked(true)
  }

  const primary = useThemeColor({}, 'primary')

  return (
    <Link style={[{color: primary}, style]} {...rest} onPress={handleClick}/>
  )
}

export default ThemedLink