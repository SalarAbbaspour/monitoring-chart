import React,{useState,useEffect} from 'react';
import ReactiveButton from 'reactive-button';
import Router from 'next/router'
const Login = () => {
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const auth = localStorage.getItem("Role")
        if (auth){
            Router.push("/")
        }
        setLoading(false)
    },[])
    const login = ()=>{
        if(user==="admin"){
            if(pass==="Zr*@5+&W.M&+"){
                localStorage.setItem("Role","admin")
                Router.push("/")
            }
        }
        if(user==="user"){
            if(pass==="hdub#8W9;GE("){
                localStorage.setItem("Role","user")
                Router.push("/")
            }  
        }
        if(user!=="admin"&&user!=="user"&&pass!=="hdub#8W9;GE("&&pass!=="Zr*@5+&W.M&+"){
            setError("User Name Or Password Invalid")
        }
        
    }
   if(!loading) return (
        <div>
            <div className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input aut type="text" value={user} onChange={(e)=>setUser(e.target.value)} required={true}/>
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}  required={true}/>
      <label>Password</label>
    </div>
    <p style={{color:"#ff7b7b"}}>{error}</p>
    <ReactiveButton idleText={'Login'}  onClick={()=>{login()}}/>
  </form>
</div>
        </div>
    );
    return <div/>
};

export default Login;