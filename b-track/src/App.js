import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
// import Navbar from "./pages/Navbar";
import DashboardDepartment from "./pages/DashboardDepartment";
import BudgetDetail from "./pages/BudgetDetail";

function App() {
  return (
    <div className="App">
      {/* <FormModal /> */}
      <NavBar />
      {/* <Switch> */}
      <Route exact path="/" component={BudgetDetail} />
      {/* <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route
          path="/dashboard/:departmentId"
          component={DashboardDepartment}
        />
        <Route path="/budget/:budgetId" component={BudgetDetail} />
      </Switch> */}

      {/* <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/dashboard/:departmentId">Dashboard Department</Link>
              </li>
              <li>
                <Link to="/budget/:budgetId">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav> */}
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
