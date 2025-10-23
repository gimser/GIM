import React, { useEffect, useRef, useState } from "react";

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setHasPermission(true);
      } catch (e) {
        setHasPermission(false);
      }
    }
    setup();
  }, []);

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
      {hasPermission ? (
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />)
        : (
        <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
          Camera permission is required.
        </div>
      )}
    </div>
  );
}
