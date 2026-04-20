import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type ShopId = bigint;
export interface ProductInput {
    shopId: bigint;
    name: string;
    description: string;
    stock: bigint;
    imageKey: ExternalBlob;
    category: Category;
    price: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderInput {
    shopId: bigint;
    productId: bigint;
    quantity: bigint;
    buyerName: string;
}
export interface ShopInput {
    name: string;
    description: string;
    whatsappNumber: string;
    phone: string;
    location: string;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    shopId: bigint;
    createdAt: bigint;
    productId: bigint;
    totalAmount: bigint;
    buyerPrincipal?: Principal;
    quantity: bigint;
    buyerName: string;
    stripeSessionId: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    createdAt: Timestamp;
    email: string;
    message: string;
    phone: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Shop {
    id: ShopId;
    ownerId: Principal;
    name: string;
    createdAt: bigint;
    description: string;
    whatsappNumber: string;
    phone: string;
    location: string;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    shopId: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    stock: bigint;
    imageKey: ExternalBlob;
    category: Category;
    price: bigint;
}
export type OrderId = bigint;
export enum Category {
    Saree = "Saree",
    Kameez = "Kameez",
    Salwar = "Salwar",
    Kurti = "Kurti",
    Dupatta = "Dupatta",
    Other = "Other",
    Lehenga = "Lehenga"
}
export enum OrderStatus {
    Paid = "Paid",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: OrderInput, successUrl: string, cancelUrl: string): Promise<string>;
    createShop(input: ShopInput): Promise<Shop>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllShops(): Promise<Array<Shop>>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getMyShop(): Promise<Shop | null>;
    getProductById(productId: bigint): Promise<Product | null>;
    getShopById(shopId: bigint): Promise<Shop | null>;
    getShopProducts(shopId: bigint): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    searchProducts(keyword: string, category: Category | null, minPrice: bigint | null, maxPrice: bigint | null): Promise<Array<Product>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<{
        __kind__: "ok";
        ok: ContactMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<Order>;
    updateProduct(productId: bigint, input: ProductInput): Promise<Product>;
    updateShop(shopId: bigint, input: ShopInput): Promise<Shop>;
}
