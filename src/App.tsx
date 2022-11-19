import routers from "./router/router";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const App = () => {

  const GetRouters = () => useRoutes(routers);
  return (
    < Router >
      <GetRouters />
    </Router >
  );
}

export default App;