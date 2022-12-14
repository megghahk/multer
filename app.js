const express = require("express")
const ejs = require('ejs')
const multer = require('multer')
const path = require('path')
const app = express()

const port = process.env.PORT || 8080

//disk storage and multer setup
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,

}).single('profilepic')


//set up  for ejs
app.set('view engine', 'ejs')

//static folder
app.use(express.static('./public'))// current dir to public



app.get('/', (req, res) => {
    res.render("index") //ejs filename
})

//description 
app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render("index", {
                message: error
            });
        } else {
            res.render("index", {
                message: "Successfully uploaded...",
                filename: `myupload/${req.file.filename}`
            });
        }

    })
})


app.listen(port, () => {
    console.log(`sever is running in the port ${port}`)
})