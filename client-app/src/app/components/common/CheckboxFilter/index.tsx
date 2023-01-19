
import { Options } from "../../../models/options";
import { Checkbox, Col, Row } from "antd";
import { Fragment } from "react";

interface Props {
  changeChecked: any;
  category: Options[];
}

const CheckboxFilter = ({ changeChecked, category }: Props) => {
  return (
    <div>
      <Checkbox.Group

        style={{ width: "100%", display: "block" }}
      >
        {category.map(({ checked, label, id }) => {
          return (
           <Fragment key={id}>
            <Row >
              <Col span={24}>
                <Checkbox 
                  checked={checked}
                  value={id}
                  onChange={() => changeChecked(id)}
                >
                  {label}
                </Checkbox>
              </Col>
            </Row><br/>
            </Fragment>
          );
        })}
      </Checkbox.Group>
    </div>
  );
};

export default CheckboxFilter;
