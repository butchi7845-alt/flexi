import type { CartItem, Product } from '../types/index.ts';

export const CHARM_UNIT_PRICE = 25000;
export const ENGRAVING_FEE = 30000;
export const FREE_SHIPPING_THRESHOLD = 500000;
export const STANDARD_SHIPPING_FEE = 30000;

/**
 * Format a number into Vietnamese Dong currency string (e.g., 499.000 ₫)
 */
export function formatVND(amount: number): string {
  if (isNaN(amount)) return '0 ₫';
  const rounded = Math.round(amount);
  return `${rounded.toLocaleString('vi-VN')} ₫`;
}

/**
 * Remove Vietnamese accents/diacritics for flexible fuzzy searching
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  let result = str.toLowerCase();
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');
  // Combine marks removal
  result = result.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  result = result.replace(/\u02C6|\u0306|\u031B/g, '');
  return result.trim();
}

/**
 * Generate a unique deterministic key for cart items.
 * Standard products with identical (productId, colorName, size) will share the same key
 * so they merge and accumulate quantity.
 */
export function generateItemKey(
  productId: string,
  colorName: string,
  size: number,
  isCustom?: boolean,
  customHash?: string
): string {
  if (isCustom && customHash) {
    return `custom_${productId}_${colorName}_${size}_${customHash}`;
  }
  return `std_${productId}_${colorName.toLowerCase().replace(/\s+/g, '_')}_${size}`;
}

/**
 * Calculate the total unit price of an item including optional custom additions
 */
export function calculateItemPrice(
  basePrice: number,
  charmCount: number = 0,
  hasEngraving: boolean = false
): number {
  return basePrice + charmCount * CHARM_UNIT_PRICE + (hasEngraving ? ENGRAVING_FEE : 0);
}

/**
 * Add an item to the cart. If duplicate exists (same itemKey), sum their quantities.
 */
export function addItemToCart(items: CartItem[], newItem: CartItem): CartItem[] {
  const existingIndex = items.findIndex((it) => it.itemKey === newItem.itemKey);
  if (existingIndex > -1) {
    const updated = [...items];
    const current = updated[existingIndex];
    updated[existingIndex] = {
      ...current,
      quantity: current.quantity + (newItem.quantity || 1),
    };
    return updated;
  }
  return [...items, { ...newItem, quantity: Math.max(1, newItem.quantity || 1) }];
}

/**
 * Update quantity of a specific cart item. If qty <= 0, remove it.
 */
export function updateItemQuantity(items: CartItem[], itemKey: string, delta: number): CartItem[] {
  return items
    .map((item) => {
      if (item.itemKey === itemKey) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
}

/**
 * Remove an item completely by its itemKey
 */
export function removeItemFromCart(items: CartItem[], itemKey: string): CartItem[] {
  return items.filter((item) => item.itemKey !== itemKey);
}

export interface PromoValidationResult {
  valid: boolean;
  code: string;
  discountPercent?: number;
  discountAmount: number;
  message: string;
}

/**
 * Validate promo codes
 */
export function validatePromoCode(rawCode: string, subtotal: number): PromoValidationResult {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code) {
    return { valid: false, code: '', discountAmount: 0, message: 'Vui lòng nhập mã giảm giá' };
  }

  if (code === 'FLEXI2026' || code === 'FLEXI10') {
    const discountAmount = Math.round(subtotal * 0.1);
    return {
      valid: true,
      code,
      discountPercent: 10,
      discountAmount,
      message: 'Áp dụng thành công: Giảm 10% tổng đơn hàng!',
    };
  }

  if (code === 'STEPINTOYOURDAY') {
    if (subtotal < 400000) {
      return {
        valid: false,
        code,
        discountAmount: 0,
        message: 'Mã STEPINTOYOURDAY chỉ áp dụng cho đơn từ 400.000 ₫',
      };
    }
    return {
      valid: true,
      code,
      discountAmount: 50000,
      message: 'Áp dụng thành công: Giảm 50.000 ₫ từ FLEXI!',
    };
  }

  if (code === 'FREESHIP') {
    return {
      valid: true,
      code,
      discountAmount: STANDARD_SHIPPING_FEE,
      message: 'Áp dụng thành công: Miễn phí vận chuyển toàn quốc!',
    };
  }

  return {
    valid: false,
    code,
    discountAmount: 0,
    message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn',
  };
}

/**
 * Calculate cart subtotal, discount, shipping fee, and grand total
 */
export function calculateCartTotals(items: CartItem[], promoCode?: string | null) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discount = 0;
  let isFreeShipCode = false;

  if (promoCode && subtotal > 0) {
    const validation = validatePromoCode(promoCode, subtotal);
    if (validation.valid) {
      if (validation.code === 'FREESHIP') {
        isFreeShipCode = true;
      } else {
        discount = validation.discountAmount;
      }
    }
  }

  let shipping = 0;
  if (subtotal > 0) {
    if (isFreeShipCode || subtotal >= FREE_SHIPPING_THRESHOLD) {
      shipping = 0;
    } else {
      shipping = STANDARD_SHIPPING_FEE;
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  return {
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
  };
}

/**
 * Search and filter products
 */
export function filterProducts(
  products: Product[],
  searchQuery: string = '',
  categoryFilter: string = 'all',
  maxPrice?: number
): Product[] {
  const normalizedQuery = removeVietnameseTones(searchQuery.trim());

  return products.filter((p) => {
    // Category match
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }

    // Price match
    if (maxPrice && p.basePrice > maxPrice) {
      return false;
    }

    // Query match
    if (!normalizedQuery) return true;

    const nameMatch = removeVietnameseTones(p.name).includes(normalizedQuery);
    const taglineMatch = removeVietnameseTones(p.tagline).includes(normalizedQuery);
    const descMatch = removeVietnameseTones(p.description).includes(normalizedQuery);
    const colorMatch = p.variants.some((v) =>
      removeVietnameseTones(v.colorName).includes(normalizedQuery)
    );

    return nameMatch || taglineMatch || descMatch || colorMatch;
  });
}
