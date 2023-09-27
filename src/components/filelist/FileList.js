import classes from "./FileList.module.css"
const FileList = (props) => {
    
    return ( 
        <div className={classes.filelist}>
            { 
                props.list.map(item=>{
                    return <p key={item[1].key}>{item[0] }</p>
                })
            }
              
        </div>
     );
}
 
export default FileList;