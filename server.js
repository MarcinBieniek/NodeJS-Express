const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'dark' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { layout: 'main' });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'main' });
});

app.get('/info', (req, res) => {
  res.render('info', { layout: 'main' });
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'main' });
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', {name: req.params.name, layout: 'main'})
});

// image upload 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
});

const upload = multer({storage: storage});

app.post('/contact/send-message', upload. single('image'), (req, res) => {

  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, layout: 'main', filename: req.file.originalname });
  }
  else {
    res.render('contact', { isError: true, layout: 'main' });
  }

});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});