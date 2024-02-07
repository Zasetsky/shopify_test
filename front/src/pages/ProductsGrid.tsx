import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
} from "../slices/productsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import ProductItem from "../components/ProductItem";

const ProductsGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, justifyContent: "center", display: "flex" }}
    >
      {products.map(({ id, bodyHtml, imageUrl }) => (
        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
          <ProductItem bodyHtml={bodyHtml} imageUrl={imageUrl} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsGrid;
