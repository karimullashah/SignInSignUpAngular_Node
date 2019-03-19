const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 4000

// app.use((req, res, next) => {
//     // console.log(req.method,req.path)
//     // next()

//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send('Site is currenlty down, Check back soon!')
// })


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// 
// without middleware : new request -> run route handler
//
// with middleware : new request -> do something -> run route handler
//

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    // const password = 'Karim1234'
    // const hashedPassword = await bcrypt.hash(password, 8)
    // //! here second argument is number of rounds of hasing to be performed on password.  

    // console.log(password)
    // console.log(hashedPassword)

    // const isMatch = await bcrypt.compare('Karim1234', hashedPassword)
    // console.log(isMatch)
}

const jwt = require('jsonwebtoken')
const myFunction1 = async () => {
    // const token = jwt.sign({ _id: 'abcd123' }, 'thisismynew course', { expiresIn: '7 days' }) // returns token
    // // first arg is something with which we can uniquely identify our user ,second argument is secret key 
    // console.log("mytoken",token)


    // const data = jwt.verify(token, 'thisismynew course')
    // console.log("data ",data)
}

const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
    // const task = await Task.findById('5c89ee7707a9cc4be43976cd')
    // await task.populate('owner').execPopulate()
    // console.log(task)

    // const user = await User.findById('5c89ee2407a9cc4be43976ca')
    // await user.populate('tasks').execPopulate()
    // console.log(user)
    // console.log(user.tasks)
}
// D:\ExpressJS\NODE\n3-12-02-storing-passwords\task-manager\src\index.js
main()
myFunction()
myFunction1()