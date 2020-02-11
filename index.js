/* eslint-disable no-console */
const express = require('express');
const app = express()

const { config } = require('./config/index');

app.get('/', ( req, res) =>{
  res.json({
    hello: 'worlds'
  })
});

app.listen(config.port, ()=> {
  console.log(`Server running on http://localhost:${config.port}`)
})