import { makeAutoObservable, runInAction } from 'mobx';
import ProductsApi from '../../API/ProductApi';
import { categoryList } from '../../constants';
import { Options } from '../models/options';
import { Pagination } from '../models/pagination';
import { Product } from '../models/products';

export default class ProductStore {
  productsRegistry = new Map<string, Product>();
  loading = false;
  loadingInitial = false;
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  supplier: string = 'all';
  setSupplier = (supplier: string) => {
    this.supplier = supplier
  }

  sortOrder = 'az';

  /**
   * Begin Filters 
   */
  selectedSupplier: number = 0
  setSelectedSupplier = (value: number) =>
    !value ? null : this.selectedSupplier = value;

  searchInput = "";
  setSearchInput = (value: string) => this.searchInput = value;

  resultsFound = true;
  setResultsFound = (value: boolean) => this.resultsFound = value;

  selectedPrice: [number, number] = [10, 5000];
  setSelectedPrice = (value: [number, number]) => this.selectedPrice = value;

  selectedCategory: Options[] = categoryList;
  setSelectedCategory = (value: Options[]) =>
    !value ? null : this.selectedCategory = value;

  handleChangeChecked = (id: number) => {
    const changeCheckedCategories = this.selectedCategory.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    this.setSelectedCategory(changeCheckedCategories);
  };

  get applyFilters() {
    let updatedList = Array.from(this.productsRegistry.values());

    // Supplier Filter
    if (Number(this.selectedSupplier) !== 0) {
      updatedList = updatedList.filter(item => Number(item.supplierProductId) === Number(this.selectedSupplier))
    }

    // Search Filter
    if (this.searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.name.toLowerCase().search(this.searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // category Filter
    const categoryChecked = this.selectedCategory
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (categoryChecked.length) {
      updatedList = updatedList.filter((item) =>
        categoryChecked.includes(item.category)
      );
    }

    // Price Filter
    const minPrice = this.selectedPrice[0];
    const maxPrice = this.selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    !updatedList.length ? this.setResultsFound(false) : this.setResultsFound(true);

    return updatedList.sort((a, b) => {
      if (this.sortOrder === 'az') {
        return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
      }
      if (this.sortOrder === 'za') {
        return a.name < b.name ? 1 : a.name === b.name ? 0 : -1;
      }
      if (this.sortOrder === 'ab') {
        return Number(a.price) < b.price ? 1 : Number(a.price) === Number(b.price) ? 0 : -1;
      }
      if (this.sortOrder === 'ba') {
        return Number(a.price) > Number(b.price) ? 1 : Number(a.price) === Number(b.price) ? 0 : -1;
      } else return 1;
    });
  }

  /**
   * End Filters 
   */

  /**
   * Pagination attributes
   * and 
   * Methods
   */
  page = 1;
  setPage = (page: number) => { this.page = page }
  totalPages = 0;
  setTotalPages = (totalPages: number) => { this.totalPages = totalPages }
  pagination: Pagination | null = null;
  setPagination = (pagination: Pagination) => { this.pagination = pagination }

  /**
   * End Pagination attributes
   */

  constructor() {
    makeAutoObservable(this)
  }

  setSortOrder = (orderType: string) => {
    this.sortOrder = orderType;
  }

  setloadProducts = async () => {
    this.setLoadingInitial(true);
    try {
      const products = await ProductsApi.Products.getAllProducts(this.page);
     
      runInAction(() => {
       
        products.forEach(product => {
           this.productsRegistry.set(product.uniqueId,product)
          })
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }



}