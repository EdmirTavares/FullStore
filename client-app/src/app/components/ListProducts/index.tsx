import { List, Badge } from "antd";

import { Product } from "../../models/products";
import ProductCard from "../ProductCard";
import { useStore } from "../../stores/store";
import {observer} from 'mobx-react-lite';

function ListProducts() {
  const  {productStore} = useStore();
 
  return (
    <>
          
          <List
            loading={productStore.loadingInitial}
            pagination={{
              onChange: (page) => {
                productStore.setPage(page)
              },
              pageSize: 6,
              current:productStore.page
            }}
            grid={{ column: 3 }}
            renderItem={(product: Product, index) => {
              if (product.hasDiscount)
                return (
                  <Badge.Ribbon
                    className="producCardBadge"
                    text={`Desconto -${product?.discountValue*100}%`}
                    color="pink"
                  >
                    <ProductCard product={product} index={index} />
                  </Badge.Ribbon>
                );
              else return <ProductCard product={product} index={index} />;
            }}
            dataSource={productStore.applyFilters}
          ></List>
     </>
  );
}

export default observer(ListProducts);
