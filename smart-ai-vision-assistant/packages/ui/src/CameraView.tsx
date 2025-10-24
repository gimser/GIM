import React, { useEffect, useRef, useState } from "react";

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // Stop tracks on unmount for privacy
      const stream = videoRef.current?.srcObject as MediaStream | undefined;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function enableCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
      setPermissionDenied(false);
    } catch (e) {
      setActive(false);
      setPermissionDenied(true);
    }
  }

  function disableCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | undefined;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black relative">
      {active ? (
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 text-sm p-4">
          <p className="mb-2">Camera access is off.</p>
          {permissionDenied && (
            <p className="text-red-400 mb-2">Permission denied. Enable from browser settings.</p>
          )}
          <button
            onClick={enableCamera}
            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm"
          >
            Enable Camera
          </button>
        </div>
      )}
      {active && (
        <button
          onClick={disableCamera}
          className="absolute bottom-3 right-3 px-2 py-1 text-xs rounded bg-zinc-900/70 border border-zinc-700 hover:bg-zinc-800"
        >
          Disable
        </button>
      )}
    </div>
  );
}
