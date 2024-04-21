const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const { profileroute } = require('./routescontrollers/profilerouter');
const {usersroute} = require('./routescontrollers/usersroutes')
const{devmilesroute} =require('./routescontrollers/devmilesroutes') 
 const {notify} =require ('./routescontrollers/notificationsrouter')
 const router = require('./routescontrollers/medicalroutes');


app.use('/users', usersroute);
app.use('/profileroute' ,profileroute);
app.use('/devmiles',devmilesroute)
app.use('/notify', notify);
app.use('/api', router);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully' });
});


const port = 4040;
app.listen(port, () => console.log(`Server started on port ${port}`));




