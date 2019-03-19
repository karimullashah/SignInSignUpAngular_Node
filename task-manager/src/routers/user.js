const express = require('express')
const nodemailer = require('nodemailer')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        sendMail(user.email,user.name)
    } catch (e) {
        res.status(400).send(e)
    }
})

const sendMail = (email,name) =>{
    // setting the transport
    var smtpTransport = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:465,
      secure:true,
      auth: {
          user : "mycar.project.1@gmail.com",
          pass : 'mycarproject1@'
      } 
    });

    var mailOptions = {
        to : email,
        from : "mycar.project.1@gmail.com",
        subject : "welcome",
        text :
            "Hello , " +
            name +
            ".\n" +
            "Thank you for registering with us" +
            "\n" +
            "Regards : Mycar Team. "
    };

    smtpTransport.sendMail(mailOptions,(err) => {
        console.log(err);
    },
    console.log("mail sent successfully")
    );
}

router.post('/users/login', async (req, res) => {
    try {
        // console.log("hi")
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({user:user.getPublicProfile(),token})
        res.send({ user, token })

    } catch (e) {
        res.status(400).send()
    }
})




router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log(req.user.tokens)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        console.log(req.user.tokens)
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users', async (req, res) => {
    try {
        // console.log(req.user)
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})


// to include the middleware we need to pass as argument before route handler 
// here auth is middleware.
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})// first arg is path , second arg is route handler.


// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // console.log(req.user._id)
        // const user = await User.findById(req.user._id)

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!req.user) {
            return res.status(404).send()
        }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // } or

        await req.user.remove()
           
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router