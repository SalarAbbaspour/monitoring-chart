
import Link from 'next/link';

export default function Home() {
  

	return(
		<div>
			<div style={{
				display:'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop:30
			}}>
        <div style={{marginRight:30,color:"red",border:"1px solid red",padding:10}}><Link href={'/monitoring'} target="_blank">Monitoring</Link></div>
        <div style={{marginRight:30,color:"blue",border:"1px solid blue",padding:10}}><Link href={'/value'} target="_blank">Change Value</Link></div>

     

			</div>
			
		</div>
  )
}

