import { supplierList } from "../../../constants";
import { useStore } from "../../stores/store";
import CheckboxFilter from "../common/CheckboxFilter";
import FilterListToggle from "../common/FilterListToggle";
import SliderRange from "../common/SliderRange";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Select, Typography } from "antd";

function FilterPanel() {
  const { productStore } = useStore();

  return (
    <div>
      <div className="input-group" >
        <Typography.Text>Ordenar Por: </Typography.Text>
        <Select
          style={{ width: 210 }}
          onChange={(value) => {
            productStore.setSortOrder(value);
          }}
          defaultValue="az"
          options={[
            {
              label: "Nome de A-Z",
              value: "az",
            },
            {
              label: "Nome de Z-A",
              value: "za",
            },
            {
              label: "Preço de Alto para Baixo",
              value: "ab",
            },
            {
              label: "Preço de Baixo para Alto",
              value: "ba",
            },
          ]}
        ></Select>
      </div>
      <div className="input-group">
        <p className="label">Fornecedor:</p>
        <FilterListToggle
          options={supplierList}
          value={productStore.selectedSupplier}
          selectToggle={productStore.setSelectedSupplier}
        />
      </div>
      <div className="input-group">
        <p className="label">Categoria:</p>
        <CheckboxFilter
          category={productStore.selectedCategory}
          changeChecked={productStore.handleChangeChecked}
        />
      </div>
      <div className="input-group">
        <p className="label-range">Intervalo de preço:</p>
        <SliderRange changePrice={productStore.setSelectedPrice} />
      </div>
    </div>
  );
}
export default observer(FilterPanel);
