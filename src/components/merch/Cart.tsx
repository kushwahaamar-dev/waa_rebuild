"use client"

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, CheckCircle, Mail, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Step = 'cart' | 'checkout' | 'success';

export function Cart() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
    const [step, setStep] = useState<Step>('cart');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    const subtotal = getTotalPrice();

    const handleProceedToCheckout = () => {
        setStep('checkout');
        setError(null);
    };

    const handleBackToCart = () => {
        setStep('cart');
        setError(null);
    };

    const handleSubmitOrder = async () => {
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }
        if (!email.trim()) {
            setError('Please enter your email is required for the order');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Check for Welcome Package to track redemption
        const hasWelcomePackage = items.some(item => item.product.memberExclusive);

        if (hasWelcomePackage) {
            try {
                // We track it as "redeemed" when they click order, 
                // assuming they will send the email. It's a trade-off for the "free/easy" approach.
                const ethereum = (window as any).ethereum;
                if (ethereum?.request) {
                    const accounts = await ethereum.request({ method: 'eth_accounts' });
                    if (accounts?.[0]) {
                        await fetch('/api/redemption', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ address: accounts[0] }),
                        });
                    }
                }
            } catch (e) {
                console.error('Failed to mark redemption', e);
            }
        }

        // Construct Mailto Link
        const orderId = `WAA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        const subject = `New WAA Order: ${orderId}`;

        const itemsList = items.map(item =>
            `• ${item.quantity}x ${item.product.name} ${item.size ? `(${item.size})` : ''} - ${formatPrice(item.product.price * item.quantity)}`
        ).join('\n');

        const body = `
ORDER REQUEST: ${orderId}
========================

CUSTOMER DETAILS
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}

ORDER ITEMS
${itemsList}

------------------------
TOTAL: ${formatPrice(subtotal)}
------------------------

