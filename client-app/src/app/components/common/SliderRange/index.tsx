import { Slider } from 'antd';

interface Props{

  changePrice: any
}

const SliderRange = ({  changePrice }: Props) => {

  return (
    <div className="">
      <Slider 
        tooltip={{ open: true }} 
        range={{ draggableTrack: true }}
        defaultValue={[10, 5000]}
        onChange={changePrice}
        step={10}
        max={5000}
      />
    </div>
  );
};

export default SliderRange;