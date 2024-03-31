import type { PropsWithChildren } from 'react'
import { SafeAreaView, View } from 'react-native'

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView>
      <View className="h-full px-4">{children}</View>
    </SafeAreaView>
  )
}
