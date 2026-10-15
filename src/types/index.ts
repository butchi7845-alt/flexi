export type ProductCategory = 'clog' | 'slide' | 'sandal';

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
  alt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  userColor?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  basePrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  materials: string;
  availableSizes: number[];
  variants: ProductVariant[];
  views: {
    side: string;
    top: string;
    sole: string;
    lifestyle?: string;
  };
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Charm {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'cute' | 'street' | 'nature' | 'symbols';
  price: number;
  emoji: string;
  color: string;
  svgPathType: string;
}

export interface Pattern {
  id: string;
  name: string;
  vietnameseName: string;
  patternType: 'star-doodle' | 'dripping-star' | 'halftone-band' | 'zebra' | 'leopard' | 'lightning';
}

export interface PlacedCharm {
  instanceId: string;
  charmId: string;
  holeIndex: number; // 0 to 4 (5 placement spots)
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
}

export interface CustomDesign {
  baseProductId: string;
  productName: string;
  baseColor: string;
  colorHex: string;
  size: number;
  patternId?: string;
  patternOpacity?: number;
  customText?: string;
  textColor?: string;
  textFont?: string;
  textPosition?: 'strap' | 'lateral';
  charms: PlacedCharm[];
  previewSvg?: string;
}

export interface CartItem {
  itemKey: string;
  productId: string;
  productName: string;
  colorName: string;
  colorHex: string;
  size: number;
  unitPrice: number;
  quantity: number;
  image: string;
  isCustom?: boolean;
  customDesign?: CustomDesign;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district: string;
  paymentMethod: 'cod' | 'vietqr' | 'momo';
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode?: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered';
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  summary: string;
  image: string;
  content: {
    heading: string;
    body: string[];
    callout?: string;
    subsections?: {
      title: string;
      body: string[];
    }[];
  }[];
}

export interface SitemapItem {
  id: string;
  title: string;
  file: string;
  category: 'Trang chính' | 'Sản phẩm' | 'Cá nhân hóa' | 'Thương mại' | 'Cẩm nang' | 'Thương hiệu & Hỗ trợ' | 'Chính sách';
  description: string;
  features: string[];
  status: 'Sẵn sàng' | 'Đã kiểm thử';
}
