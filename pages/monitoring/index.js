
import { useEffect, useState } from 'react';
import { AreaChart, CartesianGrid ,XAxis,Tooltip,Area,YAxis,ResponsiveContainer,ReferenceLine,Brush} from 'recharts';
import Parse from 'parse/dist/parse.min.js';  
import Router from 'next/router'

export default function Monitoring({t}) {
  const [data,setData]=useState([]);
	const [num,setNum]=useState(1);
	const[ref,setRef]=useState(false);
	const [max,setMax] =useState(4);
	const [x,setX]=useState(false);
	const [loading,setLoading]=useState(true)

async function fetchValue() {
    const query = new Parse.Query('value');
	query.equalTo('objectId', 'ypTk3FAgI1');
    const Value = await query.first();
     setNum(Value.get("num"))
  }
  useEffect(()=>{
	const auth = localStorage.getItem("Role")
	if (!auth){
		Router.push("/login")
	}
	setLoading(false)
},[])
useEffect(()=>{
  if(t!=undefined) setData(t);
},[])
useEffect(()=>{
setTimeout(()=>{
	fetchValue()
	if(data.length)	setDate()
	setX(!x)}
,10000)
},[x])
const setDate=()=>{
	let temp = data;
    temp.shift();
    temp.push({Bitrate:4*num,time:new Date().toUTCString()});
    if(4*num>max){
        setMax(4*num);
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
					<Tooltip labelStyle={{fontSize:12}} itemStyle={{fontSize:12,color:"blue"}} formatter={(value, name, props) => [`${value.toFixed(2)} Mbit/s`]} labelFormatter={(value) =>new Date(value)} />
          <ReferenceLine y={max} label={`Max ${max.toFixed(2)} Mb/s`} stroke="red" strokeDasharray="3 3" />
					<Area type="monotone" dataKey="Bitrate" stroke={"rgb(176, 222, 9)"} fill="rgb(176, 222, 9)" />
					<Brush />

				</AreaChart>
       
        </ResponsiveContainer>

			</div>
			
		</div>
  )
}

export async function getServerSideProps({params,req,res,query,preview,previewData,resolvedUrl,locale,locales,defaultLocale}) {
  const data = await fetch('https://monitoring-server.vercel.app/api/getlist');
  const list = await data.json();
  return { props: { t:list.data } }
}
