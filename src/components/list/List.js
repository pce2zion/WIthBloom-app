import classes from "./List.module.css"
import TollIcon from '@mui/icons-material/Toll';
import Coin  from "../../helpers/images/coin.png"
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useEffect} from "react";
import MainList from "../mainList/MainList";
import { useLocation } from "react-router-dom";
import { auth } from "../../fireBaseConfig/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from "../../helpers/ui/Vertical";
import Vertical from "../../helpers/ui/Vertical";


const List = () => {
    const location = useLocation();
    const [formData2, setFormData2 ]= useState(""); 
  const [data, setData]  = useState([]); 
  const { formData } = location.state || {};
  const [name, setName]= useState("");
  const[user, setUser]=useState({})
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showIcon, setShowIcon] = useState(true);
  const { formData3 } = location.state || {};

   async function getList (){
    try{
    const res = await fetch("https://staging-biz.coinprofile.co/v3/currency/rate");
     const data = await res.json();
     setData(data.data.rates);
    
    }catch(err){
        console.log(err);
    }    
 }
 useEffect(() => {
   formData? setName(formData.firstName): setName('')||
    formData3 ? setName(formData3.firstName): setName('');

  }, [data, formData]);
 useEffect(()=>{
    getList();
    },[])

    let newList = Object.entries(data);

    const handleChange =(event)=>{ 
        setFormData2(event.target.value);
    }
    let filteredData = newList.filter((datum)=>{
        
        return  formData2.toLowerCase() === "" ? datum : datum[0].toLowerCase().includes(formData2)
      })
     
      const exchangeList= filteredData.map(list=>{
        return <MainList 
         key={list[1].key}
         rate={list[1].rate}
         name={list[0]}
         />
        })    
        useEffect(()=>{
            onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser)
             })
        },[user])
        
        useEffect(() => {
            const handleResize = () => {
              const newWidth = window.innerWidth;
              setWindowWidth(newWidth);
        
        
              if (newWidth <= 389) {
                setShowIcon(false);
              } else {
                setShowIcon(true);
              }
            };
        
            window.addEventListener('resize', handleResize);
        
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }, []);
        
    return ( 
        <div className={classes.list}>
        {showIcon &&( <div className={classes.morevet}><Vertical /></div> )}
           <div className={classes.welcome}>
                <h1 className={classes.wee}>Welcome back {name ? name : ""}</h1> 
                <p className={classes.wep}>Check the latest updates on your bloom account</p>
           </div>
            <div className={classes.wallflex}>
            <div className={classes.wallet}>
                    <div className={classes.eth}>
                            <TollIcon sx={{color:"white", fontSize: "30px", fontWeight:"500"}}/> <span>1.05 ETH ~</span>
                            <img className={classes.ethimg} src={Coin} alt="a coin" />
                    </div>
                    <div className={classes.tollflex}>
                        <div className={classes.tollcur}>
                            <h3>USD</h3> <br />
                            <h2>$9,687</h2>
                        </div>
                        <p className={classes.tollcurh3}>+16.335</p>
                    </div>

                 </div>
                <div className={classes.balance}>
                        <p>Total balance</p>
                        <h1>$9,687</h1>
                        <div className={classes.balanceup}>
                            <h3>+18.21$</h3> <span>4.28% </span> 
                            <ArrowUpwardOutlinedIcon className={classes.balanceic} sx={{color:"yellow", 
                            fontWeight:"300"}}/>
                        </div>
                </div>
            </div>
                
           <div className={classes.listex}>
                <div className={classes.ratesent}>
                    <h1 className={classes.listexh1}>Exchange rates</h1>
                    
                    <form >
                        <input
                        className={classes.form}
                        type="text"
                        name='username'
                        onChange={handleChange}
                        value={formData2}
                        placeholder= "Search"
                        />
                        <button className={classes.btn}><SearchOutlinedIcon className={classes.searchicon} sx={{color:"#c4c4c4"}}/></button>
                    </form> 
                </div>
                <div className={classes.table}>
                        <p className={classes.tablep1}>Currency</p>
                        <p className={classes.tablep2} >Rate</p>
                 </div>
                 <div className={classes.currates}>
                       {exchangeList}
                 </div>
           </div>
        </div>
     );
}
 
export default List;