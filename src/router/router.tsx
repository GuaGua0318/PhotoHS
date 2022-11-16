import Login from "../pages/Login";
import Shared from "../pages/Shared";

const routers = [
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/shared",
    element:<Shared/>
  }
]

export default routers;