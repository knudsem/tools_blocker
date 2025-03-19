// storage.ts
import { Storage } from "@plasmohq/storage"

// Create a storage instance
export const storage = new Storage()

// Define default settings
export const DEFAULT_SETTINGS = {
  hideProAssets: true
}

// Function to get the current settings
export async function getSettings() {
  const settings = await storage.get("settings")
  return settings ? JSON.parse(settings) : DEFAULT_SETTINGS
}

// Function to update settings
export async function updateSettings(newSettings:any) {
  await storage.set("settings", JSON.stringify({
    ...await getSettings(),
    ...newSettings
  }))
}

// Function to specifically toggle the hideProAssets setting
export async function toggleHideProAssets() {
  const settings = await getSettings()
  await updateSettings({
    hideProAssets: !settings.hideProAssets
  })
  return !settings.hideProAssets
}
