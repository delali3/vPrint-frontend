// src/types/index.ts

// User and Authentication Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

// Order Types
export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  course: string;
  class: string;
}

export interface Payment {
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  method: string | null;
  date: string | null;
}

export interface Order {
  id: number;
  order_number: string;
  file_id: string;
  file_name: string;
  page_count: number;
  color_pages: number;
  monochrome_pages: number;
  print_color: 'monochrome' | 'colored';
  binding: 'none' | 'comb' | 'slide' | 'tape';
  campus_delivery: boolean;
  total_price: number;
  order_status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
  userInfo: UserInfo;
  payment: Payment;
}

// Stats Types
export interface StatusCount {
  order_status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  count: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface OrderStats {
  statusCounts: StatusCount[];
  dailyCounts: DailyCount[];
  totalRevenue: number;
  todayOrders: number;
}

// Filter and Sorting Types
export interface OrderFilters {
  status: string;
  dateRange: string;
  search: string;
}

export interface OrderSorting {
  field: string;
  direction: 'asc' | 'desc';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}

export interface StatsResponse {
  success: boolean;
  stats: OrderStats;
}

export interface OrderResponse {
  success: boolean;
  order: Order;
}

// Auth Context Type
export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setError: (error: string | null) => void;
}

// PrintOrder Types
export type PrintColorType = 'monochrome' | 'colored';
export type BindingType = 'none' | 'comb' | 'slide' | 'tape';

export interface BackendPrintOrder {
  fileId: string;
  fileName: string;
  pageCount: number;
  colorPages?: number;
  monochromePages?: number;
  printColor: PrintColorType;
  binding: BindingType;
  campusDelivery: boolean;
  totalPrice: number;
  userInfo?: UserInfo;
}

export interface PrintOrder extends BackendPrintOrder {
  userInfo?: UserInfo;
}

// Receipt Data Type
export interface ReceiptData {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  fileName: string;
  pageCount: number;
  colorPages: number;
  monochromePages: number;
  printColor: PrintColorType;
  binding: BindingType;
  campusDelivery: boolean;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
}

// Dashboard Stats Types
export interface DashboardStats {
  todayOrders: number;
  pendingPrints: number;
  completedOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  dailyOrderCounts: {
    date: string;
    count: number;
  }[];
}

// Form State Types
export interface PrintFormState {
  file: File | null;
  fileInfo: {
    fileId: string;
    originalName: string;
    pageCount: number;
    colorPages: number;
    monochromePages: number;
    size: number;
  } | null;
  printColor: PrintColorType;
  binding: BindingType;
  campusDelivery: boolean;
  previewUrl: string | null;
  currentPage: number;
  priceBreakdown: {
    baseCost: number;
    bindingCost: number;
    deliveryCost: number;
    totalCost: number;
    priceConfig: any;
  } | null;
  isUploading: boolean;
  uploadError: string | null;
}

export interface UserInfoFormState {
  name: string;
  email: string;
  phone: string;
  course: string;
  class: string;
}

// Props Types
export interface PrintingFormProps {
  onOrderSubmit: (order: PrintOrder) => void;
}

export interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  initialData?: UserInfo;
}

export interface OrderSummaryProps {
  order: PrintOrder;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export interface PaystackPaymentProps {
  paymentUrl: string;
  orderNumber: string;
  paymentReference: string;
  onPaymentStart: () => void;
  onPaymentCancel: () => void;
}

export interface ReceiptProps {
  data: ReceiptData;
  onClose: () => void;
  onPrint: () => void;
}

// Protected Route Props
export interface ProtectedRouteProps {
  children: React.ReactNode;
}