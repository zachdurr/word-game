const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json('hi')
})

app.get('/words', (req, res) => {
    const chosenLevel = req.query.level
    console.log(req)
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {level: chosenLevel, area: 'sat'},
        headers: {
          'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      }

      axios.request(options).then(response => {
        res.json(response.data)
      }).catch(error => {
        console.error(error)
      })
})

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))
