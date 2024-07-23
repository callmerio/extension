import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import '@/style/animation.css';

const TextSelectionPopup: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
  
    if (selection && selection.toString().trim()) {
      const newText = selection.toString();
      const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
      
      setSelectedText(newText);
      setShowPopup(true);
      
      setTimeout(() => {
        if (popupRef.current) {
          const popupRect = popupRef.current.getBoundingClientRect();
          const { innerWidth, innerHeight } = window;

          let left = selectionRect.left + (selectionRect.width - popupRect.width) / 2;
          let top = selectionRect.top - popupRect.height - 10;

          left = Math.max(10, Math.min(left, innerWidth - popupRect.width - 10));
          if (top < 10) {
            top = selectionRect.bottom + 10;
          }

          setPopupPosition({ x: left, y: top });
        }
      }, 0);
    } else {
      setShowPopup(false);
    }
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  if (!showPopup) return null;

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        top: popupPosition.y,
        left: popupPosition.x,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      className="popup-animation "
    >
      <Button variant="outline" style={{
      }}>💤Perplexity Search: {selectedText}</Button>
    </div>
  );
};

export default TextSelectionPopup;
