import classes from "./SignUp.module.css"
import AnimationIcon from '@mui/icons-material/Animation';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBaseConfig/firebase-config";
import List from "../list/List";
import { useNavigate } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const SignUp = () => {
    const [formData, setFormData]= useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""

})
const [loginSuccess, setLoginSuccess]= useState("");
const[alert, setAlert]= useState(false);
const[show, setShow]= useState(false);
const[show2, setShow2]= useState(true);
const[user, setUser]=useState({});



const navigate =useNavigate();

const handleChange= (event)=>{
  const {name, value} = event.target
    setFormData(prevFormData=>({
        ...prevFormData,
        [name]: value
    }))
}
const handleSee1=()=>{
    setShow(prevShow=>!prevShow)
}
const handleSee2=()=>{
    setShow2(prevShow2=>!prevShow2)
}

     useEffect(()=>{
        AOS.init({duration:2000});
     },[]);

     //firebase auth
     onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
     })
     const register =async ()=>{
        try{
         await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        }catch(error){
            console.log(error.message);
        }
       
     }
     const handleSubmit =(event)=>{
        event.preventDefault()

       if(formData.password !== formData.confirmPassword){
        setLoginSuccess("Passwords don't match");
        setAlert(false);
       }else if(formData.password <=6){
        setLoginSuccess("Your password should be greater than six characters ");
        setAlert(false);
       }else if(!formData.email || !formData.password ){
        setLoginSuccess("Please enter your email and password");
        setAlert(false);
       }else if(!formData){
        setLoginSuccess("Please fill in your details")
       }else{
        register();
        setLoginSuccess("User logged in successfully")
        setAlert(true)  
        setTimeout(() => {
            navigate("/list" ,  { state: { formData } })
        }, 2000);
       }


    }


    return ( 
        <div className={classes.signup}>
                <div className={classes.hello}>
                    <AnimationIcon
                    data-aos="flip-right"
                    sx={{ fontSize:"50px", position:"relative", bottom: "50px", right: "50px", color:"#white" }}/>
                    <h1  data-aos="zoom-in" className={classes.hello1}>Hello there!</h1>
                    <p data-aos="flip-right" className={classes.hello2}>Welcome to Withbloom, the most efficient currency exchanger..</p>
                </div>
                <div className={classes.fill}>
                    <h1 className={classes.signuph1}>Signup</h1>
                    <p className={classes.signupp}>Welcome to Withbloom. Please fill in your correct details, 
                    let us take you on an adventure</p>

                    <form onSubmit={handleSubmit} className={classes.signupform}>
                        <p className={classes.inputp1}>First name</p> 
                        <input
                        id="firstName"
                        className={classes.name2form}
                        type="text"
                        name='firstName'
                        onChange={handleChange}
                        value={formData.firstName}
                        placeholder= "First name"
                        /> <br />
                        <p className={classes.inputp2}>last Name</p> 
                        <input
                        id="lastName"
                        className={classes.lastname}
                        type="text"
                        name='lastName'
                        onChange={handleChange}
                        value={formData.lastName}
                        placeholder= "Last name"
                        />
                         <p className={classes.inputp3}>Email</p>
                        <input
                        id="email"
                        className={classes.email}
                        type="email"
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        placeholder= "email"
                        />
                        <p className={classes.inputp4}>Password</p> 
                        <input           
                        className={classes.password1}
                        type={`${!show ? "password" : "text"}`}
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder= "password"
                        />
                          <span className={classes.showz} onClick={handleSee1}> {!show? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>} </span>
                        <p className={classes.inputp5}>Confirm password</p> 
                        <input
                        className={classes.password2}
                        type={`${!show2 ? "password":"text" }`}
                        name='confirmPassword'
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        placeholder= "confirm your password"
                        />
                          <span className={classes.showz2} onClick={handleSee2}> {!show? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>} </span>
                        <button className={classes.signupbtn}>Sign up</button>
                        
                    </form> 
                    <div className={classes.olduser}>
                            <p className={classes.newuserp}>Already have an account?</p>
                            <Link className={classes.newusera} to= "/">Login</Link>
                        </div>
                       
                        <p style={{color: `${alert ? "green" : "red"}`, width:"500px", fontSize: "15px", position:"relative", top:"-125px", left:"3px"}}>{loginSuccess}</p>

                </div>
        </div>
     );
}
 
export default SignUp;