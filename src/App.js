import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import ClientsList from "./Pages/ClientsList";
import ClientNew from "./Pages/ClientNew"
import ClientView from "./Pages/ClientView";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/users" element={<Users/>}/>
        <Route exact path="/clients" element={<ClientsList/>}/>
        <Route exact path="/clients-new" element={<ClientNew/>}/>
        <Route exact path="/clients-view" element={<ClientView/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
