import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { X, Filter } from 'lucide-react';
import { categories, qualityFilters } from '@/data/sampleData';

interface FilterState {
  search: string;
  category: string;
  quality: string;
  location: string;
  priceRange: [number, number];
  availability: string;
  organic: boolean;
  verified: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  productCount: number;
}

export function ProductFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  productCount 
}: ProductFiltersProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'All Categories') count++;
    if (filters.quality !== 'All') count++;
    if (filters.location) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++;
    if (filters.availability !== 'All') count++;
    if (filters.organic) count++;
    if (filters.verified) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            disabled={activeFilterCount === 0}
          >
            Clear All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {productCount} products found
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Products
          </Label>
          <Input
            id="search"
            placeholder="Search by name, farmer, or description..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quality */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Quality Grade
          </Label>
          <Select
            value={filters.quality}
            onValueChange={(value) => updateFilter('quality', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              {qualityFilters.map((quality) => (
                <SelectItem key={quality} value={quality}>
                  {quality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-medium mb-2 block">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter city, country, or region..."
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range (USD)
          </Label>
          <div className="px-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Availability
          </Label>
          <Select
            value={filters.availability}
            onValueChange={(value) => updateFilter('availability', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Products</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Seasonal">Seasonal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Quick Filters
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="organic" className="text-sm cursor-pointer">
                Organic Only
              </label>
              <input
                id="organic"
                type="checkbox"
                checked={filters.organic}
                onChange={(e) => updateFilter('organic', e.target.checked)}
                className="rounded border-border"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="verified" className="text-sm cursor-pointer">
                Verified Farmers
              </label>
              <input
                id="verified"
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => updateFilter('verified', e.target.checked)}
                className="rounded border-border"
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Active Filters
            </Label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {filters.search}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter('search', '')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {filters.category !== 'All Categories' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter('category', 'All Categories')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {filters.quality !== 'All' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.quality}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter('quality', 'All')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {filters.organic && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Organic
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter('organic', false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {filters.verified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Verified
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter('verified', false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}