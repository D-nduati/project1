const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const { profileroute } = require('./routescontrollers/profilerouter');
const {usersroute} = require('./routescontrollers/usersroutes')
const{devmilesroute} =require('./routescontrollers/devmilesroutes') 




app.use('/users', usersroute);
app.use('/profileroute' ,profileroute);
app.use('/devmiles',devmilesroute)

const port = 4040;
app.listen(port, () => console.log(`Server started on port ${port}`));




