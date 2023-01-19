import { useEffect } from "react";
import FilterPanel from "../../components/FilterPanel";
import ListProducts from "../../components/ListProducts";
import SearchBar from "../../components/SearchBar";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import "./styles.css";

function Home() {
  const { productStore } = useStore();
  useEffect(() => {
    productStore.setloadProducts();
  }, [productStore]);

  return (
    <div className="home">
      <SearchBar
        value={productStore.searchInput}
        changeInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          productStore.setSearchInput(e.target.value)
        }
      />
      <div className="home-panelList-wrap">
        <div className="home-panel-wrap">
          <FilterPanel />
        </div>
        <div className="home-list-wrap">
          {productStore.applyFilters && (
            <div>
              <ListProducts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(Home);
