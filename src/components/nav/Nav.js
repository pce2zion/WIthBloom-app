import classes from "./Nav.module.css"
import AnimationIcon from '@mui/icons-material/Animation';
import { useNavigate } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import WalletOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { signOut } from "firebase/auth";
import { auth } from "../../fireBaseConfig/firebase-config";


const Nav = () => {


    const navigate =useNavigate();
    const handleReturn = ()=>{
            navigate("/list")    
    }
    const handleReturn2 =()=>{
        
        navigate('/exchange')    
    }
    const handleLogOut= async ()=>{
        await signOut(auth);
        setTimeout(() => {
            navigate("/")  
        }, 1500);
         
    }
    return ( 
        <div className={classes.nav}>
            <AnimationIcon
             onClick={handleReturn}
             sx={{ fontSize:"50px", marginLeft:"25px", marginTop:"50px", color:"#133A39" }}/>
            <div className={classes.navul}>
            <ul>
                <li className={classes.navli} style={{ marginLeft: '30px'}}><HomeOutlinedIcon onClick={handleReturn} sx={{fontSize: '30px',  color:"#969191",  '&:hover': { fontSize: '38px',   marginRight: "10px", color:"#133A39" }}}/></li>
                <li className={classes.navli} style={{ marginLeft: '30px'}}><CreditScoreOutlinedIcon  onClick={handleReturn2} sx={{fontSize: '30px',  color:"#969191",  '&:hover': { fontSize: '38px',   marginRight: "10px", color:"#133A39" }}}/></li>
                <li className={classes.navli} style={{ marginLeft: '30px'}}><EqualizerOutlinedIcon sx={{fontSize: '30px',  color:"#969191",  '&:hover': { fontSize: '38px',   marginRight: "10px", color:"#133A39" }}}/></li>
                <li className={classes.navli} style={{ marginLeft: '30px'}}><PersonOutlinedIcon sx={{fontSize: '30px',  color:"#969191",  '&:hover': { fontSize: '38px',   marginRight: "10px", color:"#133A39" }}}/></li>
                <li className={classes.navli} style={{ marginLeft: '30px'}}><WalletOutlinedIcon sx={{fontSize: '30px',  color:"#969191",  '&:hover': { fontSize: '38px',   marginRight: "10px", color:"#133A39" }}}/></li>
            </ul>
                <div className={classes.logout}>
                    <LogoutIcon onClick={handleLogOut} sx={{ fontSize:"40px", marginLeft:"25px", color:"#133A39" }}/>
                </div>
            </div>
        </div>
     );
}
 
export default Nav;