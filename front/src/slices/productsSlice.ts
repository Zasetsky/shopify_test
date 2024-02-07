import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../apolloClient";
import { GET_PRODUCTS } from "../graphqlQueries/products";

interface Product {
  id: string;
  bodyHtml: string;
  imageUrl: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const { data } = await client.query({ query: GET_PRODUCTS });

      console.log(data);

      return data.products;
    } catch (error) {
      console.error(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;
export const selectLoading = (state: { products: ProductsState }) =>
  state.products.loading;

export default productsSlice.reducer;
