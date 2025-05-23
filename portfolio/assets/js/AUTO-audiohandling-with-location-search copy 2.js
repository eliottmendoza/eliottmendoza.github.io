// ========== Media Keyboard Controls + Poptrox Integration ==========

let currentPlayer = null;
let youTubePlayer = null;

// YouTube API requires global callback
let youTubeIframeReady = false;
window.onYouTubeIframeAPIReady = () => {
  youTubeIframeReady = true;
  // Scan for YouTube iframe if needed
  const iframe = document.querySelector('iframe.youtube-player');
  if (iframe) {
    youTubePlayer = new YT.Player(iframe, {});
  }
};

// Load YouTube IFrame API script
(function loadYouTubeAPI() {
  const script = document.createElement('script');
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);
})();

// Update currentPlayer when user clicks audio/video
document.addEventListener('click', function (event) {
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'audio' || tag === 'video') {
    currentPlayer = event.target;
  }
});

// Detect player in popup or fallback
function getPlayer() {
  const popupPlayer = document.querySelector('.poptrox-popup audio, .poptrox-popup video');
  if (popupPlayer) return popupPlayer;

  if (youTubePlayer && youTubeIframeReady) return 'youtube';

  return currentPlayer || document.querySelector('audio, video');
}

// Keyboard control handler
window.addEventListener('keydown', function (event) {
  const player = getPlayer();
  if (!player) return;

  const key = event.which || event.keyCode;

  // Handle regular <audio>/<video>
  if (player !== 'youtube') {
    switch (key) {
      case 32:
        event.preventDefault();
        player.paused ? player.play() : player.pause();
        break;
      case 37:
        event.preventDefault();
        player.currentTime = Math.max(0, player.currentTime - 15);
        break;
      case 39:
        event.preventDefault();
        player.currentTime = Math.min(player.duration, player.currentTime + 15);
        break;
    }
  }

  // Handle YouTube player
  if (player === 'youtube' && youTubePlayer && youTubePlayer.getDuration) {
    switch (key) {
      case 32:
        event.preventDefault();
        const state = youTubePlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
          youTubePlayer.pauseVideo();
        } else {
          youTubePlayer.playVideo();
        }
        break;
      case 37:
        event.preventDefault();
        const rewindTo = Math.max(0, youTubePlayer.getCurrentTime() - 15);
        youTubePlayer.seekTo(rewindTo, true);
        break;
      case 39:
        event.preventDefault();
        const forwardTo = Math.min(youTubePlayer.getDuration(), youTubePlayer.getCurrentTime() + 15);
        youTubePlayer.seekTo(forwardTo, true);
        break;
    }
  }
});

// Duration parser
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

// ========== Poptrox Integration ==========
window.addEventListener('DOMContentLoaded', function () {
  const initialPlayer = getPlayer();
  if (initialPlayer && typeof initialPlayer !== 'string' && window.location.search) {
    const duration = window.location.search.substring(1);
    initialPlayer.currentTime = simpleDurationParsing(duration);
    initialPlayer.play().catch(err => console.warn("Autoplay blocked:", err));
  }

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

          popupMedia.play().catch(err => console.warn("Popup autoplay fail:", err));
        }

        // Check for YouTube iframe in the popup
        const iframe = document.querySelector('.poptrox-popup iframe.youtube-player');
        if (iframe && youTubeIframeReady) {
          youTubePlayer = new YT.Player(iframe);
        }
      }, 100);
    },

    onPopupClose: function () {
      const popupMedia = document.querySelector('.poptrox-popup audio, .poptrox-popup video');
      if (popupMedia) {
        popupMedia.pause();
        popupMedia.currentTime = 0;
      }
      currentPlayer = null;
      if (youTubePlayer && youTubePlayer.pauseVideo) {
        youTubePlayer.pauseVideo();
      }
    }
  });
});
