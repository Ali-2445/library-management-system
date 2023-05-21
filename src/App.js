import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { AuthProvider } from "./context/Auth";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import Footer from "./components/Footer";
import firebase from "firebase";

const App = () => {
  const config = {
    // apiKey: "AIzaSyDEWhmlkC5v7kCs23HowbHDRCl0WsbxBj4",
    // authDomain: "library-c06a0.firebaseapp.com",
    // projectId: "library-c06a0",
    // storageBucket: "library-c06a0.appspot.com",
    // messagingSenderId: "438355591176",
    // appId: "1:438355591176:web:ca314ab320f63bffd311bd",
    // measurementId: "G-D74EDDPT9V",
    apiKey: "AIzaSyCjWR894RpnnXdHPH7vgRGTFsK8nob4B5k",
    authDomain: "library-270ed.firebaseapp.com",
    projectId: "library-270ed",
    storageBucket: "library-270ed.appspot.com",
    messagingSenderId: "618333617992",
    appId: "1:618333617992:web:6c1ce0941c50eda54bfd7d",
  };

  useEffect(() => {
    if (!firebase.app.length) {
      firebase.initializeApp(config);
    }
  }, []);
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Fragment>
            <div className="content">
              <Route exact path="/" component={Login} />
              <Route exact path="/books" component={Dashboard} />
              <Route exact path="/book/:id" component={BookDetails} />
              <Route exact path="/add/book" component={AddBook} />
            </div>
          </Fragment>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
