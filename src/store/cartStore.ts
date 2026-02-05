"use client"

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
    product: Product;
    quantity: number;
    size?: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, size?: string) => void;
    removeItem: (productId: string, size?: string) => void;
    updateQuantity: (productId: string, quantity: number, size?: string) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    // Computed
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product: Product, size?: string) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        item => item.product.id === product.id && item.size === size
                    );

                    if (existingIndex > -1) {
                        const newItems = [...state.items];
                        newItems[existingIndex].quantity += 1;
                        return { items: newItems, isOpen: true };
                    }

                    return {
                        items: [...state.items, { product, quantity: 1, size }],
                        isOpen: true,
                    };
                });
            },

            removeItem: (productId: string, size?: string) => {
                set((state) => ({
                    items: state.items.filter(
                        item => !(item.product.id === productId && item.size === size)
                    ),
                }));
            },

            updateQuantity: (productId: string, quantity: number, size?: string) => {
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter(
                                item => !(item.product.id === productId && item.size === size)
                            ),
                        };
                    }

                    return {
                        items: state.items.map(item =>
                            item.product.id === productId && item.size === size
                                ? { ...item, quantity }
                                : item
                        ),
                    };
                });
            },

            clearCart: () => set({ items: [] }),

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'waa-cart',
            partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
        }
    )
);
