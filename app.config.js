module.exports = {
  name: 'AI Plate',
  owner: 'shashkovdanil',
  slug: 'aiplate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'aiplate',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.shashkovdanil.aiplate',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
    eas: {
      projectId: '38454a80-3d6f-436d-ad5c-49a5a9a181b8',
    },
  },
  plugins: ['expo-font', 'expo-router', 'expo-secure-store'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '38454a80-3d6f-436d-ad5c-49a5a9a181b8',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/38454a80-3d6f-436d-ad5c-49a5a9a181b8',
  },
}
