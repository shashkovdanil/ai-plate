import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'

export function FloatingButton() {
  return (
    <Pressable
      onPress={() => {}}
      className="absolute bottom-4 right-4 flex h-20 w-20 items-center justify-center rounded-full bg-black shadow-md"
    >
      <Entypo name="plus" size={25} color="white" />
    </Pressable>
  )
}
