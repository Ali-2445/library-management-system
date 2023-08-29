import React, { useState, useEffect } from "react";
import firebase from "../firebaseConfig";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from Firebase Firestore
    const fetchOrders = async () => {
      try {
        const ordersCollection = await firebase
          .firestore()
          .collection("orders")
          .get();
        const ordersData = ordersCollection.docs.map((doc) => doc.data());
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>All Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.bookTitle}</td>
              <td>{order.author}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
