import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    stock: bigint;
    category: string;
    price: number;
}
export interface CartDetails {
    quantity: bigint;
    product: Product;
}
export interface backendInterface {
    addToCart(sessionId: string, productId: bigint, quantity: bigint): Promise<void>;
    clearCart(sessionId: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCartItems(sessionId: string): Promise<Array<CartDetails>>;
    getProduct(id: bigint): Promise<Product>;
    init(): Promise<void>;
    removeFromCart(sessionId: string, productId: bigint): Promise<void>;
    updateCartItemQuantity(sessionId: string, productId: bigint, quantity: bigint): Promise<void>;
}
