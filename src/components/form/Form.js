import classes from "./Form.module.css"

import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Coin  from "../../helpers/images/coin.png"
import Bitcoin  from "../../helpers/images/btcimg.jpg"
import { useState, useEffect } from "react";
import {Bar} from "react-chartjs-2";
import{Chart as ChartJS} from "chart.js/auto"
import Marquee from "react-fast-marquee";
import { onAuthStateChanged } from "firebase/auth";


const Form = (props) => {
   

    const [data, setData]  = useState([]); 
    const [alert, setAlert] = useState("");
    const [items, setItems]= useState("");
    const[user, setUser]= useState({});

   // onAuthStateChanged(props.auth, props.auth.currentUser.email)
    

    async function getList (){
     try{
     const res = await fetch("https://staging-biz.coinprofile.co/v3/currency/rate");
      const data = await res.json();
      setData(data.data.rates);
     
     }catch(err){
         console.log(err);
     }    
  }
  useEffect(()=>{
     getList();
     },[])
 
     let newList = Object.entries(data);
   

    
const [chartData, setChartData] =useState({
    labels: 'BTCNGN, BTCBUSD, DASHBUSD, DASHNGN, ETHNGN, USDTNGN, TRON_USDTNGN, BUSDNGN, BNBNGN, CUSDNGN, BTCBTC',
     datasets: [{
        label:"Excahange Rates",
        data: '26297091.5724, 26068.729499999998, 20000, 20000, 1589327.204256, 993.26, 993.26, 993.26, 209721.204, 963.4621999999999'
    }]
});

    return ( 
        <div className={classes.form}>
           <h2>Analysis</h2>
           <div className={classes.ratebox}>
           <CurrencyExchangeOutlinedIcon className={classes.outicon} sx={{fontSize:"35px", color:"#133a39"}}/>
                <div className={classes.exflex}>
                       <h3>$4.56</h3>
                       <p>Exchange rate</p>
                       <img className={classes.ethimg} src={Coin} alt="a coin" />
                </div>
           </div>
           <div className={classes.know} style={{width:"400px", height:"300px"}}>
                <Bar className={classes.knowbar} data={chartData}/>
                
           </div>
           <p className={classes.knowbarp}>A graphical representation of all currencies and their exchange rates</p>

            <Marquee>
            <div className={classes.marq}>
                            <div className={classes.latest}>
                                <img src={Bitcoin} alt="a btc"  style={{width: "300px", height: "160px"}}/>
                                <p>latest exchange rate updates</p>
                            </div>
                    </div>
            </Marquee>
        
           
        </div>
     );
}
 

 
export default Form;