
import { useEffect, useState } from 'react';
import { AreaChart, CartesianGrid ,XAxis,Tooltip,Area,YAxis,ResponsiveContainer,ReferenceLine} from 'recharts';
import Ably from "ably/promises";

export default function Monitoring({t}) {

  const [data,setData]=useState([]);
	const [num,setNum]=useState(1);
	const[ref,setRef]=useState(false);
	const [max,setMax] =useState(6);
			const [x,setX]=useState(false);
	const [loading,setLoading]=useState(true)

useEffect(()=>{
	var ably = new Ably.Realtime('CltMUg.CCbWVw:kpFlHbCfE3EdZUKGrqsBxPqxfgXV8quTx7yhzpkis0s');
var channel = ably.channels.get('test');
channel.subscribe('greeting', function(message) {
  setNum(message.data)
  });

  if(t!=undefined) setData(t);


},[])
useEffect(()=>{
setTimeout(()=>{
	if(data.length)	setDate()
	setX(!x)}
,10000)
},[x])
const setDate=()=>{
	let temp = data;
    temp.shift();
    temp.push({Bitrate:6*num,time:new Date().toUTCString()});
    if(6*num>max){
        setMax(6*num);
    }
    setData(temp);
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
					<Tooltip labelStyle={{fontSize:12}} itemStyle={{fontSize:12,color:"blue"}} formatter={(value, name, props) => [`${value} Mbit/s`]} labelFormatter={(value) =>new Date(value)} />
          <ReferenceLine y={max} label={`Max ${max} Mb/s`} stroke="red" strokeDasharray="3 3" />
					<Area type="monotone" dataKey="Bitrate" stroke={"rgb(176, 222, 9)"} fill="rgb(176, 222, 9)" />
				</AreaChart>
       
        </ResponsiveContainer>

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
