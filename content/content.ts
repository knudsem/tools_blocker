// contents/canva-content.ts
import type { PlasmoCSConfig } from "plasmo"
import { storage } from "../storage"

// Configure the content script to run on Canva pages
export const config: PlasmoCSConfig = {
  matches: ["https://*.canva.com/*"],
  all_frames: true
}

// CSS to hide pro assets
const hideProAssetsCss = `
  /* Hide pro badge elements */
  .nt8d3QJD7MZG7lDxuWvB, /* Pro labels/badges */
  [data-testid="premium-content"], /* Pro content indicator */
  [data-testid="premium-element-badge"], /* Pro element badge */
  [data-testid="premium-sidebar-item"] /* Pro sidebar items */ {
    display: none !important;
  }
  
  /* For pro sections, either hide completely or make them appear as standard elements */
  [data-testid="premium-section"],
  [data-free="false"] {
    opacity: 0.3;
    pointer-events: none;
  }
`

// Create a style element to inject CSS
let styleElement: HTMLStyleElement | null = null

// Function to apply or remove the hiding CSS
function toggleProAssetStyles(hideProAssets: boolean) {
  // Remove existing style element if it exists
  if (styleElement) {
    styleElement.remove()
    styleElement = null
  }

  // If hiding is enabled, create and inject the style element
  if (hideProAssets) {
    styleElement = document.createElement("style")
    styleElement.id = "canva-pro-assets-hider-styles"
    styleElement.textContent = hideProAssetsCss
    document.head.appendChild(styleElement)
  }
}

// Listen for settings changes from the extension
storage.watch({
  key: "settings",
  callback: (newValue) => {
    if (newValue) {
      const settings = JSON.parse(newValue)
      toggleProAssetStyles(settings.hideProAssets)
    }
  }
})

// Initial setup when the content script loads
async function initialize() {
  // Get current settings from storage
  const settingsStr = await storage.get("settings")
  const settings = settingsStr ? JSON.parse(settingsStr) : { hideProAssets: true }
  
  // Apply styles based on current setting
  toggleProAssetStyles(settings.hideProAssets)
}

// Initialize when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize)
} else {
  initialize()
}

// Observe DOM changes to reapply styles if needed
const observer = new MutationObserver(async () => {
  const settingsStr = await storage.get("settings")
  if (settingsStr) {
    const settings = JSON.parse(settingsStr)
    if (settings.hideProAssets && !document.getElementById("canva-pro-assets-hider-styles")) {
      toggleProAssetStyles(true)
    }
  }
})

observer.observe(document.documentElement, { 
  childList: true, 
  subtree: true 
})
