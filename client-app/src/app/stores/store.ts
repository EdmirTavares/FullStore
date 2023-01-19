import { createContext, useContext } from "react";
import CartStore from "./cartStore";
import ProductStore from "./productStore";

interface Store{
  productStore: ProductStore
  cartStore: CartStore
}

export const store: Store ={
  productStore: new ProductStore(),
  cartStore: new CartStore()
}

export const StoreContext = createContext(store);

//create a hook 
export function useStore(){
  return useContext(StoreContext);
}