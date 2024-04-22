const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const { profileroute } = require('./routescontrollers/profilerouter');
const { usersroute } = require('./routescontrollers/usersroutes');
const { devmilesroute } = require('./routescontrollers/devmilesroutes');
const { notify } = require('./routescontrollers/notificationsrouter');
const router = require('./routescontrollers/medicalroutes');
const {adminroute}= require('./routescontrollers/adminroutes')
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
// Admin-only route example
app.get('/admin/dashboard', verifyToken, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  // If user is admin, serve admin dashboard
  res.json({ message: 'Admin dashboard' });
});

// Other routes
app.use('/users', usersroute);
app.use('/profileroute', profileroute);
app.use('/devmiles', devmilesroute);
app.use('/notify', notify);
app.use('/api', router);
app.use('/admin', adminroute);


// File upload route
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


