const express = require('express');
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express();
const port = process.env.PORT;


//habilitamos el poder leer los valores de un body 
app.use( express.json() )
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('listening on port', port);
})

// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 10000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docxs)$/)){
//             return cb(new Error('Please upload a doc'))
//         }
//         cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send('saved')
// })