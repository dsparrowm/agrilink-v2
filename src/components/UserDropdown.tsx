import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Settings,
  LogOut,
  UserCircle,
  HelpCircle,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserDropdown() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear any stored user data (localStorage, sessionStorage, etc.)
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });

    // Redirect to homepage
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 rounded-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback className="bg-black text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">John Doe</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/billing" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}