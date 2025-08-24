'use client';

import { useEffect, useMemo, useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { OptimizedImage } from '@/components/optimized-image';
import { useTranslations } from '@/hooks/use-translations';
import { setStaticProducts, setCategories, updateFilters, resetFilters } from '@/lib/store/slices/products-slice';
import { addToCart } from '@/lib/store/slices/cart-slice';
import type { Product } from '@/types';
import type { RootState } from '@/lib/store';

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategories: string[];
}

const ITEMS_PER_PAGE = 10;

const ProductCard = memo(({ product, locale, t, onAddToCart }: {
  product: Product;
  locale: string;
  t: (key: string) => string;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}) => (
  <div className="group border border-border/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 bg-card hover:scale-[1.02] h-full flex flex-col relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
    
    <Link href={`/${locale}/products/${product.id}`} className="cursor-pointer block flex-1 relative z-10">
      <div className="h-56 mb-6 flex items-center justify-center bg-gradient-to-br from-muted/30 to-accent/20 rounded-xl overflow-hidden group-hover:from-muted/40 group-hover:to-accent/30 transition-all duration-500 p-4">
        <OptimizedImage 
          src={product.image} 
          alt={product.title}
          width={300}
          height={300}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
        />
      </div>
      
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="h-14 flex items-start">
          <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight" title={product.title}>
            {product.title.length > 50 ? product.title.substring(0, 50) + '...' : product.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-muted-foreground text-xs font-semibold capitalize bg-muted/40 px-3 py-1.5 rounded-full border border-muted">
            {product.category}
          </span>
          <p className="font-black text-2xl text-primary">
            ₺{product.price}
          </p>
        </div>
      </div>
    </Link>
    
    <button 
      className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer shadow-sm relative z-10"
      onClick={(e) => onAddToCart(product, e)}
    >
      {t('common.addToCart')}
    </button>
  </div>
));

ProductCard.displayName = 'ProductCard';

const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev,
  t 
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  t: (key: string) => string;
}) => {
  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center mt-16 mb-8">
      <div className="bg-gradient-to-r from-background/80 to-muted/30 backdrop-blur-sm border border-border/30 rounded-2xl p-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-background/60 text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 font-semibold shadow-sm backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">{t('products.previous')}</span>
          </button>
          
          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`w-12 h-12 rounded-xl transition-all duration-300 font-bold text-sm flex items-center justify-center ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg transform scale-110 border-2 border-white/20 cursor-pointer'
                    : page === '...'
                    ? 'bg-transparent cursor-default text-muted-foreground'
                    : 'bg-background/60 text-foreground hover:bg-primary/10 hover:text-primary hover:scale-105 shadow-sm backdrop-blur-sm cursor-pointer'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-background/60 text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 font-semibold shadow-sm backdrop-blur-sm"
          >
            <span className="hidden sm:inline">{t('products.next')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

function ProductsClient({ 
  initialProducts, 
  initialCategories 
}: ProductsClientProps) {
  const dispatch = useDispatch();
  const { t, locale } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);

  const { filteredProducts, categories, filters } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(setStaticProducts(initialProducts));
    dispatch(setCategories(initialCategories));
  }, [dispatch, initialProducts, initialCategories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleCategoryChange = useCallback((category: string) => {
    dispatch(updateFilters({ category }));
  }, [dispatch]);

  const handleSortChange = useCallback((sortBy: string) => {
    dispatch(updateFilters({ sortBy: sortBy as 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' }));
  }, [dispatch]);

  const handleClearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleAddToCart = useCallback((product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(t('notifications.addedToCart'));
  }, [dispatch, t]);

  const categoryOptions = useMemo(() => {
    return categories.map(category => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    }));
  }, [categories]);

  const sortOptions = useMemo(() => [
    { value: '', label: t('products.default') },
    { value: 'price-asc', label: t('products.priceAsc') },
    { value: 'price-desc', label: t('products.priceDesc') },
    { value: 'name-asc', label: t('products.nameAsc') },
    { value: 'name-desc', label: t('products.nameDesc') }
  ], [t]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      paginatedProducts,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleNextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNextPage]);

  const handlePrevPage = useCallback(() => {
    if (paginationData.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPrevPage]);

  return (
    <div className="w-full">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight">{t('products.title')}</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-gradient-to-r from-background/90 to-muted/40 border border-border/30 p-6 rounded-3xl mb-12 backdrop-blur-sm shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-foreground">{t('products.category')}</label>
            <div className="relative">
              <select 
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-3 border border-border/50 rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 cursor-pointer appearance-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem"
                }}
              >
                <option value="">{t('products.allCategories')}</option>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-background text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-3 text-foreground">{t('products.sortBy')}</label>
            <div className="relative">
              <select 
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-3 border border-border/50 rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 cursor-pointer appearance-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem"
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-background text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={handleClearFilters}
              className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground py-3 px-6 rounded-xl hover:from-secondary/90 hover:to-secondary/70 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              {t('products.clearFilters')}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-blue-600/5 to-purple-600/5 border border-border/30 rounded-2xl p-4 mb-8 backdrop-blur-sm">
        <p className="text-foreground font-medium text-center">
          <span className="font-bold text-primary">{filteredProducts.length}</span> {t('products.found')} 
          {paginationData.totalPages > 1 && (
            <span className="ml-2 text-muted-foreground">
              ({paginationData.startIndex + 1}-{Math.min(paginationData.endIndex, filteredProducts.length)} {t('products.showing')})
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {paginationData.paginatedProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard
              product={product}
              locale={locale}
              t={t}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-muted/50 to-accent/30 border border-border/50 rounded-3xl p-12 max-w-md mx-auto backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-muted to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-foreground text-xl font-semibold mb-2">{t('products.noProducts')}</p>
            <p className="text-muted-foreground">Filtrelerinizi değiştirmeyi deneyin</p>
          </div>
        </div>
      )}

      {paginationData.totalPages > 1 && (
        <div className="space-y-6">
          <Pagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handlePageChange}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            hasNext={paginationData.hasNextPage}
            hasPrev={paginationData.hasPrevPage}
            t={t}
          />
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-muted/40 to-accent/20 border border-border/30 rounded-2xl backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">
                {locale === 'tr' ? 'Sayfa' : 'Page'} 
                <span className="font-bold text-primary mx-2">{currentPage}</span> 
                {locale === 'tr' ? '/' : 'of'} 
                <span className="font-bold text-foreground ml-2">{paginationData.totalPages}</span>
              </span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-primary">{filteredProducts.length}</span> 
                {locale === 'tr' ? ' toplam ürün' : ' total products'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductsClient);
