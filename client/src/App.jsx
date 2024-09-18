import Header from "./components/Header"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";
import EditDetails from "./pages/EditDetails";


function App() {
  

  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/sign-in" element={<Signin/>} />
      <Route path="/sign-up" element={<Signup/>} />
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/employee-list" element={<EmployeeList/>}/>
        <Route path="/createEmployee" element={<CreateEmployee/>}/>
        <Route path="/delete/:id" element={<DeleteEmployee/>}/>
        <Route path="/edit/:id" element={<EditDetails/>}/>
        </Route>
      <Route/>
      <Route/>
     </Routes>
    </BrowserRouter>
    
  )
}

export default App
