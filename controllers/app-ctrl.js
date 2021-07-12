const { Pool, Client } = require('pg');
const { DB } = require('../DB_credentials');

const client = new Client({
   user: DB.user,
   host: DB.host,
   database: DB.database,
   password: DB.password,
   port: DB.port,
})

client.connect();


// =======================================================
//          /api/addReport - POST
// =======================================================

exports.addReport = async (req, res) => {
   res.send('add reports');
}


// =======================================================
//          /api/addUserGroup - POST
// =======================================================

exports.addUserGroup = async (req, res) => {
   const { userID, userGroup, mainTheme, welcomeScreen } = req.body;

   const query = {
      text: 'INSERT INTO "UserGroup" ("UserID", "UserGroup", "MainTheme", "WelcomeScreen") VALUES($1, $2, $3, $4);',
      values: [userID, userGroup, mainTheme, welcomeScreen],
   }

   client.query(query)
      .then(response => {
         res.status(200).send(userID + ' added to user group');
      })
      .catch(err => {
         res.send(`request failed, please contact your IT team`);
      });
}

// =======================================================
//          /api/addGroupReport - POST
// =======================================================

exports.addGroupReport = async (req, res) => {
   console.log('add group report');
}


// =======================================================
//          /api/getuserGroup - GET
// =======================================================

exports.getUserGroup = async (req, res) => {
   const query = {
      text: 'SELECT * FROM "UserGroup";',
      values: [],
   }

   client.query(query)
      .then(response => {
         res.status(200).json(response.rows);
      })
      .catch(err => {
         console.log(err);
         res.send(`request failed, please contact your IT team`);
      });
}