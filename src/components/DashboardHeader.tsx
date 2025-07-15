import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from './UserDropdown';
import { Link } from 'react-router-dom';
import {
  Bell,
  MessageCircle,
  ShoppingCart,
  Leaf
} from 'lucide-react';

interface DashboardHeaderProps {
  showCart?: boolean;
  cartItemCount?: number;
}

export function DashboardHeader({ showCart = false, cartItemCount = 0 }: DashboardHeaderProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Agrilink</h1>
              <p className="text-xs text-muted-foreground">Global Harvest</p>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
                3
              </Badge>
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>

            {/* Cart - Only show for buyers */}
            {showCart && (
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}