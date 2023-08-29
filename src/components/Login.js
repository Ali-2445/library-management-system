import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import M from "materialize-css/dist/js/materialize.min.js";
import { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log("user", user);
    if (user) {
      history.push("/books");
    }
  }, [user, history]);

  // const login = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return;
  //   }
  //   try {
  //     const user = await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password);
  //     if (user) {
  //       history.push("/books");
  //     }
  //   } catch (error) {
  //     M.toast({ html: `${error.message}`, classes: "red rounded" });
  //   }
  // };

  // const login = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return;
  //   }
  //   try {
  //     const userCredential = await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password);
  //     if (userCredential.user) {
  //       // Check if the user has isUser set to true in Firestore
  //       const userDoc = await firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(userCredential.user.uid)
  //         .get();

  //       if (userDoc.exists && userDoc.data().isUser === true) {
  //         history.push("/marketplace"); // User has isUser set to true
  //       } else {
  //         history.push("/books"); // User does not have isUser set to true
  //       }
  //     }
  //   } catch (error) {
  //     M.toast({ html: `${error.message}`, classes: "red rounded" });
  //   }
  // };

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (userCredential.user) {
        // Check if the user has isUser set to true in Firestore
        const userDocRef = firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData.isUser == true) {
            history.push("/marketplace"); // User has isUser set to true
          } else {
            history.push("/books"); // User does not have isUser set to true
          }
        } else {
          // Handle the case where the user document doesn't exist
          console.log("User document does not exist.");
          // You can choose to display an error message or handle it differently.
        }
      }
    } catch (error) {
      M.toast({ html: `${error.message}`, classes: "red rounded" });
    }
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card hoverable">
          <div className="card-content">
            <h5 className="center">Login to Dashboard</h5>
            <form onSubmit={login}>
              <div className="row">
                <div className="input-field col s12 m8 offset-m2">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12 m8 offset-m2">
                  <i className="material-icons prefix">keyboard_hide</i>
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="card-action center">
                <button
                  className="waves-effect waves-light btn"
                  style={{ margin: "18px" }}
                  type="submit"
                >
                  Login
                  <i className="material-icons right">add_circle_outline</i>
                </button>
                <button
                  className="waves-effect waves-light btn red"
                  type="reset"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Reset <i className="material-icons right">cancel</i>
                </button>
              </div>
            </form>
          </div>
          <div
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <p
              className="flow-text"
              onClick={() => history.push("/signup")}
              style={{ cursor: "pointer" }}
            >
              Don't have an account? Signup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
