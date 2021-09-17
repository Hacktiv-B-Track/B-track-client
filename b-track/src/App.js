
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import DashboardDepartment from "./pages/DashboardDepartment";

function App() {
  return (
    <div className="App">
      <Navbar />


      <Switch>
        <Route exact path="/" component={DashboardDepartment} />
        {/* <Route path="/add" component={Tes} /> */}
      </Switch>
    </>

      {/* <NavBar/> */}
//       <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/dashboard/:departmentId">Dashboard Department</Link>
//             </li>
//             <li>
//               <Link to="/budget/:budgetId">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/login">
//             <Login />
//           <Route path="/users">
//             <Users />
//           </Route>
//           </Route>
//           <Route path="/dashboard/:departmentId">
//             <Dashboard />
//           </Route>
//           <Route path="/budget/:budgetId">
//             <BudgetDetail />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
      
    </div>

  );
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function BudgetDetail() {
  return <h2>Budget Detail</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
