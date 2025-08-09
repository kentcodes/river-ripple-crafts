'use client';
import Cropper from 'react-easy-crop';
import { useState } from 'react';

type Props = { aspect: number, shape?: 'rect'|'round' }
export default function CropperClient({ aspect, shape='rect' }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={(e)=>{
        const f = e.target.files?.[0]; if (!f) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(f);
      }} />
      <div className="relative w-full h-72 bg-gray-200 rounded-xl overflow-hidden">
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={shape === 'round' ? 'round' : 'rect'}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <label className="label">Zoom</label>
        <input className="w-full" type="range" min={1} max={3} step={0.01} value={zoom} onChange={e=>setZoom(parseFloat(e.target.value))} />
        <label className="label">Rotate</label>
        <input className="w-full" type="range" min={-180} max={180} step={1} value={rotation} onChange={e=>setRotation(parseFloat(e.target.value))} />
      </div>
    </div>
  );
}
