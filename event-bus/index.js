const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const events = []

app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)

    axios.post('http://posts-cluster-ip-srv:4000/events', event).catch(err => {console.log(err.message)})
    axios.post('http://comments-cluster-ip-srv:4001/events', event).catch(err => {console.log(err.message)})
    axios.post('http://query-cluster-ip-srv:4002/events', event).catch(err => {console.log(err.message)})
    axios.post('http://moderation-cluster-ip-srv:4003/events', event).catch(err => {console.log(err.message)})


    res.send({status: 'OK'})

})

app.get('/events', (req, res) => {
    res.send(events)
})

const port = 4005

app.listen(port, () => {
    console.log("Event bus started on port", port)
})