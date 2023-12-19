const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT||5000
// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: true,
// }))

app.use(cors());  // use cors
app.use(express.json());  // parse requests yang berupa json
app.use(express.urlencoded({ extended: true }));  // parse requests yang berupa form data

// panggil routes
app.use("/user", require('./routes/user-route'));
app.use("/gambar", require('./routes/gambar-route'));
app.use('/postingan', require('./routes/postingan-route'))

// halaman root
app.get('/', (req, res) => {
    res.send('Haloo')
  })

app.listen(port, () => {
    console.log(`ScanScience API listening on http://localhost:${port}`)
  })
