// RTL Toggle Functionality for EstateAlpha (Enhanced Version)

// This file is kept for compatibility but the main functionality has been moved to main.js
// to ensure better performance and consistency across all pages.

console.log("RTL Toggle functionality is now handled in main.js for better performance.");

// Ensure the DOM is loaded before trying to access elements
document.addEventListener('DOMContentLoaded', function() {
  // The actual implementation is in main.js
  // This file is kept for backward compatibility
  console.log("RTL Toggle initialized");
  
  // Apply saved RTL preference on load
  const savedRTL = localStorage.getItem('rtl') === 'true';
  if (savedRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
  }
});