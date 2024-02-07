import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading } from '../slices/productsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const ProductsGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Функция для отрисовки изображения на канвасе
  const drawImageOnCanvas = (canvasId: string, imageUrl: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
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
  };

  useEffect(() => {
    products.forEach(product => {
      drawImageOnCanvas(`canvas-${product.id}`, product.imageUrl);
    });
  }, [products]);

  if (loading) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      {products.map(({ id, bodyHtml }) => (
        <Grid item key={id} xs={12} sm={6} md={4}>
          <div>
            <canvas id={`canvas-${id}`} width="100" height="100" />
            <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsGrid;
