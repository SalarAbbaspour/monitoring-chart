import { useEffect, useState } from 'react';
import { AreaChart, CartesianGrid ,XAxis,Tooltip,Area,YAxis,ResponsiveContainer,ReferenceLine} from 'recharts';
import Slider,{SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import Parse from 'parse/dist/parse.min.js';
import ReactiveButton from 'reactive-button';
 
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


export default function Value({t}) {
	 async function addValue(value) {
		 const query = new Parse.Query('value');
  try {
    // here you put the objectId that you want to update
    const object = await query.get('ypTk3FAgI1');
      object.set('num', value);
    try {
      const response = await object.save();
      
    } catch (error) {
      console.error('Error while updating ', error);
    }
  } catch (error) {
    console.error('Error while retrieving object ', error);
  }
  }
    const submit=(value)=>{
       addValue(value)
    }
        const [state, setState] = useState('idle');

  const [data,setData]=useState([]);
	const [num,setNum]=useState(1);
		const [x,setX]=useState(false);

		const [numX,setNumX]=useState(1);

	const[ref,setRef]=useState(false);
	const [max,setMax] =useState(6);
	const [loading,setLoading]=useState(true)
   async function fetchValue() {
    const query = new Parse.Query('value');
	query.equalTo('objectId', 'ypTk3FAgI1');
    const Value = await query.first();
     setNumX(Value.get("num"))
	 return Value.get("num")
  }
useEffect(()=>{
  if(t!=undefined) setData(t);
},[])
useEffect(()=>{
setTimeout(()=>{
	fetchValue().then((res)=>{
		if(data.length) setDate(res).then((rs)=>{
			if(num==rs){setState("idle")}
		})
		})
	setX(!x)}
,10000)
},[x])
async function setDate(res){
	let temp = data;
    temp.shift();
    await temp.push({Bitrate:6*numX,time:new Date().toUTCString()});
    if(6*numX>max){
        setMax(6*numX);
    }
    setData(temp);
	return res
}
	
	return(
		<div>
			<div style={{
				display:'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop:30
			}}>
        <ResponsiveContainer width={1200} height={600}>
				<AreaChart
					width={1200}
					height={600}
					data={data}
					baseValue={'auto'}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis tick={{fontSize:11}} dataKey={"time"} tickFormatter={(e)=> `${new Date(e).getHours()}:${new Date(e).getMinutes()}`}/>
					<YAxis  width={80} tick={{fontSize:11}} tickFormatter={(e)=> e+' Mbit/s'}/>
					<Tooltip labelStyle={{fontSize:12}} itemStyle={{fontSize:12,color:"blue"}} formatter={(value, name, props) => [`${value.toFixed(2)} Mbit/s`]} labelFormatter={(value) =>new Date(value)} />
          <ReferenceLine y={max} label={`Max ${max.toFixed(2)} Mb/s`} stroke="red" strokeDasharray="3 3" />
					<Area type="monotone" dataKey="Bitrate" stroke={"rgb(176, 222, 9)"} fill="rgb(176, 222, 9)" />
				</AreaChart>
       
        </ResponsiveContainer>

			</div>
			<div> 
    <div style={{display: 'flex',justifyContent:'center'}}>
				<div style={{width: '300px',padding: 50}}>
					<span style={{marginBottom:20,display: 'inline-block'}}>Value: {num}</span>
					<Slider handle={handle}  min={0.1} max={2} step={0.03} onChange={(e)=>{
						setNum(e);
					}}
                    
					dots={true} value={num} defaultValue={1} startPoint={1} />
					 <ReactiveButton
					             idleText={'Submit'}
								             loadingText={'Loading'}
            successText={'Success'}
				block={true}
style={{marginTop:10}}
            buttonState={state}
            onClick={()=>{
				setState("loading")
				submit(num)
			}}
        />
				</div>  
			</div>
            </div>
		</div>
  )
}

export async function getServerSideProps({params,req,res,query,preview,previewData,resolvedUrl,locale,locales,defaultLocale}) {
  console.log('Logging : '+res);
  const data = await fetch('https://monitoring-server.vercel.app/api/getlist');
  const list = await data.json();
  return { props: { t:list.data } }
}
