const express = require('express');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', createProxyMiddleware({target: 'https://www.metaweather.com', changeOrigin: true}));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    console.log(req.path);
    
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);