const express = require('express'),
    markdown = require( "markdown" ).markdown

app = express()


app.get('/',(req,res) => {
    res.send('hello world')
    })



