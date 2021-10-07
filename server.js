require('dotenv').config() // looks for .env ; process.env gets it's values

const mongoose = require("mongoose")
const express = require('express')
const apiRouter = require('./app/router/index')
const app = express()

const PORT = process.env.PORT || 8080

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// for serving all the normal html
app.use(express.static('public'))

// for routes
apiRouter(app)

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/flashapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
  );

app.listen(PORT, function() {
    console.log(`Database (name=${process.env.DB_NAME}); Serving app on: http://localhost:${PORT}`)
})