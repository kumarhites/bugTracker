// imports
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useAuthContext} from './hooks/useAuthContext'

//basic styles
import "./App.css";

//pages
import CreateProject from "./pages/create/CreateProject";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ViewProject from "./pages/details/ViewProject";
import Navbar from "./components/Navbar";
import OnlineUsers from "./components/OnlineUsers";

function App() {

  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
        {user && <Navbar />}
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/"/> :<Login />} />
            <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup />} />
            <Route path="/create" element={!user ? <Navigate to="/login"/> : <CreateProject />} />
            <Route exact path="/" element={!user ? <Navigate to="/login"/> : <Dashboard/>} />
            <Route path="/projects/:id" element={!user ? <Navigate to="/login"/> : <ViewProject />} />
          </Routes>
      </Router>
      )}
      {user && <OnlineUsers />}
    </div>
  );
}

export default App;

/**
 * pages
 * - dashboard (homepage)
 * - login
 * - signup
 * - create new project
 * - project (project details)
 */
