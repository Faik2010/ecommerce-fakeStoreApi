import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductFilters } from '@/types';

interface ProductsState {
  staticProducts: Product[];
  filteredProducts: Product[];
  categories: string[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  filterCache: Record<string, Product[]>;
}

const initialState: ProductsState = {
  staticProducts: [],
  filteredProducts: [],
  categories: [],
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'price-asc',
  },
  isLoading: false,
  error: null,
  filterCache: {},
};

const createCacheKey = (filters: ProductFilters): string => {
  return `${filters.category}-${filters.minPrice}-${filters.maxPrice}-${filters.sortBy}`;
};

const filterAndSortProducts = (
  products: Product[],
  filters: ProductFilters,
  cache: Record<string, Product[]>
): Product[] => {
  const cacheKey = createCacheKey(filters);
  
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let filtered = products;

  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  // Fiyat aralığı filtresi
  filtered = filtered.filter(product => 
    product.price >= filters.minPrice && product.price <= filters.maxPrice
  );

  switch (filters.sortBy) {
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  cache[cacheKey] = filtered;
  
  const cacheKeys = Object.keys(cache);
  if (cacheKeys.length > 10) {
    delete cache[cacheKeys[0]];
  }

  return filtered;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setStaticProducts: (state, action: PayloadAction<Product[]>) => {
      state.staticProducts = action.payload;
      state.filterCache = {};
      state.filteredProducts = filterAndSortProducts(action.payload, state.filters, state.filterCache);
    },
    
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    
    updateFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      const newFilters = { ...state.filters, ...action.payload };
      const filtersChanged = JSON.stringify(newFilters) !== JSON.stringify(state.filters);
      
      if (filtersChanged) {
        state.filters = newFilters;
        state.filteredProducts = filterAndSortProducts(state.staticProducts, state.filters, state.filterCache);
      }
    },
    
    resetFilters: (state) => {
      state.filters = {
        category: '',
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'price-asc',
      };
      state.filterCache = {};
      state.filteredProducts = filterAndSortProducts(state.staticProducts, state.filters, state.filterCache);
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearCache: (state) => {
      state.filterCache = {};
    },
  },
});

export const {
  setStaticProducts,
  setCategories,
  updateFilters,
  resetFilters,
  setLoading,
  setError,
  clearCache,
} = productsSlice.actions;

export default productsSlice.reducer;
