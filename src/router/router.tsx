import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import My from "../pages/My";
import Shared from "../pages/Shared";

const routers = [
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/shared",
    element:<Shared/>,
  },
  {
    path:"/my",
    element:<My/>,
  },
  {
    path:"/",
    element:<Navigate to="/login"/>,

  }
]

export default routers;