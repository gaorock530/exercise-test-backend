const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage}).any()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.static(__dirname + '/uploads'))

app.listen(PORT, e => e || console.log('Exercise Backend server is running on PORT：' + PORT))

app.post('/upload', upload, async (req, res) => {
  await console.log(req.files)
  return res.status(200).json({files: req.files.map(file => {
    return {
      ...file,
      path: `http://localhost:5000/${file.filename}`
    }
  })})
})
