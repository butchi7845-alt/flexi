import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatVND,
  removeVietnameseTones,
  calculateItemPrice,
  generateItemKey,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  calculateCartTotals,
  validatePromoCode,
  filterProducts,
  CHARM_UNIT_PRICE,
  ENGRAVING_FEE,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './cartLogic.ts';
import type { CartItem, Product } from '../types/index.ts';

test('formatVND formats Vietnamese currency correctly', () => {
  assert.equal(formatVND(499000), '499.000 ₫');
  assert.equal(formatVND(998000), '998.000 ₫');
  assert.equal(formatVND(0), '0 ₫');
});

test('removeVietnameseTones removes diacritics for searching', () => {
  assert.equal(removeVietnameseTones('Dép Sục FLEXI'), 'dep suc flexi');
  assert.equal(removeVietnameseTones('Chọn size & chăm sóc'), 'chon size & cham soc');
  assert.equal(removeVietnameseTones('Họa tiết da ngựa vằn'), 'hoa tiet da ngua van');
});

test('calculateItemPrice computes base, charms and engraving', () => {
  const base = 499000;
  // Standard shoe
  assert.equal(calculateItemPrice(base, 0, false), base);
  // Shoe with 3 charms
  assert.equal(calculateItemPrice(base, 3, false), base + 3 * CHARM_UNIT_PRICE);
  // Shoe with 5 charms and custom text engraving
  assert.equal(calculateItemPrice(base, 5, true), base + 5 * CHARM_UNIT_PRICE + ENGRAVING_FEE);
});

test('generateItemKey creates consistent keys', () => {
  const key1 = generateItemKey('clog-core', 'Kem', 39);
  const key2 = generateItemKey('clog-core', 'Kem', 39);
  const key3 = generateItemKey('clog-core', 'Đen', 39);
  const key4 = generateItemKey('clog-core', 'Kem', 40);

  assert.equal(key1, key2);
  assert.notEqual(key1, key3);
  assert.notEqual(key1, key4);
});

test('addItemToCart merges duplicates correctly (FLEXI-v4 compliance test)', () => {
  // Test case matching KIEM-TRA-BAN-V4.txt: Adding same item twice aggregates quantity to 2
  const initialItems: CartItem[] = [];
  const standardItem: CartItem = {
    itemKey: generateItemKey('clog-core', 'Kem', 39),
    productId: 'clog-core',
    productName: 'FLEXI Clog Classic',
    colorName: 'Kem',
    colorHex: '#EFECE6',
    size: 39,
    unitPrice: 499000,
    quantity: 1,
    image: '/assets/clog-color-cream.png',
  };

  // 1st add
  const step1 = addItemToCart(initialItems, standardItem);
  assert.equal(step1.length, 1);
  assert.equal(step1[0].quantity, 1);
  assert.equal(step1[0].unitPrice * step1[0].quantity, 499000);

  // 2nd add (same item)
  const step2 = addItemToCart(step1, standardItem);
  assert.equal(step2.length, 1, 'Should NOT create duplicate row');
  assert.equal(step2[0].quantity, 2, 'Quantity should increment to 2');
  assert.equal(step2[0].unitPrice * step2[0].quantity, 998000, 'Total should be 998.000 ₫');

  // Adding different size should create new row
  const differentSizeItem: CartItem = {
    ...standardItem,
    size: 40,
    itemKey: generateItemKey('clog-core', 'Kem', 40),
  };
  const step3 = addItemToCart(step2, differentSizeItem);
  assert.equal(step3.length, 2);
  assert.equal(step3[0].quantity, 2);
  assert.equal(step3[1].quantity, 1);
});

test('updateItemQuantity adjusts quantity or removes when reaching 0', () => {
  const item: CartItem = {
    itemKey: 'key_1',
    productId: 'clog-core',
    productName: 'FLEXI Clog Classic',
    colorName: 'Kem',
    colorHex: '#EFECE6',
    size: 39,
    unitPrice: 499000,
    quantity: 2,
    image: '',
  };

  // Increment
  const plusOne = updateItemQuantity([item], 'key_1', 1);
  assert.equal(plusOne[0].quantity, 3);

  // Decrement to 1
  const minusOne = updateItemQuantity(plusOne, 'key_1', -2);
  assert.equal(minusOne[0].quantity, 1);

  // Decrement to 0 removes item
  const removed = updateItemQuantity(minusOne, 'key_1', -1);
  assert.equal(removed.length, 0);
});

