import { useColorScheme } from '@/presentation/theme/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      retry: false,
    }
  }
})

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background')

  const [loaded] = useFonts({
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    KanitThin: require('../assets/fonts/Kanit-Thin.ttf'),
    KanitBold: require('../assets/fonts/Kanit-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{backgroundColor: backgroundColor, flex: 1}}>  
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" /> */}
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
