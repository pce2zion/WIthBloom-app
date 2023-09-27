import Converter from "../converter/Converter";
import Form from "../form/Form";
import List from "../list/List";
import Nav from "../nav/Nav";
import classes from "./Main.module.css"
const Main = () => {
    return ( 
        <div className={classes.main}>
            <Nav/> 
            <div className={classes.flex}>
            <List/>
            <div className={classes.convo}><Form/></div>
            </div>
            
        </div>
     );
}
 
export default Main;