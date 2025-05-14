let currentStream = null;
let currentDeviceId = null;
let videoElement = document.getElementById('video');
let switchButton = document.getElementById('switchCamera');

// Function to start the video stream
function startStream(deviceId) {
  // Stop the current stream if it exists
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  // Request the video stream for the selected device
  navigator.mediaDevices.getUserMedia({
    video: { deviceId: deviceId }
  })
    .then(function(stream) {
      currentStream = stream;
      videoElement.srcObject = stream;
      currentDeviceId = deviceId;
    })
    .catch(function(error) {
      console.error('Error accessing camera: ', error);
    });
}

// Get all available video input devices (cameras)
function getCameras() {
  return navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      return devices.filter(device => device.kind === 'videoinput');
    })
    .catch(err => console.error('Error enumerating devices:', err));
}

// Switch between available cameras
let cameras = [];
getCameras().then(devices => {
  cameras = devices;
  if (cameras.length > 0) {
    startStream(cameras[0].deviceId); // Start with the first camera (usually front camera)
  }
});

// Switch camera on button click
switchButton.addEventListener('click', function() {
  let currentIndex = cameras.findIndex(camera => camera.deviceId === currentDeviceId);
  let nextIndex = (currentIndex + 1) % cameras.length; // Cycle through cameras
  startStream(cameras[nextIndex].deviceId); // Start the next camera
});
