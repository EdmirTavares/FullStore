import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { Cart } from '../models/cart';
import { Product } from '../models/products';

export default class CartStore {
  cartProductsRegistry = new Map<string, Product>();
  loading = false;
  cart: Cart | null = null;
  cartDrawerOpen =false;
  setCartDrawerOpen = (state: boolean) =>{
    this.cartDrawerOpen = state
  }
  checkoutDrawerOpen = false;
  setCheckoutDrawerOpen = (state: boolean) =>{
    this.checkoutDrawerOpen = state
  }

  constructor() {
    makeAutoObservable(this)
  }

  get totalProductsOnCart(){
    return Array.from(this.cartProductsRegistry.values()).reduce((pre, current) => {
      return Number(pre) + Number(current.quantity);
    }, 0)
  }

  addProductToCart = (product: Product) => {
    this.setLoading(true)
    const existingProduct = this.cartProductsRegistry.get(product.uniqueId)
    if (existingProduct) {
      existingProduct.quantity = 1+Number(existingProduct.quantity);
      existingProduct.total += Number(existingProduct.price);
      this.cartProductsRegistry.set(product.uniqueId, existingProduct)

    } else {
      product.quantity = 1;
      product.total = Number(product.price);
      this.cartProductsRegistry.set(product.uniqueId, product)
    }
    
    this.setLoading(false)
    message.success(`${product.name} foi adicionado ao carinho`);
  }

  get cartProducts() {
    return Array.from(this.cartProductsRegistry.values())
  }

  reCalculateCartTotal = (id:string, quantity:number)=>{
    const product = this.cartProductsRegistry.get(id)
    if(product){
      product.quantity =quantity;
      product.total = Number(product.price)*quantity;
      this.cartProductsRegistry.set(product.uniqueId, product)
    }
  }

  removeProductFromCart = (id: string) => {
    const product = this.cartProductsRegistry.get(id)
    if(product){
      this.cartProductsRegistry.delete(id)
    }
  }

  setLoading = (state: boolean) => {
    this.loading = state
  }

} 