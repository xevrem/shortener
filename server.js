let express = require('express');

let app = express();

let urls = {};
let count = 0;
let port = process.env.PORT;

app.get('/', (req,res)=>{
  res.end(`
Example creation usage:
  https://xev-url-shortener.glitch.me/new/https://www.google.com
  https://xev-url-shortener.glitch.me/new/http://foo.com:80
  https://xev-url-shortener.glitch.me/new/go.twitch.tv

Example creation output
  { "original_url":"http://foo.com:80", "short_url":"https://xev-url-shortener.glitch.me/8170" }

Usage:
  https://xev-url-shortener.glitch.me/2871

Will redirect to:
  https://www.google.com/
`)
});

app.get('/new/:id', (req,res)=>{
  let obj = shorten('http://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

app.get('/new/http://:id', (req,res)=>{
  let obj = shorten('http://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

app.get('/new/https://:id', (req,res)=>{
  let obj = shorten('https://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

const shorten = function(proto, url, hostname){
  count++;
  urls[count] = proto+url;
  return {
    'original_url': proto + url,
    'short_url': `${hostname}/${count}`
  }
}

app.get('/:id', (req, res)=>{
  res.redirect(urls[req.params.id]);
  res.end();
});

app.listen(port);
