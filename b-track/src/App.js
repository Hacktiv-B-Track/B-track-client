import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./pages/Navbar";
import DashboardDepartment from "./pages/DashboardDepartment";
import BudgetDetail from "./pages/BudgetDetail";
import DashboardFinance from "./pages/DashboardFinance";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="App">
      {/* <FormModal /> */}
      {currentPath !== "/login" && currentPath !== "/register" && (
        <NavBar />
      )}
      <Switch>
        {/* <Route exact path="/" component={} /> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} />
        <Route exact path="/dashboard/finance" component={DashboardFinance} />
        <Route
          path="/dashboard/:departmentId"
          component={DashboardDepartment}
        />
        <Route path="/budget/:budgetId" component={BudgetDetail} />
      </Switch>

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