Please send this email to submit your order.
We will reply with payment instructions (Venmo/Zelle) and pickup details.
        `.trim();

        // recipients
        const recipients = 'intern@waatech.xyz,kushwahaamar2ak5@gmail.com';
        const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Clear cart and show success state
        setOrderId(orderId);
        setStep('success');
        clearCart();
        setIsSubmitting(false);
    };

    const handleClose = () => {
        closeCart();
        setTimeout(() => {
            setStep('cart');
            setName('');
            setEmail('');
            setPhone('');
            setError(null);
            setOrderId(null);
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-dark-1/60 backdrop-blur-sm z-50"
                    />

                    {/* Cart Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-light-1 shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Inner wrapper for proper layout */}
                        <div className="min-h-full flex flex-col">
                            {/* Header */}
                            <div className="sticky top-0 bg-light-1 z-10 flex items-center justify-between p-6 border-b border-dark-1/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-dark-1 flex items-center justify-center">
                                        {step === 'success' ? (
                                            <CheckCircle className="w-5 h-5 text-light-1" />
                                        ) : (
                                            <ShoppingBag className="w-5 h-5 text-light-1" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-serif text-dark-1">
                                            {step === 'cart' && 'Your Cart'}
                                            {step === 'checkout' && 'Checkout'}
                                            {step === 'success' && 'Order Placed!'}
                                        </h2>
                                        <p className="text-sm text-dark-1/40 font-mono">
                                            {step === 'cart' && `${items.length} ${items.length === 1 ? 'item' : 'items'}`}
                                            {step === 'checkout' && 'Enter your details'}
                                            {step === 'success' && orderId}
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={handleClose}
                                    className="p-3 hover:bg-dark-1/5 rounded-xl transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-5 h-5 text-dark-1" />
                                </motion.button>
                            </div>

                            {/* Content Area */}
                            <div className="p-6">
                                {/* Cart View */}
                                {step === 'cart' && (
                                    <div className="space-y-4">
                                        {items.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-16">
                                                <div className="w-24 h-24 rounded-3xl bg-dark-1/5 flex items-center justify-center mb-6">
                                                    <ShoppingBag className="w-10 h-10 text-dark-1/20" />
                                                </div>
                                                <h3 className="text-lg font-serif text-dark-1 mb-2">Your cart is empty</h3>
                                                <p className="text-sm text-dark-1/40 font-sans">Add some merch to get started</p>
                                            </div>
                                        ) : (
                                            items.map((item) => (
                                                <div
                                                    key={`${item.product.id}-${item.size}`}
                                                    className="flex gap-4 p-4 bg-white rounded-2xl border border-dark-1/5"
                                                >
                                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-dark-1/5 flex-shrink-0">
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h4 className="font-serif text-dark-1 truncate">{item.product.name}</h4>
                                                        <p className="text-sm text-dark-1/40 font-mono">
                                                            {item.size && `${item.size} • `}{formatPrice(item.product.price)}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                                                                className="p-1 hover:bg-dark-1/5 rounded-lg transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4 text-dark-1/60" />
                                                            </button>
                                                            <span className="w-8 text-center font-mono text-sm text-dark-1">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                                                                className="p-1 hover:bg-dark-1/5 rounded-lg transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4 text-dark-1/60" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.product.id, item.size)}
                                                        className="p-2 hover:bg-dark-1/5 rounded-xl transition-colors self-start"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-dark-1/30 hover:text-dark-1" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* Checkout Form */}
                                {step === 'checkout' && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-dark-1/40 mb-2">
                                                    Name *
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-1/30" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Your full name"
                                                        className="w-full pl-12 pr-4 py-4 bg-white border border-dark-1/10 rounded-xl text-dark-1 placeholder:text-dark-1/30 focus:outline-none focus:border-dark-1/30 transition-colors font-sans"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-dark-1/40 mb-2">
                                                    Email *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-1/30" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="your@email.com"
                                                        className="w-full pl-12 pr-4 py-4 bg-white border border-dark-1/10 rounded-xl text-dark-1 placeholder:text-dark-1/30 focus:outline-none focus:border-dark-1/30 transition-colors font-sans"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-dark-1/40 mb-2">
                                                    Phone (Optional)
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-1/30" />
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="(000) 000-0000"
                                                        className="w-full pl-12 pr-4 py-4 bg-white border border-dark-1/10 rounded-xl text-dark-1 placeholder:text-dark-1/30 focus:outline-none focus:border-dark-1/30 transition-colors font-sans"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-dark-1/5 rounded-xl border border-dark-1/10">
                                            <h4 className="text-sm font-mono uppercase tracking-wider text-dark-1/40 mb-3">Order Summary</h4>
                                            <div className="space-y-2">
                                                {items.map((item) => (
                                                    <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                                                        <span className="text-dark-1/70">
                                                            {item.quantity}x {item.product.name}{item.size && ` (${item.size})`}
                                                        </span>
                                                        <span className="font-mono text-dark-1">{formatPrice(item.product.price * item.quantity)}</span>
                                                    </div>
                                                ))}
                                                <div className="h-px bg-dark-1/10 my-2" />
                                                <div className="flex justify-between font-medium">
                                                    <span className="text-dark-1">Total</span>
                                                    <span className="font-serif text-lg text-dark-1">{formatPrice(subtotal)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-xs text-dark-1/40 text-center font-sans">
                                            After placing your order, you'll receive an email with payment instructions and pickup location.
                                        </p>

                                        {error && (
                                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Success View */}
                                {step === 'success' && (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-24 h-24 rounded-3xl bg-dark-1 flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-light-1" />
                                        </div>
                                        <h3 className="text-2xl font-serif text-dark-1 mb-2">Order Placed!</h3>
                                        <p className="text-dark-1/60 font-sans mb-6 max-w-sm">
                                            We've received your order. Check your email for payment instructions and pickup details.
                                        </p>
                                        <div className="p-4 bg-dark-1/5 rounded-xl text-center">
                                            <p className="text-xs font-mono uppercase tracking-wider text-dark-1/40 mb-1">Order ID</p>
                                            <p className="font-mono text-dark-1">{orderId}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer - Directly after content */}
                            {items.length > 0 && step !== 'success' && (
                                <div className="sticky bottom-0 bg-light-1 p-6 border-t border-dark-1/10 mt-auto space-y-4">
                                    {step === 'cart' && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-dark-1/60 font-sans">Subtotal</span>
                                                <span className="text-2xl font-serif text-dark-1">{formatPrice(subtotal)}</span>
                                            </div>
                                            <Button
                                                onClick={handleProceedToCheckout}
                                                className="w-full py-6 rounded-xl bg-dark-1 hover:bg-dark-1/90 text-light-1 font-sans"
                                            >
                                                Proceed to Checkout
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                            <button
                                                onClick={clearCart}
                                                className="w-full text-center text-sm text-dark-1/30 hover:text-dark-1 transition-colors font-mono py-2"
                                            >
                                                Clear Cart
                                            </button>
                                        </>
                                    )}

                                    {step === 'checkout' && (
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handleBackToCart}
                                                variant="outline"
                                                className="flex-1 py-6 rounded-xl"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                onClick={handleSubmitOrder}
                                                disabled={isSubmitting}
                                                className="flex-[2] py-6 rounded-xl bg-dark-1 hover:bg-dark-1/90 text-light-1"
                                            >
                                                {isSubmitting ? (
                                                    <motion.div
                                                        className="w-5 h-5 border-2 border-light-1/30 border-t-light-1 rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                ) : (
                                                    <>
                                                        Place Order via Email
                                                        <Mail className="w-4 h-4 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
