import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from './UserDropdown';
import { 
  Bell, 
  MessageCircle, 
  ShoppingCart 
} from 'lucide-react';

interface DashboardHeaderProps {
  showCart?: boolean;
  cartItemCount?: number;
}

export function DashboardHeader({ showCart = false, cartItemCount = 0 }: DashboardHeaderProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-16 space-x-3">
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
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          )}

          {/* User Menu */}
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}