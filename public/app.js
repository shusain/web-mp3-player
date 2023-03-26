document.addEventListener('DOMContentLoaded', () => {
  const playlist = document.getElementById('playlist');
  const audio = document.getElementById('audio');
  const canvas = document.getElementById('visualizer');
  const canvasContext = canvas.getContext('2d');

  let audioContext;
  let analyser;
  let source;
  let initializedAudioContext = false;

  function initAudioContext() {
    if (!initializedAudioContext) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      drawVisualizer(analyser, dataArray);
      initializedAudioContext = true;
    }
  }

  function drawVisualizer(analyser, dataArray) {
    requestAnimationFrame(() => drawVisualizer(analyser, dataArray));

    analyser.getByteFrequencyData(dataArray);
    canvasContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i] / 2;

      canvasContext.fillStyle = `rgb(${dataArray[i]}, 50, 50)`;
      canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  audio.addEventListener('play', () => {
    initAudioContext();
  });

  fetch('/tracks')
    .then((response) => response.json())
    .then((tracks) => {
      tracks.forEach((track) => {
        const trackDiv = document.createElement('div');
        trackDiv.textContent = track.title;
        trackDiv.classList.add('track');
        trackDiv.addEventListener('click', () => {
          audio.src = `/tracks/${encodeURIComponent(track.filename)}`;
          audio.play();
        });
        playlist.appendChild(trackDiv);
      });
    });
});
