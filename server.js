 
const path = require('path')
const express = require('express');
const connectDB = require('./config/db');
const app = express();

//mongodb
connectDB();

//initialise middleware
app.use(express.json({ extended: false }));
//
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

//Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));



//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folter
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server in up and running at port', PORT));
