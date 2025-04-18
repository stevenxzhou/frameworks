// Check if running on iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

async function initializeStream() {
  try {
    // Request camera with specific constraints for iOS
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user', // or 'environment' for back camera
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    // Get video element and set the stream
    const videoElement = document.getElementById('localVideo');
    videoElement.srcObject = stream;
    
    // Connect to socket and handle stream
    const socket = io();
    
    // ... rest of your streaming logic
    
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Please allow camera access to use this feature');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeStream); 