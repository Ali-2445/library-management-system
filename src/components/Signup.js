// import React, { useState, useEffect, useContext } from "react";
// import firebase from "../firebaseConfig";
// import M from "materialize-css/dist/js/materialize.min.js";
// import { AuthContext } from "../context/Auth";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const Signup = (props) => {
  // const { user } = useContext(AuthContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const history = useHistory();

  // const signup = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return;
  //   }
  //   try {
  //     const userCredential = await firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password);

  //     if (userCredential.user) {
  //       // Create a user object to store in Firestore
  //       const newUser = {
  //         email: userCredential.user.email,
  //         isUser: true,
  //         // Add other user-related data if needed
  //       };

  //       // Store user data in Firestore
  //       await firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(userCredential.user.uid)
  //         .set(newUser);

  //       history.push("/marketplace");
  //     }
  //   } catch (error) {
  //     M.toast({ html: `${error.message}`, classes: "red rounded" });
  //   }
  // };

//   return (
//     <div className="row">
//       <div className="col s12 m6 offset-m3">
//         <div className="card hoverable">
//           <div className="card-content">
//             <h5 className="center">Create Account</h5>
//             <form onSubmit={signup}>
//               <div className="row">
//                 <div className="input-field col s12 m8 offset-m2">
//                   <i className="material-icons prefix">email</i>
//                   <input
//                     id="email"
//                     type="email"
//                     className="validate"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <label htmlFor="email">Email</label>
//                 </div>
//                 <div className="input-field col s12 m8 offset-m2">
//                   <i className="material-icons prefix">keyboard_hide</i>
//                   <input
//                     id="password"
//                     type="password"
//                     className="validate"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <label htmlFor="password">Password</label>
//                 </div>
//                 <div className="input-field col s12 m8 offset-m2">
//                   <i className="material-icons prefix">keyboard_hide</i>
//                   <input
//                     id="name"
//                     type="text"
//                     className="validate"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   <label htmlFor="name">Name</label>
//                 </div>
//               </div>
//               <div className="card-action center">
//                 <button
//                   className="waves-effect waves-light btn"
//                   style={{ margin: "18px" }}
//                   type="submit"
//                 >
//                   Register
//                   <i className="material-icons right">add_circle_outline</i>
//                 </button>
//                 <button
//                   className="waves-effect waves-light btn red"
//                   type="reset"
//                   onClick={() => {
//                     setEmail("");
//                     setPassword("");
//                   }}
//                 >
//                   Reset <i className="material-icons right">cancel</i>
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div
//             style={{
//               flexDirection: "row",
//               width: "100%",
//               justifyContent: "center",
//             }}
//           >
//             <p
//               className="flow-text"
//               onClick={() => history.push("/")}
//               style={{ cursor: "pointer" }}
//             >
//               Already have an account? Login
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useContext } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Link } from "@mui/material";
import { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom";
import firebase from "../firebaseConfig";
import M from "materialize-css/dist/js/materialize.min.js";

const Signup = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const signup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Create a user object to store in Firestore
        const newUser = {
          email: userCredential.user.email,
          isUser: true,
          // Add other user-related data if needed
        };

        // Store user data in Firestore
        await firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(newUser);

        history.push("/");
      }
    } catch (error) {
      M.toast({ html: `${error.message}`, classes: "red rounded" });
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Create Account
            </Typography>
            <form onSubmit={signup}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setName("");
                    }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardContent>
            <Typography variant="body1" align="center">
              Already have an account?{" "}
              <Link component="span" onClick={() => history.push("/login")}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
