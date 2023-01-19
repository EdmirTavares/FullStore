import { Badge, Drawer, Table, InputNumber, Button, Form, Input, Checkbox, Typography, message, Image } from "antd";
import { ShoppingCartOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useStore } from "../../stores/store";
import {observer} from 'mobx-react-lite';

function AppCart() {
  
  const  {cartStore} = useStore();

  const confirmOrder = (values: any) => {
    cartStore.setCartDrawerOpen(false)
    cartStore.setCheckoutDrawerOpen(false)
    message.success("A sua compra foi efetuada com sucesso!")
  };

  return (
    <div>
      <Badge count={cartStore.totalProductsOnCart} className="shoppingCartIcon">
        <ShoppingCartOutlined
          onClick={() => {
            cartStore.setCartDrawerOpen(true);
          }}
        />
      </Badge>
      <Drawer
        size="large"
        title="Carinho de Compras"
        open={cartStore.cartDrawerOpen}
        onClose={() => {
          cartStore.setCartDrawerOpen(false);
        }}
      >
        <Table
          pagination={false}
          rowKey="uniqueId"
          columns={[
            {
              title: "",
              dataIndex: "imageSrc",
              render:(value) =>{
                return <Image src={value} className="productCartImage"></Image>
              }
            },
            {
              title: "Nome",
              dataIndex: "name",
            },
            {
              title: "Preço",
              dataIndex: "price",
              render: (value) => {
                return <span>R${value}</span>;
              },
            },
            {
              title: "Quantidade",
              dataIndex: "quantity",
              render: (value, record) => {
                return <InputNumber min={1}  value={value.toString()} onChange={(value)=>{
                  cartStore.reCalculateCartTotal(record.uniqueId, Number(value));
                }}></InputNumber>;
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>R$ {value}</span>;
              },
            },
            {
              title: "",
              render: (value,record) => {
                return <CloseCircleOutlined style={{ color: 'red',fontSize:'20px', cursor: "pointer" }} onClick={(e)=>{
                  cartStore.removeProductFromCart(record.uniqueId);
                }} />;
              },
            }
          ]}
          dataSource={cartStore.cartProducts}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return Number(pre) + Number(current.total);
            }, 0);
            return (
              <tr>
                <th scope="row">Totals</th>
                <td colSpan={2}>
                  <span>
                    Total:{" R$ "}
                    {total}
                  </span>
                </td>
              </tr>
            );
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            cartStore.setCheckoutDrawerOpen(true);
          }}
        >
          Concluir a compra
        </Button>
      </Drawer>
      <Drawer
        title="Confirmar a compra"
        open={cartStore.checkoutDrawerOpen}
        onClose={() => {
          cartStore.setCheckoutDrawerOpen(false);
        }}
      >
        <Form onFinish={confirmOrder}>
          <Form.Item
            rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
            label="nome"
            name="nome"
          >
            <Input placeholder="insira seu nome" type="text" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Por favor, insira seu Email!" },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="insira seu email" type="email" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Por favor, insira seu Endereço!" },
            ]}
            label="Endereço"
            name="address"
          >
            <Input placeholder="insira seu endereço" type="text" />
          </Form.Item>
          <Form.Item  >
            <Checkbox defaultChecked={true} disabled>Dinheiro na Entrega</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">Mais metodos de pagamento daqui a pouco!</Typography.Paragraph>
          <Button htmlType="submit" type="primary">
            Confirmar a compra
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
export default  observer(AppCart);