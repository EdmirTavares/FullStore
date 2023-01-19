import axios from "axios";
import { Cart } from "../../app/models/cart";
import { Product } from "../../app/models/products";

export const addToCart = async (product:Product) => {
 return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: product.id,
          quantity: 1,
        },
      ],
    }),
  }).then((res) => res.json());
};

export const getCart = async () => {
  return axios.get<Cart>('http://api.test/api/v1/cart/1');
}
