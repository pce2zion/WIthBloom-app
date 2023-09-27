import classes from "./MainList.module.css"
const MainList = (props) => {
    return ( 
        <div className={classes.mainlist}>
              <p className={classes.mainlistp1}>{props.name}</p> 
              <p className={classes.mainlistp2}>{props.rate} </p>     
                 
        </div>
     );
}
 
export default MainList;