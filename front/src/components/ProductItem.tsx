import React, { useEffect, useRef } from 'react';

interface ProductItemProps {
  bodyHtml: string;
  imageUrl: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ bodyHtml, imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, 100, 100);
        };
        image.src = imageUrl;
      }
    }
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} width="100" height="100" />
      <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
};

export default ProductItem;
