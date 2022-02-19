
import Link from 'next/link';
import {useEffect,useState} from 'react'
import Router from 'next/router'
export default function Home() {
	const [loading,setLoading] = useState(true)
	let auth
	const a =async()=>{
		auth = localStorage.getItem("Role")
		if (!auth){
		   Router.push("/login")
	   }
	}
	useEffect(()=>{
		a().then(()=>setLoading(false))	 
	},[a()])
	if(!loading)return(
		<div>
			<div style={{
				display:'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop:30
			}}>
        <div style={{marginRight:30,color:"red",border:"1px solid red",padding:10}}><Link href={'/monitoring'} target="_blank"><a target="_blank" rel="noreferrer">Monitoring</a></Link></div>
		{auth==="admin"? <div style={{marginRight:30,color:"blue",border:"1px solid blue",padding:10}}><Link href={'/value'} target="_blank"><a target="_blank" rel="noreferrer">Change Value</a></Link></div>:null}

     
     
			</div>
			<div onClick={()=>{
			localStorage.removeItem("Role")
			Router.push("/login")
	}} style={{marginRight:30,color:"#b22929",border:"1px solid #b22929",padding:10, position:"absolute",bottom:"10px",left:"10px",cursor:"pointer"}}>LogOut</div>

			
		</div>
  )
  return <div/>
}

