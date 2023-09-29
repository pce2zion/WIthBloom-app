import classes from "./Converter.module.css"
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Coin  from "../../helpers/images/coin.png"
import { useState, useEffect } from "react";
import FileList from "../filelist/FileList";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from "react-router-dom";


const Converter = () => {

    const [formData, setFormData]=useState({ 
        fromCurrency:"",
        toCurrency:"",
        amount:""
    })

    const [data, setData]  = useState([]); 
    const [alert, setAlert] = useState("");
    const [show, setShow] = useState(false)
    const [rates, setRates]= useState(null);
   
    

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

        const handleChange = (event)=>{
                const{name, value} = event.target
                setFormData(prevStateData=>({
                    ...prevStateData,
                    [name] : value
                }))
        }
        let rate1;
        const calcRate =() =>{
            const selectedRate = newList.find((item) => {
                return  item[0].includes(formData.fromCurrency.toUpperCase() )&&
                       item[0].includes(formData.toCurrency.toUpperCase())
                 
              }); 
              if(selectedRate){
                rate1 = selectedRate[1].rate;
                const convertedAmount = formData.amount * rate1;
                return   setRates(convertedAmount);
              } 
        }

        const alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
       
        const handleSubmit = (event)=>{
          
            event.preventDefault()
            if(!formData){
                setRates(null)
             }
            if(!formData.amount){
                setShow(true)
                setRates(0);
                setAlert("Enter an amount")
                setTimeout(()=>{
                    setShow(false) 
                   }, 2000)    
               }
               for(let i =0; i< alphabets.length; i++){
                if(formData.amount.includes(alphabets[i])){
                 setShow(true)
                    setAlert("Please enter correct amount") 
                    setTimeout(()=>{
                     setShow(false) 
                    }, 2000)    
                }
                
             }
             calcRate() 
             if(!formData && calcRate()){
                setRates(null)
             }
            }
            const navigate = useNavigate();
            const handleBack=()=>{
                navigate("/list")
            }

        

       
        
              
       
    return ( 
        <div className={classes.converter}>
            <div>
            <KeyboardBackspaceOutlinedIcon className={classes.keyboard} sx={{color:"133A39", fontSize:"40px", fontWeight:"500", position:"relative", right:"90px", bottom:"60px"}} onClick={handleBack}/>
                 <h2>Converter</h2>
                 <p className={classes.cp}>Enter two currency names and an amount below to calculate the exchange rate</p>
                 <div className={classes.ratebo}>
                   
                        <CurrencyExchangeOutlinedIcon className={classes.outicon} sx={{fontSize:"35px", color:"#133a39"}}/>
                        <div className={classes.exflex}>
                             <h3>$4.56</h3>
                             <p>Exchange rate</p>
                            <img className={classes.ethimg} src={Coin} alt="a coin" />
                        </div>
                </div>
           
          

                 <div className={classes.currconvert}>
                        <form onSubmit={handleSubmit} className={classes.formconvert}>
                            <label  htmlFor="fromCurrency">From currency</label> <br />
                            <input 
                                className={classes.formconvert1}
                                id="fromCurrency"
                                value={formData.fromCurrency}
                                onChange={handleChange}
                            name="fromCurrency"
                            />
                  
                            <label className={classes.label1}  htmlFor="toCurrency">To currency</label> <br />
                            <input 
                                className={classes.formconvert2}
                                id="toCurrency"
                                value={formData.toCurrency}
                                onChange={handleChange}
                                name="toCurrency"
                            />
                            <br />
                             <label className={classes.formconlab} htmlFor="amount">Enter Amount</label> <br />
                            <input
                                    className={classes.formconvert3}
                                    id="amount"
                                    type="text"
                                    name='amount'
                                    onChange={handleChange}
                                    value={formData.amount}
                                    placeholder= "Enter amount to be converted"
                            />
                             <p className={classes.formconvertp}>{show ? alert : ""}</p> 
                            <button className={classes.conbtn}>Convert Now</button>
                
                        </form>
                        <div className={classes.rateresult} >{rates}</div>
           
                    </div> 
          
            </div>
            <div>
                <p className={classes.filerate}>List of Rates</p>
                <FileList
                list={newList}
                />
           </div>
        </div>
     );
}
 
export default Converter;