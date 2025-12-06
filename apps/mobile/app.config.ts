import { ConfigContext, ExpoConfig } from "expo/config";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.baobab_software.talentry.dev";
  }

  if (IS_PREVIEW) {
    return "com.baobab_software.talentry.preview";
  }

  return "com.baobab_software.talentry";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Talentry (Dev)";
  }

  if (IS_PREVIEW) {
    return "Talentry (Preview)";
  }

  return "Talentry";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "talentry",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "mobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "79c33ca8-d53b-4e5b-98f1-96603c1dc376",
    },
    apiUrl: process.env.API_URL || "https://1cfa572a4044.ngrok-free.app/api",
  },
  owner: "baobab_software",
});