test('removeItemFromCart removes specific item', () => {
  const items: CartItem[] = [
    {
      itemKey: 'item_a',
      productId: 'p1',
      productName: 'A',
      colorName: 'Kem',
      colorHex: '#fff',
      size: 38,
      unitPrice: 499000,
      quantity: 1,
      image: '',
    },
    {
      itemKey: 'item_b',
      productId: 'p2',
      productName: 'B',
      colorName: 'Đen',
      colorHex: '#000',
      size: 39,
      unitPrice: 399000,
      quantity: 1,
      image: '',
    },
  ];

  const afterRemove = removeItemFromCart(items, 'item_a');
  assert.equal(afterRemove.length, 1);
  assert.equal(afterRemove[0].itemKey, 'item_b');
});

test('calculateCartTotals computes subtotal, discounts and free shipping threshold', () => {
  const itemUnder500k: CartItem = {
    itemKey: 'item_1',
    productId: 'p1',
    productName: 'Clog',
    colorName: 'Kem',
    colorHex: '#fff',
    size: 39,
    unitPrice: 499000,
    quantity: 1,
    image: '',
  };

  // Under 500k -> charges shipping
  const totals1 = calculateCartTotals([itemUnder500k], null);
  assert.equal(totals1.subtotal, 499000);
  assert.equal(totals1.shipping, STANDARD_SHIPPING_FEE);
  assert.equal(totals1.total, 499000 + STANDARD_SHIPPING_FEE);

  // Over 500k (2 items) -> free shipping
  const item2: CartItem = { ...itemUnder500k, quantity: 2 };
  const totals2 = calculateCartTotals([item2], null);
  assert.equal(totals2.subtotal, 998000);
  assert.equal(totals2.shipping, 0);
  assert.equal(totals2.total, 998000);

  // With 10% promo code FLEXI2026
  const totals3 = calculateCartTotals([item2], 'FLEXI2026');
  assert.equal(totals3.discount, 99800);
  assert.equal(totals3.total, 998000 - 99800);
});

test('filterProducts handles multi-criterion and accent-insensitive matching', () => {
  const sampleProducts: Product[] = [
    {
      id: 'clog-core',
      name: 'FLEXI Clog Classic',
      tagline: 'Êm ái cả ngày',
      category: 'clog',
      basePrice: 499000,
      rating: 4.9,
      reviewCount: 128,
      description: 'Dép sục bít mũi chống trượt kháng khuẩn',
      features: ['Nhẹ êm', 'Thoáng khí'],
      materials: 'EVA Phylon',
      availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      variants: [
        { colorName: 'Màu Kem', colorHex: '#EFECE6', image: '', alt: 'Kem' },
        { colorName: 'Xanh Olive', colorHex: '#556B2F', image: '', alt: 'Olive' },
      ],
      views: { side: '', top: '', sole: '' },
    },
    {
      id: 'slide-comfort',
      name: 'FLEXI Slide Quai Ngang',
      tagline: 'Phóng khoáng tự do',
      category: 'slide',
      basePrice: 389000,
      rating: 4.8,
      reviewCount: 64,
      description: 'Dép quai ngang đế đúc dày 4cm',
      features: ['Đế cao 4cm', 'Nhanh khô'],
      materials: 'EVA SoftCloud',
      availableSizes: [36, 37, 38, 39, 40, 41, 42],
      variants: [{ colorName: 'Đen Tuyển', colorHex: '#1C1C1E', image: '', alt: 'Đen' }],
      views: { side: '', top: '', sole: '' },
    },
  ];

  // Accent-insensitive search "dep suc" should find "FLEXI Clog Classic"
  const searchResult = filterProducts(sampleProducts, 'dep suc');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'clog-core');

  // Search by color "olive"
  const colorResult = filterProducts(sampleProducts, 'olive');
  assert.equal(colorResult.length, 1);
  assert.equal(colorResult[0].id, 'clog-core');

  // Filter by category "slide"
  const catResult = filterProducts(sampleProducts, '', 'slide');
  assert.equal(catResult.length, 1);
  assert.equal(catResult[0].id, 'slide-comfort');
});
