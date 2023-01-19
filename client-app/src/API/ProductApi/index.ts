
// import { Pagination } from "../../app/models/pagination";
import { Product } from "../../app/models/products";
import requestsAgent from "../requestsAgent";

const Products = {
   // getAllProducts: (page:number) => requestsAgent.get<Pagination>('/products?page='+page),
   getAllProducts: (page:number) => requestsAgent.get<Product[]>('/products'),
   
 }

const ProductsApi = {
   Products
}

export default ProductsApi;