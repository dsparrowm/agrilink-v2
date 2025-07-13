import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Grid, List, ArrowUpDown } from 'lucide-react';
import { sampleProducts } from '@/data/sampleData';
import { Product, CartItem } from '@/types';

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

export default function Marketplace() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    quality: 'All',
    location: '',
    priceRange: [0, 100],
    availability: 'All',
    organic: false,
    verified: false,
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.farmer.name.toLowerCase().includes(searchLower) ||
        product.farmer.farmName.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category !== 'All Categories') {
      products = products.filter(product => product.category === filters.category);
    }

    if (filters.quality !== 'All') {
      products = products.filter(product => product.quality === filters.quality);
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      products = products.filter(product =>
        product.location.toLowerCase().includes(locationLower)
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) {
      products = products.filter(product =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    if (filters.availability !== 'All') {
      products = products.filter(product => product.availability === filters.availability);
    }

    if (filters.organic) {
      products = products.filter(product => product.quality === 'Organic');
    }

    if (filters.verified) {
      products = products.filter(product => product.farmer.verified);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return products;
  }, [filters, sortBy]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      quality: 'All',
      location: '',
      priceRange: [0, 100],
      availability: 'All',
      organic: false,
      verified: false,
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Fresh Marketplace
                  </h1>
                  <p className="text-muted-foreground">
                    Discover fresh produce from verified farmers worldwide
                  </p>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results and Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {filteredProducts.length} products
                  </Badge>
                  {filters.search && (
                    <Badge variant="outline" className="text-sm">
                      Results for "{filters.search}"
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
