import { Switch, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import DashboardDepartment from "./pages/DashboardDepartment";

function App() {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={DashboardDepartment} />
        {/* <Route path="/add" component={Tes} /> */}
      </Switch>
    </>
  );
}

export default App;
