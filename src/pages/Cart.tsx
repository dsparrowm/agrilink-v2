import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Minus,
    Plus,
    Trash2,
    ArrowLeft,
    ShoppingBag,
    MapPin,
    Clock,
    CreditCard
} from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    farmer: string;
    price: number;
    quantity: number;
    image: string;
    unit: string;
    location: string;
    deliveryTime: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Organic Tomatoes",
            farmer: "Green Valley Farm",
            price: 2.50,
            quantity: 3,
            image: "/assets/tomatoes.jpg",
            unit: "kg",
            location: "California, USA",
            deliveryTime: "2-3 days"
        },
        {
            id: 2,
            name: "Fresh Carrots",
            farmer: "Sunrise Organic",
            price: 1.80,
            quantity: 2,
            image: "/assets/carrots.jpg",
            unit: "kg",
            location: "Oregon, USA",
            deliveryTime: "1-2 days"
        },
        {
            id: 3,
            name: "Crisp Lettuce",
            farmer: "Farm Fresh Co.",
            price: 3.20,
            quantity: 1,
            image: "/assets/lettuce.jpg",
            unit: "kg",
            location: "Washington, USA",
            deliveryTime: "1-2 days"
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const applyPromoCode = () => {
        if (promoCode.toUpperCase() === 'FRESH10') {
            setDiscount(0.10);
        } else if (promoCode.toUpperCase() === 'HARVEST20') {
            setDiscount(0.20);
        } else {
            setDiscount(0);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * discount;
    const shipping = cartItems.length > 0 ? 5.99 : 0;
    const tax = (subtotal - discountAmount) * 0.08;
    const total = subtotal - discountAmount + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header cartItemCount={0} />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center max-w-md mx-auto">
                        <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">
                            Looks like you haven't added any fresh produce to your cart yet.
                        </p>
                        <Link to="/marketplace">
                            <Button size="lg" className="w-full">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header cartItemCount={cartItems.length} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link to="/marketplace" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">Shopping Cart</h1>
                    <p className="text-muted-foreground">
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cart Items</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={item.id}>
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />

                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">by {item.farmer}</p>
                                                <div className="flex items-center space-x-4 mt-1">
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {item.location}
                                                    </div>
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {item.deliveryTime}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}/{item.unit}</p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {index < cartItems.length - 1 && <Separator className="mt-4" />}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Promo Code</label>
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Enter code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                        />
                                        <Button variant="outline" onClick={applyPromoCode}>
                                            Apply
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Try: FRESH10 or HARVEST20
                                    </p>
                                </div>

                                <Button className="w-full" size="lg">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Proceed to Checkout
                                </Button>

                                <div className="text-center">
                                    <Link to="/marketplace">
                                        <Button variant="outline" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security Badge */}
                        <Card className="mt-4">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <Badge variant="secondary" className="mb-2">
                                        Secure Checkout
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">
                                        Your payment information is secure and encrypted
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
