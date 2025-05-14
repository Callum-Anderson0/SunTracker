console.log("hello world");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Request access to the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Get the video element and set the stream as the source
      const videoElement = document.querySelector('video');
      videoElement.srcObject = stream;

      // Optionally, handle errors
      stream.oninactive = function() {
        console.log("Camera stream ended.");
      };
    })
    .catch(function(error) {
      console.error('Error accessing the camera: ', error);
    });
} else {
  console.error('Camera access is not supported in this browser.');
}