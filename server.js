const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

const port = process.env.PORT || 3000;
// if PORT from env is not available (run env command from terminal), use default port 3000..

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// pass a key value pair
app.set('view engine', 'hbs');
// express middleware lets you configure how ur exp appl works. similar to third party addon
// app.use(express.static(__dirname + '/public'));   if it is put here, the maintenance will not work.. help.html will still work fine...
// takes the absolute path without any parms
// __dirname stores the path to ur project library...

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

// app.use for maintenance hbs
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'test';
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// register a handler for http requests
// first arg is the url, in our case it is the root dir
app.get('/', (req, res) => {
  // res.send('Hello Express!');
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'sridevi',
  //   likes: [
  //     'apples','oranges','bananas'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to the Home Page'
  });
});

app.get('/about', (req,res) => {
  // res.send('about page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle the request',
    status: '999'
  })
})
// bind to a port ?? common port is 3000
// app.listen(3000, () => {
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
  // the second option for listen is optional.. this msg prints on terminal..
});
