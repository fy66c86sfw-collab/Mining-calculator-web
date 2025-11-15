// Global Settings Manager for Mining Calculator App
// This file manages theme, units, and language settings across all pages

let settings = {
  theme: 'light',
  units: 'metric',
  language: 'en'
};

// Load settings from settings.json or localStorage
async function loadSettings() {
  try {
    const response = await fetch('settings.json');
    const data = await response.json();
    settings = { ...settings, ...data };
  } catch (e) {
    // Fallback to localStorage if settings.json not available
    settings.theme = localStorage.getItem('theme') || settings.theme;
    settings.units = localStorage.getItem('units') || settings.units;
    settings.language = localStorage.getItem('language') || settings.language;
  }
  applySettings();
}

// Apply settings to the page
function applySettings() {
  // Apply theme
  if (settings.theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Save a specific setting
function saveSetting(key, value) {
  settings[key] = value;
  localStorage.setItem(key, value);
  applySettings();
}

// Unit conversion helper functions
function formatLength(lengthMM) {
  if (settings.units === 'metric') {
    const lengthInch = (lengthMM / 25.4).toFixed(2);
    return `${lengthMM} mm <small>(${lengthInch} in)</small>`;
  } else {
    const lengthInch = (lengthMM / 25.4).toFixed(2);
    const lengthMMShow = lengthMM;
    return `${lengthInch} in <small>(${lengthMMShow} mm)</small>`;
  }
}

function formatDistance(meters) {
  if (settings.units === 'metric') {
    const feet = (meters * 3.28084).toFixed(2);
    return `${meters} m <small>(${feet} ft)</small>`;
  } else {
    const feet = (meters * 3.28084).toFixed(2);
    return `${feet} ft <small>(${meters} m)</small>`;
  }
}

function formatVolume(cubicMeters) {
  if (settings.units === 'metric') {
    const cubicYards = (cubicMeters * 1.30795).toFixed(2);
    return `${cubicMeters} m³ <small>(${cubicYards} yd³)</small>`;
  } else {
    const cubicYards = (cubicMeters * 1.30795).toFixed(2);
    return `${cubicYards} yd³ <small>(${cubicMeters} m³)</small>`;
  }
}

function formatWeight(kilograms) {
  if (settings.units === 'metric') {
    const pounds = (kilograms * 2.20462).toFixed(2);
    return `${kilograms} kg <small>(${pounds} lb)</small>`;
  } else {
    const pounds = (kilograms * 2.20462).toFixed(2);
    return `${pounds} lb <small>(${kilograms} kg)</small>`;
  }
}

// Initialize settings on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSettings);
} else {
  loadSettings();
}
