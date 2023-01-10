import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Masterlayout from '../component/MasterLayOut/Masterlayout';
import './App.css';
import Home from "../component/Home/Home";
import About from "../component/About/About";
import Details from "../component/Details/Details";
import Login from "../component/Login/Login";
import People from "../component/People/People";
import Network from "../component/Network/Network";
import Moveis from "../component/Movies/Movies";
import Notfound from "../component/Notfound/Notfound";
import Register from "../component/Register/Register";
import Tvshows from "../component/Tv shows/Tvshows";
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../component/ProtectedRoute/ProtectedRoute';




 
function App() {
  const [userData,setuserData] = useState(null);
 let saveUserData=()=>{
  let enCodedToken=localStorage.getItem("token");
  let deCodedToken=jwtDecode(enCodedToken);
  setuserData(deCodedToken);
 }
 let logout=()=>{
  localStorage.removeItem("token");
  setuserData(null);
  return <Navigate to="login"/>
 }
 useEffect(()=> {
   if (localStorage.getItem("token")) {
    saveUserData();
   }
 }, []);

let routes=createBrowserRouter([
  {path:"",element:<Masterlayout userData={userData} logout={logout}/>,errorElement:<Notfound/>,
  children:[
    {index:true,element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
    {path:"login",element:<Login saveUserData={saveUserData}/>},
    {path:"people",element:<ProtectedRoute userData={userData}> <People/></ProtectedRoute>},
    {path:"about",element:<ProtectedRoute userData={userData} ><About/></ProtectedRoute>},
    {path:"network",element:<ProtectedRoute userData={userData} ><Network/></ProtectedRoute>},
    {path:"movies",element:<ProtectedRoute userData={userData} ><Moveis/></ProtectedRoute>},
    {path:"register",element:<Register/>},
    {path:"details/:id/:mediaType",element:<ProtectedRoute userData={userData} ><Details/></ProtectedRoute>},
    {path:"tvshows",element:<ProtectedRoute userData={userData} ><Tvshows/></ProtectedRoute>},
  ]}
])
  return (
    <div >
   <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
