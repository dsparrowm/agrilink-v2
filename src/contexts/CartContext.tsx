import { createContext, useContext, useState, ReactNode } from 'react';

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

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getCartItemCount: () => number;
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
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

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartItemCount,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
