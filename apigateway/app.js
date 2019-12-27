const express = require('express');
const httpProxy = require('http-proxy-middleware');
const config = require('./config');

let proxyNotes;
let proxyUsers;

let app = express();

app.use('/hello',(req,res) => {
    res.send('All is well.............!');
})

proxyNotes = httpProxy({
    target : config.notes_URL,
    pathRewrite:{'^/notesdata/':'/'}
});

app.use('/notesdata/',proxyNotes);
app.use((req,res) => {
    res.status(404).send({message:"Resource not found......!"});
});

module.exports = app;