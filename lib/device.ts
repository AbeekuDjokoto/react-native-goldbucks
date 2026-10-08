import * as Application from "expo-application";
import { Platform } from "react-native";

let cachedDeviceId: string | null = null;

export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) return cachedDeviceId;

  if (Platform.OS === "android") {
    cachedDeviceId = Application.getAndroidId() ?? `android-${Date.now()}`;
    return cachedDeviceId;
  }

  if (Platform.OS === "ios") {
    const iosId = await Application.getIosIdForVendorAsync();
    cachedDeviceId = iosId ?? `ios-${Date.now()}`;
    return cachedDeviceId;
  }

  cachedDeviceId = `web-${Date.now()}`;
  return cachedDeviceId;
}
