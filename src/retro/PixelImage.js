import React, { useEffect, useRef } from 'react';

/**
 * Draws an image onto a very small canvas and lets CSS scale it back up with
 * `image-rendering: pixelated`, which produces an authentic low-res look.
 */
export default function PixelImage({ src, alt, width = 112 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const canvas = canvasRef.current;
            if (cancelled || !canvas) return;
            const h = Math.max(1, Math.round((width * img.height) / img.width));
            canvas.width = width;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, width, h);
        };
        return () => {
            cancelled = true;
        };
    }, [src, width]);

    return <canvas ref={canvasRef} className="Pixel" role="img" aria-label={alt} />;
}
