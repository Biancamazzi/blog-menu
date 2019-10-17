const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const bodyParser = require('body-parser')

const express = require('express')
const app = express()

const Lead = require('./model/lead')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/ebook', (req, res) => {
    res.sendFile(__dirname + '/views/ebook.html')
})

app.get('/gestao-de-estoque-ativa-desafios-e-oportunidades', (req, res) => {
    res.sendFile(__dirname + '/views/gestao-de-estoque-ativa-desafios-e-oportunidades.html')
})

app.get('/conheca-a-estrategia-para-baratear-o-custo-de-seu-comercio-em-ate-40', (req, res) => {
    res.sendFile(__dirname + '/views/conheca-a-estrategia-para-baratear-o-custo-de-seu-comercio-em-ate-40.html')
})

app.get('/05-formas-para-transformar-a-gestao-de-compras-e-suprimentos-do-seu-restaurante', (req, res) => {
    res.sendFile(__dirname + '/views/05-formas-para-transformar-a-gestao-de-compras-e-suprimentos-do-seu-restaurante.html')
})

app.get('/05-formas-para-transformar-a-gestao-de-compras-e-suprimentos-do-seu-restaurante.html', (req, res) => {
    res.sendFile(__dirname + '/views/05-formas-para-transformar-a-gestao-de-compras-e-suprimentos-do-seu-restaurante.html')
})

app.post('/leads', (req, res) => {
    console.log(req.body);
    const data = req.body;
    var curret_time = new Date();
    curret_time.setHours(curret_time.getHours() -3);
    var curret_time = curret_time.getFullYear() + '-' +     ("0" + (curret_time.getMonth() + 1)).slice(-2)  + '-' +      ("0" + curret_time.getDate()).slice(-2)   + ' ' + ("0" + curret_time.getHours()).slice(-2) + ':' + ("0" + curret_time.getMinutes()).slice(-2) + ":" + ("0" + curret_time.getSeconds()).slice(-2);


    data.data_hora = curret_time

    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0]|| 
        req.connection.remoteAddress || 
        req.socket.remoteAddress || 
        req.connection.socket.remoteAddress




    data.ip = ip;

    const lead = Lead.create(data);
    
    
    backURL=req.header('Referer') || '/';
    // do your thang
    res.redirect(backURL);
})

app.get('/leads.csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'leads.csv\"');
    Lead.csv((data) => {
        res.send(data);
    })
})

exports.app = functions.https.onRequest(app);

