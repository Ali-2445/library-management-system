



import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import spinner from "../images/loadingSpinner.gif";
import { AuthContext } from "../context/Auth";
import { TextField, Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';

const MarketPlace = (props) => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {
    // if (!user) {
    //   props.history.push("/");
    // }
    setIsLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection("books")
      .onSnapshot(
        (snapshot) => {
          const allBooks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooks(allBooks);
          setIsLoading(false);
        },
        function (error) {
          console.log("error");
        }
      );
    return () => unsubscribe();
  }, [user, props.history]);

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner" />
    </div>
  ) : (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Grid container spacing={2}>
        {books.length > 0 ? (
          books
            .filter((book) =>
              book.title.toLowerCase().includes(searchTitle.toLowerCase())
            )
            .filter((book) =>
              book.author.toLowerCase().includes(searchAuthor.toLowerCase())
            )
            .map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="250"
                    image={book.imageURL}
                    alt={book.author}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Name: {book.title}
                    </Typography>
                    <Typography variant="body1">
                      Price: {book.price} Rs
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {book.description}
                    </Typography>
                  </CardContent>
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/book/${book.id}?fromMarketplace=true`}
                    >
                      View Details <i className="material-icons right">arrow_forward</i>
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography variant="h3">No books available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default MarketPlace;
