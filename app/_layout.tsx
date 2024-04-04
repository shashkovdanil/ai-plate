import { ClerkProvider } from '@clerk/clerk-expo'
import {
  MartianMono_500Medium,
  MartianMono_600SemiBold,
  MartianMono_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/martian-mono'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useColorScheme } from 'react-native'

import { PortalHost } from '~/components/primitives/portal'
import '~/global.css'
import { NAV_THEME } from '~/lib/constants'

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {}
  },
}

export { ErrorBoundary } from 'expo-router'

const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [fontsLoaded] = useFonts({
    MartianMono_500Medium,
    MartianMono_600SemiBold,
    MartianMono_800ExtraBold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      >
        <ThemeProvider
          value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}
        >
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'MartianMono_500Medium',
              },
              contentStyle: {
                paddingVertical: 24,
                paddingHorizontal: 16,
              },
            }}
          >
            <Stack.Screen
              name="add"
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="create-profile"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="edit/[id]"
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen name="main/(tabs)" options={{ headerShown: false }} />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
