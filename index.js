const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3003

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const redirectRegister = async (contact, redirectUrl, tokenRedirect) => {
  const headers = {
    'Api-Token': tokenRedirect,
    "accept": 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  }

  const payload = {
    contact: {
      email: contact.email
    }
  }

  const config = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }

  console.log(JSON.stringify(payload))

  try {
    const response = await fetch(redirectUrl, config)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    return console.error('Error:', error)
  }
}


app.post('/', async (req, res) => {
  try {
    const { contact, redirectUrl, redirectUrlToken } = req.body
    console.log(req.body)
    console.log(contact)
    const data = await redirectRegister(contact, redirectUrl, redirectUrlToken)
    console.log(data)
    if (data && !data.errors) {
      res.status(200).json(data)
    } else {
      res.status(500).json({ error: `Erro ao tentar cadastrar` })
    }
  } catch (error) {
    console.error('Erro ao executar:', error);
    res.status(500).json({ error: 'Erro ao executar.' })
  }
})

app.listen(port, () => {
  console.log('Servidor iniciado com sucesso.')
})
