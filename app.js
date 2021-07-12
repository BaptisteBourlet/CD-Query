const express = require('express');
const appRoutes = require('./routes/app-routes');
app = express();
PORT = 3000;

app.use(express.json());
app.use('/api', appRoutes);


app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})
