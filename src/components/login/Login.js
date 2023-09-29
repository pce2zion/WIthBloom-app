import classes from "./Login.module.css"
import AnimationIcon from '@mui/icons-material/Animation';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { auth } from "../../fireBaseConfig/firebase-config";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const [formData3, setFormData3]= useState({
            email:"",
            password:"",
            isRemembered: false
    })
    const[show, setShow]= useState(false);
    const[message, setMessage]= useState("")
    const[user, setUser]=useState({});
    const[error, setError]=useState(false)
    const navigate =useNavigate();
   
const handleSee=()=>{
setShow(prevShow=>!prevShow)
}
    const handleChange= (event)=>{
      const {name,type, value, checked} = event.target
        setFormData3(prevFormData3=>({
            ...prevFormData3,
            [name]: type === "checkbox"? checked : value
        }))
    }
    
         useEffect(()=>{
            AOS.init({duration:2000});
         },[])
    
        useEffect(()=>{
            onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser)
             },[user])
        })
         
          const login = async ()=>{
                try{
                     await signInWithEmailAndPassword(auth, formData3.email, formData3.password);
                    }catch(error){
                        console.log(error.message);
                    }       
             }
       
         
         const handleSubmit =(event)=>{
            event.preventDefault()
            if(user && user.email !== formData3.email){
                setError(true)
                setMessage("Invalid email")
                return;
            }
            if(!formData3.password){
                setError(true)
                setMessage("Please enter your credentials")
                return
            }
            if(!formData3.email){
                setError(true)
                setMessage("Please enter your credentials")
                return
            }
            else {
                setError(false)
                setMessage("Login success!")
                login()             
             setTimeout(() => {
                navigate("/list" ,  { state: { formData3} })
            }, 1000);
            }
            
    }
         
    return ( 
        <div className={classes.login}>
            
            <div className={classes.logindeets}>
                <h1>Login</h1>
                <p>Welcome back! Please login to your account</p>
                <form onSubmit={handleSubmit} className={classes.loginform}>
                        <p className={classes.labelemail} >Email</p> <br />
                        <input
                        id="email"
                        className={classes.nameform}
                        type="text"
                        name='email'
                        onChange={handleChange}
                        value={formData3.email}
                        placeholder= "email"
                        /> <br />
                        <p className={classes.labelpass} >Password</p> <br />
                        <input
                        id="password"
                        className={classes.passform}
                        type={`${!show ? "password" : "text"}`}
                        name='password'
                        onChange={handleChange}
                        value={formData3.password}
                        placeholder= "password"
                        />
                            <span className={classes.show} onClick={handleSee}> {!show? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>} </span>
                         <p className={classes.messagy} style={{fontSize:"12px", color: `${error ? "red" : "green"}`}}>{message}</p>
                        
                        <div className={classes.flexforgot}>
                            <input
                            className={classes.checkform} 
                            type="checkbox" 
                            id="isRemembered"
                            onChange={handleChange}
                            checked={formData3.isRemembered}
                            name="isRemembered"
                            />
                             <p className={classes.remember}>Remember Password</p> <br />
                             <p className={classes.forgot}> Forgot password?</p>
                        </div>
                        <button className={classes.loginbtn}>Login</button>
                        
                    </form> 
                <div className={classes.newuser}>
                    <p className={classes.newuserp}>New User?</p>
                    <Link className={classes.newusera} to="/signup">Signup</Link>
                </div>
            </div>
            <div className={classes.welback}>
            <AnimationIcon
            data-aos="flip-right"
             sx={{ fontSize:"50px", position: "relative", top: "-45px",right: "50px",color:"white" }}/>
            <h1 data-aos="zoom-in">Welcome back!</h1>
            </div>
        </div>
     );
}
 
export default Login;