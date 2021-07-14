const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api-routes');
const viewRoutes = require('./routes/view-routes');
app = express();
PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);
app.use('/view', viewRoutes);


app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})
