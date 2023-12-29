import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Home from "./components/home/home";
import CreateMovieForm from "./components/movieList/movieList";
import CreateTheaterForm from "./components/theaterList/theaterList";
import BookingForm from "./components/bookingForm/bookingForm";
import Login from "./components/login/login";
import './App.css'

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* <Auth0Provider
        domain="Web client 1.auth0.com"
        clientId="1025892954736-8ndp01ul9rbch3vtip4op90af3c513vb.apps.googleusercontent.com"
        redirectUri={window.location.origin}
      > */}
        <BrowserRouter>
          <Routes>
            {/* {!isAuthenticated ? (
              <Route path="/" element={<Login />} />
            ) : ( */}
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-movie" element={<CreateMovieForm />} />
                <Route path="/create-theater" element={<CreateTheaterForm />} />
                <Route path="/booking" element={<BookingForm />} />
              </>
            {/* )} */}
          </Routes>
        </BrowserRouter>
      {/* </Auth0Provider> */}
    </>
  );
};

export default App;
