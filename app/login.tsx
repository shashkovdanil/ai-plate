import { useAuth, useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { Button } from 'react-native'

import { useWarmUpBrowser } from '~/hooks/use-warm-up-browser'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  const data = useAuth()
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  useEffect(() => {
    console.log('data', data)
  }, [data])

  const { startOAuthFlow: google } = useOAuth({ strategy: 'oauth_google' })
  // const { startOAuthFlow: apple } = useOAuth({ strategy: 'oauth_apple' })

  const onPress = React.useCallback(async (provider: string) => {
    const functions = {
      google,
    }

    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await functions[provider]()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.dir(err)
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <>
      <Button title="Sign in with Google" onPress={() => onPress('google')} />
      {/* <Button title="Sign in with Apple" onPress={() => onPress('apple')} /> */}
    </>
  )
}
export default SignInWithOAuth
