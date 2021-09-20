import "./App.css";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./pages/Navbar";
import DashboardDepartment from "./pages/DashboardDepartment";
import BudgetDetail from "./pages/BudgetDetail";
import DashboardFinance from "./pages/DashboardFinance";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('access_token'))
  const [DepartmentId, setDepartmentId] = useState(localStorage.getItem('DepartmentId'))

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('access_token'))
    setDepartmentId(localStorage.getItem('DepartmentId'))
  }, [currentPath])

  let routes
  if (isAuthenticated) {
    routes = (
    <Switch>
      <Route path="/users" component={Users} />
      <Route exact path="/dashboard/finance" component={DashboardFinance} />
      <Route
        path="/dashboard/:departmentId"
        component={DashboardDepartment}
      />
      <Route path="/budget/:budgetId" component={BudgetDetail} />
      <Redirect to={`dashboard/${DepartmentId}`}></Redirect>
      
    </Switch>)
  } else {
    routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect to='/login'></Redirect>
      </Switch>
    )
  }

  return (
    <div className="App">
      {currentPath !== "/login" && currentPath !== "/register" && (
        <NavBar />
      )}
      {routes}
    </div>
  );
}


function Users() {
  return <h2>Users</h2>;
}

export default App;
