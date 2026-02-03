import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const { user } = useAuth();
    const [selection, setSelection] = useState([]);
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [view, setView] = useState('landing'); // landing, explore, selection, checkout, product-detail
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isViewingMode, setIsViewingMode] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const lastSyncedCart = useRef('[]');
    const hasInteracted = useRef(false);

    // Initial load: Fetch cart and products from backend
    useEffect(() => {
        const fetchData = async () => {
            setIsInitialized(false);
            hasInteracted.current = false;
            lastSyncedCart.current = '[]';
            console.log('🛒 Loading store data from server...');
            try {
                // Fetch Cart
                const cartResponse = await fetch('http://localhost:5000/api/cart', {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include'
                });
                const cartData = await cartResponse.json();
                if (cartResponse.ok && cartData.items) {
                    const formattedItems = cartData.items.map(item => ({
                        ...item,
                        price: typeof item.price === 'number'
                            ? `$${item.price.toLocaleString()}`
                            : item.price
                    }));
                    const cleanItems = formattedItems.map(({ _id, __v, ...rest }) => rest);
                    setSelection(formattedItems);
                    lastSyncedCart.current = JSON.stringify(cleanItems);
                }

                // Fetch Products
                const productsResponse = await fetch('http://localhost:5000/api/products');
                const productsData = await productsResponse.json();
                if (productsResponse.ok) {
                    setProducts(productsData);
                    console.log(`✨ Loaded ${productsData.length} products from database.`);
                }
            } catch (error) {
                console.error('❌ Error fetching store data:', error);
            } finally {
                setIsInitialized(true);
            }
        };
        fetchData();
    }, [user]);

    // Sync cart to backend whenever selection changes
    useEffect(() => {
        if (!isInitialized) return;

        // Strip IDs from local selection for a fair comparison with the server
        const cleanSelection = selection.map(({ _id, __v, ...rest }) => rest);
        const currentStr = JSON.stringify(cleanSelection);

        // If nothing actually changed, stop here.
        if (currentStr === lastSyncedCart.current) return;

        // EMERGENCY GUARD: Only block empty sync if the user has NOT interacted with the page yet.
        if (selection.length === 0 && lastSyncedCart.current !== '[]' && !hasInteracted.current) {
            console.log('⚠️ Blocking accidental empty sync. (No user interaction detected)');
            // Only allow clearing if we are 100% sure this was a user action
            // For now, we return to prevent the 'vanishing' bug.
            return;
        }

        const syncCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ items: selection })
                });
                if (response.ok) {
                    lastSyncedCart.current = currentStr;
                    console.log('☁️ Cart synced to cloud.');
                }
            } catch (error) {
                console.error('❌ Sync failed:', error);
            }
        };

        const timeoutId = setTimeout(syncCart, 1500); // 1.5s delay
        return () => clearTimeout(timeoutId);
    }, [selection, isInitialized]);

    const addToSelection = (product, quantity = 1) => {
        hasInteracted.current = true;
        const existing = selection.find(item => (item.id === product.id || item.productId === product.id));
        if (existing) {
            setSelection(prev => prev.map(item =>
                (item.id === product.id || item.productId === product.id)
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setSelection(prev => [...prev, {
                productId: product.id,
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.img,
                category: product.category,
                quantity
            }]);
        }
    };

    const toggleWishlist = (product) => {
        const isInWishlist = wishlist.find(item => (item.id === product.id || item.productId === product.id));
        if (isInWishlist) {
            setWishlist(prev => prev.filter(item => (item.id !== product.id && item.productId !== product.id)));
            return false;
        } else {
            setWishlist(prev => [...prev, product]);
            return true;
        }
    };

    const updateQuantity = (id, delta) => {
        hasInteracted.current = true;
        setSelection(prev => prev.map(item => {
            if (item.id === id || item.productId === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromSelection = (id) => {
        hasInteracted.current = true;
        setSelection(prev => prev.filter(item => (item.id !== id && item.productId !== id)));
    };

    const viewProductDetail = (product) => {
        setSelectedProduct(product);
        setView('product-detail');
    };

    const clearSelection = () => {
        hasInteracted.current = true;
        setSelection([]);
    };

    // Auto-scroll to top when view changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    return (
        <StoreContext.Provider value={{
            selection,
            products,
            wishlist,
            addToSelection,
            toggleWishlist,
            removeFromSelection,
            updateQuantity,
            clearSelection,
            view,
            setView,
            selectedProduct,
            viewProductDetail,
            isViewingMode,
            setIsViewingMode
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
