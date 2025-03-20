import React, { useRef, useState } from 'react';

function CameraCapture({ closeCameraCapture, onSend }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing the camera:', err);
      alert('Could not access the camera. Please ensure you have granted permission.');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraActive(false);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    stopCamera();
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-6 max-[425px]:p-[.9rem] min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Camera Capture</h2>

      {capturedImage ? (
        // Show only the captured image preview with "Close" and "Send" buttons
        <div className="flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="captured-image rounded-lg shadow-lg mb-4"
            style={{ height: '250px', width: 'auto' }} // Reduced height
          />
          <div className="space-x-4">
            <button
              onClick={closeCameraCapture}
              className="px-6 py-3 bg-[#6165F3] text-white rounded-lg hover:bg-[#6165F3]"
            >
              Close
            </button>
            <button
              onClick={() => onSend(capturedImage)}
              className="px-6 py-3  linear_gradient text-white rounded-lg hover:linear_gradient"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // Show the camera and controls if no image is captured
        <>
          <div className="camera-container mb-4 w-full max-w-lg  h-80 bg-black relative">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" 
            style={{ height: '250px', width: 'auto' }}
            />
          </div>
          <div className="space-x-4 max-[555px]:space-x-1">
            <button
              onClick={isCameraActive ? stopCamera : startCamera}
              className="px-6 py-3 max-[555px]:px-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isCameraActive ? 'Stop Camera' : 'Start Camera'}
            </button>
            <button
              onClick={captureImage}
              className={`px-6 py-3 max-[555px]:px-1 text-white rounded-lg ${
                isCameraActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
              }`}
              disabled={!isCameraActive}
            >
              Capture 
            </button>
            <button
              onClick={closeCameraCapture}
              className="px-6 py-3 max-[555px]:px-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
    </div>
  );
}

export default CameraCapture;
