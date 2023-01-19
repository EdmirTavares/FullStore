import { Button, Card, Image,  Rate, Typography } from "antd";
import { Product } from "../../models/products";
import { useStore } from "../../stores/store";
import {observer} from 'mobx-react-lite';
import { ShoppingCartOutlined } from "@ant-design/icons";

interface Props {
  product: Product |null|undefined;
  index: number;
}

 function ProductCard({ product, index }: Props) {
  const  {cartStore} = useStore();

  function calculatePriceWithoutDiscount(price: number, discount: number) {
    let discountVal = price * discount;
    let totalPrice = Number(price) + Number(discountVal);
    return totalPrice;
  }

  return (
    <Card
      className="productCard"
      title={product?.name}
      key={index}
      cover={<Image className="productCardImage" src={product?.imageSrc} />}
      actions={[
        <Typography.Text>Categoria: {product?.category}</Typography.Text>,
        <Rate value={3} disabled></Rate>,
        <Button type="link" onClick={() =>cartStore.addProductToCart(product!)} loading={cartStore.loading}>
          <ShoppingCartOutlined style={{fontSize:'30px', color:"orange"}} />
        </Button>,
      ]}
    >
      <Card.Meta
        title={
          <Typography.Paragraph>
            Preço: R$ {product?.price}{" "}
            {product?.hasDiscount && (
              <Typography.Text delete type="danger">
                R${" "}
                {calculatePriceWithoutDiscount(
                  product.price,
                  product.discountValue
                )}
              </Typography.Text>
            )}
          </Typography.Paragraph>
        }
        description={
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: "ver mais",
            }}
          >
            {product?.description}
          </Typography.Paragraph>
        }
      ></Card.Meta>
    </Card>
  );
}

export default observer(ProductCard);
