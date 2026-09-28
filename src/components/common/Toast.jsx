import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { Sparkles } from 'lucide-react';
import './Toast.css';

export default function Toast() {
  const { toastMessage } = useGallery();

  if (!toastMessage) return null;

  return (
    <div className="gallery-toast" role="status" aria-live="polite">
      <Sparkles size={15} className="toast-sparkle" />
      <span>{toastMessage}</span>
    </div>
  );
}
