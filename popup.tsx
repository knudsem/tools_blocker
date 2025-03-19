// popup.tsx
import { useState, useEffect } from "react"
import { getSettings, updateSettings } from "./storage"

// Import the CSS
import "./style.css"

// Import icons
import buyMeCoffeeIcon from "./assets/buymeacoffee.png"
import patreonIcon from "./assets/patreon.png"

// Buy Me a Coffee and Patreon URLs - replace with your own
const BUYMEACOFFEE_URL = "https://www.buymeacoffee.com/yourname"
const PATREON_URL = "https://www.patreon.com/yourname"

const IndexPopup = () => {
  const [hideProAssets, setHideProAssets] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Load settings when popup opens
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings()
      setHideProAssets(settings.hideProAssets)
      setIsLoading(false)
    }
    
    loadSettings()
  }, [])

  // Handle toggle change
  const handleToggleChange = async () => {
    const newValue = !hideProAssets
    setHideProAssets(newValue)
    
    // Save to storage
    await updateSettings({ hideProAssets: newValue })
  }

  return (
    <div className="popup-container">
      <header className="popup-header">
        <h1>Canva Pro Assets Hider</h1>
      </header>
      
      <main className="popup-content">
        {isLoading ? (
          <div className="loading">Loading settings...</div>
        ) : (
          <div className="setting-item">
            <div className="setting-label">
              <label htmlFor="hide-pro-toggle">Hide Pro Assets</label>
              <p className="setting-description">
                Hide premium assets and features in Canva
              </p>
            </div>
            
            <div className="toggle-container">
              <input
                id="hide-pro-toggle"
                type="checkbox"
                className="toggle-checkbox"
                checked={hideProAssets}
                onChange={handleToggleChange}
              />
              <label className="toggle-switch" htmlFor="hide-pro-toggle">
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        )}
        
        <div className="status-message">
          {hideProAssets 
            ? "Pro assets are being hidden on Canva pages" 
            : "Pro assets are being displayed normally"}
        </div>
      </main>
      
      <footer className="popup-footer">
        <div className="donation-banners">
          <a 
            href={BUYMEACOFFEE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="donation-banner buymeacoffee"
          >
            <img 
              src={buyMeCoffeeIcon} 
              alt="Buy Me a Coffee" 
              className="donation-icon"
            />
            <span>Buy Me a Coffee</span>
          </a>
          
          <a 
            href={PATREON_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="donation-banner patreon"
          >
            <img 
              src={patreonIcon} 
              alt="Patreon" 
              className="donation-icon"
            />
            <span>Support on Patreon</span>
          </a>
        </div>
        
        <div className="version">Version 0.1.0</div>
      </footer>
    </div>
  )
}

export default IndexPopup