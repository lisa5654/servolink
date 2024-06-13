import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

function Layout() {
  const location = useLocation();

  const showNavbarFooter = !['/login', '/register'].includes(location.pathname);
  const [user, setUser] = useState(null);
  return (
    <div className="app">
    {showNavbarFooter && <Navbar user={user} />}
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/gigs" element={<Gigs />} />
  <Route path="/myGigs" element={<MyGigs />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/messages" element={<Messages />} />
  <Route path="/message/:id" element={<Message />} />
  <Route path="/add" element={<Add />} />
  <Route path="/gig/:id" element={<Gig />} />
  <Route
    path="/register"
    element={<Register />}
  />
  <Route
    path="/login"
    element={<Login setUser={setUser} />}
  />
</Routes>
{showNavbarFooter && <Footer />}
</div>

  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
