const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const { requireAuth, checkUser, requireAuth2, requireAuth3 } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const { render } = require('ejs');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
//const dbURI = 'mongodb+srv://sarmednazir786:Sarmed@119@cluster0.h6hcelo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbURI = 'mongodb://mongo_db:27017';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/products', requireAuth, (req, res) => res.render('products'));

app.get('/admin', requireAuth2, (req, res) => {
  const filePath = path.join(__dirname, 'admin', 'jo-phillipwich@masteruser.com.chk');
  res.download(filePath, 'jo-philipp****@masteruser.com.chk', (err) => {
    if (err) {
      console.error(err);
      res.status(403).send('Error occurred while downloading the file.');
    }
  });
});

app.get('/masterusersdata', requireAuth3, (req, res) => {
  const filePath = path.join(__dirname, 'masterusersdata', 'challenge4.jpeg');
  res.download(filePath, 'theflag.jpeg', (err) => {
    if (err) {
      console.error(err);
      res.status(403).send('Error occurred while downloading the file.');
    }
  });
});

app.get('/logs', requireAuth3, (req, res) => {
  const filePath = path.join(__dirname, 'logs', 'logs.pcapng');
  res.download(filePath, 'logs.pcapng', (err) => {
    if (err) {
      console.error(err);
      res.status(403).send('Error occurred while downloading the file.');
    }
  });
});

app.use(authRoutes);
