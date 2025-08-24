'use client';

import { useTranslations } from 'next-intl';
import type { ProductFilters } from '@/types';

interface FilterBarProps {
  categories: string[];
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
}

export function FilterBar({ categories, filters, onFiltersChange }: FilterBarProps) {
  const t = useTranslations();

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('products.filterByCategory')}</label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value })}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">{t('products.allProducts')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Min {t('product.price')}</label>
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) })}
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Max {t('product.price')}</label>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) })}
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('products.sortBy')}</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as ProductFilters['sortBy'] })}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="name-asc">{t('products.sortOptions.nameAsc')}</option>
            <option value="name-desc">{t('products.sortOptions.nameDesc')}</option>
            <option value="price-asc">{t('products.sortOptions.priceAsc')}</option>
            <option value="price-desc">{t('products.sortOptions.priceDesc')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
