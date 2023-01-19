import { HomeFilled } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import AppCart from "../../components/AppCart";
import {observer} from 'mobx-react-lite';

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item: any) => {
    navigate(`/${item.key}`);
  };
  const items: MenuProps['items'] = [{
    label: <HomeFilled/>,
    key: "",
  },
  // {
  //   label: "Brasil",
  //   key: "brasil",
  // },
  // {
  //   label: "Europeus",
  //   key: "europa",
  // },
]

  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={items}
        className="appMenu"
      />
      <Typography.Title>Full Store</Typography.Title>
      <AppCart />
    </div>
  );
}

export default observer(AppHeader);
