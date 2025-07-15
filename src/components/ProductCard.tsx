import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Calendar,
  Leaf,
  Shield
} from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Organic': return 'bg-green-100 text-green-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Seasonal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-fresh hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quality Badge */}
        <Badge
          className={`absolute top-3 left-3 ${getQualityColor(product.quality)} border-0 font-medium`}
        >
          {product.quality === 'Organic' && <Leaf className="w-3 h-3 mr-1" />}
          {product.quality}
        </Badge>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product.id);
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
          />
        </Button>

        {/* Availability Badge */}
        <Badge
          className={`absolute bottom-3 left-3 ${getAvailabilityColor(product.availability)} border-0 text-xs`}
        >
          {product.availability}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-sm text-muted-foreground">
            per {product.unit}
          </span>
        </div>

        {/* Farmer Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {product.farmer.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {product.farmer.farmName}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {product.location}
            </div>
          </div>
          {product.farmer.verified && (
            <Shield className="w-4 h-4 text-primary" />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Harvest Date */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          Harvested: {new Date(product.harvestDate).toLocaleDateString()}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to product detail page
              window.location.href = `/product/${product.id}`;
            }}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
              navigate('/cart');
            }}
            disabled={product.availability === 'Out of Stock'}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}