import {
  MartianMono_500Medium,
  MartianMono_600SemiBold,
  MartianMono_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/martian-mono'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

import '../global.css'

const queryClient = new QueryClient()

export default function RootLayout() {
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
      <Stack
        screenOptions={{
          contentStyle: {
            paddingHorizontal: 16,
            paddingVertical: 24,
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontFamily: 'MartianMono_500Medium',
          },
        }}
      >
        <Stack.Screen
          name="modal"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}
