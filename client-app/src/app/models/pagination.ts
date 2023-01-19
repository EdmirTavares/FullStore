import { Product } from "./products";

export interface Pagination {
  current_page: number;
  data: Data[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PageButton[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}
export interface Data{
  // product_id: Product
  product_id:Map<string, Product>
}

export interface PageButton {
  url: string;
  label: string;
  active: boolean;
}
