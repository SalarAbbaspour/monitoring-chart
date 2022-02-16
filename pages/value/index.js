import { useState } from 'react';

import Slider,{SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
const {Handle} =Slider;
const handle = props => {
	const { value, dragging, index, ...restProps } = props;
	return (
  
		<SliderTooltip
			prefixCls="rc-slider-tooltip"
			overlay={value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</SliderTooltip>
    
	);
};
const Value =()=>{
    const [num, setNum] = useState(1)
    const submit=(value)=>{
        fetch("https://monitoring-server.vercel.app/api/value",{method:'POST',headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({value})})
    }
    return <div style={{display: 'flex',justifyContent:'center'}}>
				<div style={{width: '300px',padding: 50}}>
					<span style={{marginBottom:20,display: 'inline-block'}}>Value: {num}</span>
					<Slider handle={handle}  min={0.1} max={8} step={0.03} onChange={(e)=>{
						setNum(e);
					}}
                    onAfterChange={(e)=>submit(e)}
					dots={true} value={num} defaultValue={1} startPoint={1} />
				</div>  
			</div>
}
export default Value