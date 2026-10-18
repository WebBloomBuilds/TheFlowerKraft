import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'pastel-light-lavender',
    name: 'Pastel Light Lavender',
    subtitle: 'Soft pastel light lavender, very light lavender background & dark lavender accents',
    swatches: ['#8E7CC3', '#DCD0FF', '#EDE7F6'],
  },
  {
    id: 'pink-lavender',
    name: 'Pastel Light Pink + Pastel Light Lavender',
    subtitle: 'Pastel light pink, pastel light lavender, soft cream & romantic gradients',
    swatches: ['#A56A91', '#F8C8DC', '#DCD0FF'],
  },
  {
    id: 'seagreen-lightred',
    name: 'Light Sea Green + Light Red',
    subtitle: 'Light sea green, soft light red, white background & muted teal accents',
    swatches: ['#367F75', '#8FDCC8', '#F08080'],
  },
  {
    id: 'pastel-seagreen',
    name: 'Pastel Sea Green',
    subtitle: 'Pastel sea green, soft mint green, pale aqua & dark teal accents',
    swatches: ['#1B564E', '#B2E3D5', '#D7F2E8'],
  },
  {
    id: 'mixed-pastel',
    name: 'Mixed Pastel Colours',
    subtitle: 'Harmonious mix of pastel sea green, peach, lavender, pink & cream',
    swatches: ['#B2E3D5', '#FFDAB9', '#DCD0FF', '#F8C8DC'],
  },
  {
    id: 'original-logo',
    name: 'Original Logo Colours',
    subtitle: 'Warm ivory background, dark olive green & refined gold accents (Reference Logo)',
    swatches: ['#284323', '#C49B38', '#FAF7F0'],
    isDefault: true,
  },
  {
    id: 'light-red',
    name: 'Light Red',
    subtitle: 'Soft light red, pastel blush, warm white & deep rose accents',
    swatches: ['#9B4148', '#F08080', '#FADADD'],
  },
];

export function ThemeProvider({ children }) {
  // 1. Current Theme State (default: original-logo)
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theflowerkart_theme');
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'original-logo';
  });

  // 2. Navigation State for 7 Core Pages:
  // 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState('home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 3. E-Commerce Cart State
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('theflowerkart_cart');
      if (savedCart) return JSON.parse(savedCart);
    } catch {
      // ignore
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Update document theme attribute & persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('theflowerkart_theme', currentTheme);
    } catch {
      // ignore
    }
  }, [currentTheme]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('theflowerkart_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const selectTheme = (themeId) => {
    setCurrentTheme(themeId);
    const chosen = THEMES.find((t) => t.id === themeId);
    showToast(`Switched palette to: ${chosen?.name}`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const navigateTo = (page, category = null) => {
    if (category) {
      setShopCategoryFilter(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Product Detail page
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: quantity,
        },
      ];
    });
    showToast(`Added ${quantity > 1 ? quantity + 'x ' : ''}"${product.name}" to cart`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Free delivery for orders above Rs 1999, else flat Rs 150
  const deliveryCharge = cartSubtotal > 1999 || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = cartSubtotal + deliveryCharge;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        selectTheme,
        themes: THEMES,
        currentPage,
        navigateTo,
        shopCategoryFilter,
        setShopCategoryFilter,
        selectedProduct,
        openProductDetails,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
        deliveryCharge,
        cartTotal,
        toastMessage,
        showToast,
        lastCompletedOrder,
        setLastCompletedOrder,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
