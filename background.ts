// background.ts
import { storage, DEFAULT_SETTINGS } from "./storage"

// Initialize extension settings on install
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    // Set default settings on first install
    await storage.set("settings", JSON.stringify(DEFAULT_SETTINGS))
    console.log("Canva Pro Assets Hider installed with default settings:", DEFAULT_SETTINGS)
  }
})

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getSettings") {
    // Send back current settings
    storage.get("settings").then(settingsStr => {
      const settings = settingsStr ? JSON.parse(settingsStr) : DEFAULT_SETTINGS
      sendResponse({ settings })
    })
    return true // Required for async response
  }
  
  if (message.type === "updateSettings") {
    // Update settings and notify active tabs
    storage.set("settings", JSON.stringify(message.settings)).then(() => {
      sendResponse({ success: true })
    })
    return true // Required for async response
  }
})
