// ========== Media Keyboard Controls + Poptrox Integration ==========

// Update currentPlayer when user clicks an audio or video element
document.addEventListener('click', function (event) {
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'audio' || tag === 'video') {
    currentPlayer = event.target;
  }
});

// Fallback: get the first available audio or video on the page
function getPlayer() {
  // Check if there's a player inside an open Poptrox popup
  const popupPlayer = document.querySelector('.poptrox-popup audio, .poptrox-popup video');
  if (popupPlayer) return popupPlayer;

  // Otherwise, fallback to the current player or first available media element
  return currentPlayer || document.querySelector('audio, video');
}

// Handle global keyboard shortcuts for media control
window.addEventListener('keydown', function (event) {
  const player = getPlayer();
  if (!player) return;

  const key = event.which || event.keyCode;

  switch (key) {
    case 32: // Spacebar – toggle play/pause
      event.preventDefault();
      player.paused ? player.play() : player.pause();
      break;

    case 37: // Left arrow – rewind 15 seconds
      event.preventDefault();
      player.currentTime = Math.max(0, player.currentTime - 15);
      break;

    case 39: // Right arrow – fast forward 15 seconds
      event.preventDefault();
      player.currentTime = Math.min(player.duration, player.currentTime + 15);
      break;
  }
});

// Parse a duration string like "2m12s", "90", "1m30", etc.
function simpleDurationParsing(duration) {
  duration = duration.toLowerCase().trim();
  let seconds = 0;

  const minMatch = duration.match(/(\d+)m/);
  const secMatch = duration.match(/(\d+)s/);

  if (minMatch) seconds += parseInt(minMatch[1], 10) * 60;
  if (secMatch) seconds += parseInt(secMatch[1], 10);

  if (!minMatch && !secMatch && /^\d+$/.test(duration)) {
    seconds += parseInt(duration, 10);
  }

  return seconds;
}

// ==========================
// Poptrox Integration
// ==========================
window.addEventListener('DOMContentLoaded', function () {
  // Handle autoplay + seek on regular page load (not via popup)
  const initialPlayer = getPlayer();
  if (initialPlayer && window.location.search) {
    const duration = window.location.search.substring(1);
    initialPlayer.currentTime = simpleDurationParsing(duration);
    initialPlayer.play().catch(err => {
      console.warn("Autoplay blocked on page load:", err);
    });
  }

  // Initialize poptrox with media autoplay support
  $('.gallery').poptrox({
    onPopupOpen: function () {
      setTimeout(() => {
        const popupMedia = document.querySelector('.poptrox-popup audio, .poptrox-popup video');
        if (popupMedia) {
          currentPlayer = popupMedia;

          const duration = window.location.search.substring(1);
          if (duration) {
            popupMedia.currentTime = simpleDurationParsing(duration);
          }

          popupMedia.play().catch(err => {
            console.warn("Autoplay failed in popup:", err);
          });
        }
      }, 100); // Wait a bit for media to be ready in the popup
    },

    onPopupClose: function () {
      const popupMedia = document.querySelector('.poptrox-popup audio, .poptrox-popup video');
      if (popupMedia) {
        popupMedia.pause();
        popupMedia.currentTime = 0;
      }
      currentPlayer = null;
    }
  });
});
