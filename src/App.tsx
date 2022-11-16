import { Fragment } from "react";
import Bg from "./components/ui/Bg";
import routers from "./router/router";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {

  const GetRouters = () => useRoutes(routers);
  return (
    < Router >
      <GetRouters />
    </Router >
  );
}

export default App;