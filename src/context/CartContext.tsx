import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CustomDesign, Product } from '../types/index.ts';
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  calculateCartTotals,
  generateItemKey,
  calculateItemPrice,
  formatVND,
} from '../utils/cartLogic.ts';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  toasts: ToastInfo[];
  addStandardItem: (
    product: Product,
    colorName: string,
    colorHex: string,
    size: number,
    quantity?: number
  ) => boolean;
  addCustomItem: (customDesign: CustomDesign) => void;
  updateQuantity: (itemKey: string, delta: number) => void;
  removeItem: (itemKey: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'flexi_cart_v4';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or disabled
    }

    // Dispatch custom event for interoperability
    window.dispatchEvent(new CustomEvent('flexi:cart-updated', { detail: { items } }));
  }, [items]);

  // Listen to cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Expose FLEXIShop on window for test suites / backward compatibility
  useEffect(() => {
    (window as unknown as { FLEXIShop: unknown }).FLEXIShop = {
      DEMO_PRICE: 499000,
      COLOR_LABELS: {
        cream: 'Màu Kem (Cream)',
        black: 'Đen Tuyển (Black)',
        gray: 'Xám Xi Măng (Gray)',
        pink: 'Hồng Pastel (Pink)',
        blue: 'Xanh Biển (Ocean Blue)',
        olive: 'Xanh Olive (Olive Green)',
      },
      read: () => {
        try {
          return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
          return [];
        }
      },
      write: (newItems: CartItem[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        setItems(newItems);
      },
      getTotal: (cartList: CartItem[]) => {
        return cartList.reduce((sum, it) => sum + (it.unitPrice || 499000) * (it.quantity || 1), 0);
      },
      money: (num: number) => formatVND(num),
      addStandard: (color: string, size: number) => {
        const itemKey = generateItemKey('clog-core', color, size);
        const newItem: CartItem = {
          itemKey,
          productId: 'clog-core',
          productName: 'FLEXI Clog Classic',
          colorName: color,
          colorHex: '#EFECE6',
          size,
          unitPrice: 499000,
          quantity: 1,
          image: 'clog-color-cream.png',
        };
        setItems((prev) => addItemToCart(prev, newItem));
      },
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addStandardItem = (
    product: Product,
    colorName: string,
    colorHex: string,
    size: number,
    quantity: number = 1
  ): boolean => {
    if (!size) {
      showToast('Vui lòng chọn size (kích cỡ) trước khi thêm vào giỏ!', 'warning');
      return false;
    }

    const itemKey = generateItemKey(product.id, colorName, size);
    const newItem: CartItem = {
      itemKey,
      productId: product.id,
      productName: product.name,
      colorName,
      colorHex,
      size,
      unitPrice: product.basePrice,
      quantity,
      image: product.variants.find((v) => v.colorName === colorName)?.image || '',
    };

    setItems((prev) => addItemToCart(prev, newItem));
    showToast(`Đã thêm ${product.name} (Size ${size}) vào giỏ hàng!`, 'success');
    return true;
  };

  const addCustomItem = (customDesign: CustomDesign) => {
    const charmCount = customDesign.charms.length;
    const hasEngraving = Boolean(customDesign.customText && customDesign.customText.trim());
    const unitPrice = calculateItemPrice(499000, charmCount, hasEngraving);

    const customHash = `${customDesign.baseColor}_${customDesign.patternId || 'none'}_${customDesign.customText || ''}_${customDesign.charms.map((c) => c.charmId).sort().join('-')}`;
    const itemKey = generateItemKey(
      customDesign.baseProductId,
      customDesign.baseColor,
      customDesign.size,
      true,
      customHash
    );

    const newItem: CartItem = {
      itemKey,
      productId: customDesign.baseProductId,
      productName: `${customDesign.productName} [Bản phối Studio]`,
      colorName: customDesign.baseColor,
      colorHex: customDesign.colorHex,
      size: customDesign.size,
      unitPrice,
      quantity: 1,
      image: 'clog-color-cream.png',
      isCustom: true,
      customDesign,
    };

    setItems((prev) => addItemToCart(prev, newItem));
    showToast(`Đã lưu bản phối Studio độc quyền vào giỏ hàng!`, 'success');
  };

  const updateQuantity = (itemKey: string, delta: number) => {
    setItems((prev) => updateItemQuantity(prev, itemKey, delta));
  };

  const removeItem = (itemKey: string) => {
    setItems((prev) => removeItemFromCart(prev, itemKey));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
  };

  const applyPromoCode = (code: string): boolean => {
    setPromoCode(code.trim().toUpperCase());
    return true;
  };

  const removePromoCode = () => {
    setPromoCode('');
    showToast('Đã hủy áp dụng mã giảm giá', 'info');
  };

  const totals = calculateCartTotals(items, promoCode);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: totals.itemCount,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        promoCode,
        isCartOpen,
        isSearchOpen,
        isSizeGuideOpen,
        toasts,
        addStandardItem,
        addCustomItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode,
        setIsCartOpen,
        setIsSearchOpen,
        setIsSizeGuideOpen,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
