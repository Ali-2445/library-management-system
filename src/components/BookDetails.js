import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import spinner from "../images/loadingSpinner.gif";
import { AuthContext } from "../context/Auth";
import EditBook from "./EditBook";
import M from "materialize-css/dist/js/materialize.min.js";

const BookDetails = (props) => {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState();
  const [editMode, setEditMode] = useState(false);
  const { id } = props.match.params;
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const fromMarketplace = new URLSearchParams(props.location.search).get(
    "fromMarketplace"
  );
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOrder = () => {
    // Open the popup when the button is clicked
    if (!user) {
  
      props.history.push("/login");
    }else{
      setPopupVisible(true);

    }
  };

  const closePopup = () => {
    // Close the popup
    setPopupVisible(false);
  };
  useEffect(() => {
    // if (!user) {
    //   props.history.push("/");
    // }
    const unsubscribe = firebase
      .firestore()
      .collection("books")
      .doc(id)
      .onSnapshot(function (doc) {
        setBook(doc.data());
      });

    return () => unsubscribe();
  }, [user, props.history, id]);

  const deleteBook = () => {
    if (window.confirm("Are you sure to delete this book?")) {
      firebase
        .firestore()
        .collection("books")
        .doc(id)
        .delete()
        .then(function () {
          props.history.replace("/books");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    } else {
      return;
    }
  };
  const editBook = () => {
    setEditMode(!editMode);
  };

  const confirmOrder = async () => {
  
    if (!phone || !address) {
      alert("Fill all information");
      return;
    } else {
      const newOrder = {
        bookTitle: book.title,
        author: book.author,
        price: book.price || 0,
        email: user?.email,
        uid: user?.uid,
        phone: phone,
        address: address,
      };

      firebase
        .firestore()
        .collection("orders")
        .add(newOrder)
        .then(() => {
          M.toast({
            html: "Order added succesfully",
            classes: "green darken-1 rounded",
          });
          setPhone("");
          setAddress("");
          setPopupVisible(false);
        })
        .catch(() => {
          M.toast({
            html: "Something went wrong. Please try again.",
            classes: "red darken-1 rounded",
          });
          setPhone("");
          setAddress("");
          setPopupVisible(false);
        });
    }
  };
  return (
    <div className="container">
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            {/* Add your popup content here */}
            {/* <div className="input-field">
              <input
                id="title"
                type="text"
                className="validate"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="title">Phone Number</label>
            </div> */}
            <div className="input-field">
  <input
    id="title"
    type="number"
    className="validate"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    onKeyPress={(e) => {
      // Allow only numbers
      const isValidChar = /^\d+$/.test(e.key);
      if (!isValidChar) {
        e.preventDefault();
      }
    }}
  />
  <label htmlFor="title">Phone Number</label>
</div>
            <div className="input-field">
              <input
                id="address"
                type="text"
                className="validate"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="address">Address</label>
            </div>
            <button
              className="btn waves-effect waves-light black"
              type="submit"
              name="action"
              onClick={confirmOrder}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {editMode ? null : (
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>Back to dashboard
        </Link>
      )}
      {book ? (
        editMode ? (
          <EditBook book={book} id={id} setEditMode={setEditMode} />
        ) : (
          <div className="row card">
            <div className="col m4">
              <h3 className="center" style={{ marginRight: "50px" }}>
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="responsive-img"
                />
              </h3>
            </div>
            <div className="col m6">
              <div className="actions">
                <h4>Details</h4>
                {fromMarketplace && (
                  <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action"
                    onClick={handleOrder}
                  >
                    Order
                    <i className="material-icons right">shopping_cart</i>
                  </button>
                )}
                {editMode || fromMarketplace ? null : (
                  <div>
                    <button
                      className="btn waves-effect waves-light green"
                      type="submit"
                      name="action"
                      style={{ marginRight: "15px" }}
                      onClick={editBook}
                    >
                      Edit
                      <i className="material-icons right">edit</i>
                    </button>
                    <button
                      className="btn waves-effect waves-light red"
                      type="submit"
                      name="action"
                      onClick={deleteBook}
                    >
                      Delete
                      <i className="material-icons right">delete</i>
                    </button>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col">
                  <h6>
                    <strong>Title: </strong>
                    {book.title}
                  </h6>
                  <h6>
                    <strong>Author: </strong>
                    {book.author}
                  </h6>
                  <h6>
                    <strong>Genre: </strong>
                    {book.genre}
                  </h6>
                  <h6>
                    <strong>Price: </strong>
                    {book.price}
                  </h6>
                </div>
                <div className="col">
                  <h6>
                    <strong>Date: </strong>
                    {book.date_published}
                  </h6>
                  <h6>
                    <strong>No. Pages: </strong>
                    {book.no_copies}
                  </h6>
                  <h6>
                    <strong>Description: </strong>
                    {book.description}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="spinner">
          <img src={spinner} alt="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default BookDetails;
