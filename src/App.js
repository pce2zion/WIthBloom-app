import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./components/main/Main";
import Converter from "./components/converter/Converter";
import Join from "./components/join/Join";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";


const router= createBrowserRouter([
  {path: "/", element: <Login/>},
  {path: "/exchange", element: <Join/>},
  {path: "/list", element: <Main/>},
  {path: "/signUp", element: <SignUp/>}
]);

function App() {
  return (
    <div className="App">
      
      <div className="design">
        
         <RouterProvider router={router}/> 
      </div>
      
    </div>
  );
}

export default App;
