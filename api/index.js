 "use strict"
 
 const express = require("express")
 const app = express()

 const cors = require("cors")

 require("dotenv").config()

 const HOST = process.env.HOST
 const PORT = process.env.PORT

 require("express-async-errors")  //* async-errors to errorHandler

 //* MONGODB Connection
 const { dbConnection } = require("./src/configs/dbConnection")
 dbConnection()

 //* JSON for data interchange
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cors())

 // Call static uploadFile:
app.use('/upload', express.static('./upload'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

 // Check Authentication:
app.use(require('./src/middlewares/authentication'))
app.use(require("./src/middlewares/queryHandler"))

app.all('/', (req, res) => {
  res.send({
      error: false,
      message: 'Welcome to Blog API',
      documents: {
          swagger: '/documents/swagger',
          redoc: '/documents/redoc',
          json: '/documents/json',
      },
      user: req.user
  })
})

//* Routes:
app.use(require("./src/routes"))

 //*error handler
 app.use(require("./src/middlewares/errorHandler"))

 app.listen(PORT, () => console.log(`Server is running on http://${process.env.HOST}:${PORT}`))

//  require("./src/helpers/sync")()  //! it clears the whole database
