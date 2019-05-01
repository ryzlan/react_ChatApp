const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator:'v1:us1:9f0d98d9-3938-4b95-9afc-3e90b188b3b3',
  key:'3cc89e1c-2734-41ca-974e-f4421c5d353a:mJW2RTpNvb7ujvq3Uqv9CAjU0m7xToTTjtDKO/SZKwQ=',

})

app.use(bodyParser.urlencoded({ extended: true  }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
   const { username } = req.body
    chatkit
     .createUser({
        id: username,
        name: username
      })
      .then(() => res.sendStatus(201))
      .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
          res.sendStatus(200)
        } else {
          res.status(error.status).json(error)
        }
      })
  })
  
  app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
  })


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
