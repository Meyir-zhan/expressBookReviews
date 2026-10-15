const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password ){
    if(!isValid(username)){
        users.push({"username": username , "password": password});
        return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    }else{
        return res.status(404).json({message: "User already exists!"})
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author == author);
  return res.status(200).json(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = Object.values(books).filter((book) => book.title == title);
  return res.status(200).json(filtered_books);
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

// ==========================================
// AXIOS WITH ASYNC/AWAIT (Required for Task 11)
// ==========================================

// Get all books using async/await
const getAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get book details based on ISBN using async/await
const getByISBN = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get book details based on Author using async/await
const getByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get book details based on Title using async/await
const getByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports.general = public_users;
