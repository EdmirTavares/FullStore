import ListProducts from "../../components/ListProducts";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function Supplier() {
  const { productStore } = useStore();

  const parms = useParams();

  productStore.setSupplier(parms.supplier + "");

  useEffect(() => {
    productStore.setloadProducts();
  }, [productStore, parms.supplier]);

  
  return (
    <div className="productsContainer">
      {/* {productStore.sortedItems && (
        <div>
          <ListProducts></ListProducts>
        </div>
      )} */}
    </div>
  );
}

export default observer(Supplier);
