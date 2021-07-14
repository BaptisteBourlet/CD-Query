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
   let keyStr = '';
   let valueStr = '';

   Object.keys(req.body).forEach(key => {
      keyStr += `"${key}", `;
   })

   for (let i = 2; i <= Object.keys(req.body).length + 1; i++) {
      valueStr += `$${i}, `;
   }

   keyStr = keyStr.slice(0, -2)
   valueStr = valueStr.slice(0, -2);

   const getMaxIdQuery = {
      text: 'SELECT MAX(id) FROM "Reports";',
      values: []
   }

   try {
      let result = await client.query(getMaxIdQuery);
      let nextID = result.rows[0].max + 1;

      const insertQuery = {
         text: `INSERT INTO "Reports" ("id", ${keyStr}) VALUES ($1, ${valueStr})`,
         values: [nextID, ...Object.values(req.body)]
      }

      client.query(insertQuery)
         .then(response => {
            res.status(200).send('record inserted successfully');
         })
         .catch(err => {
            res.status(501).send('something wrong, please contact your IT team');
            console.error(err)
         })
   } catch (err) {
      res.status(501).send('something wrong, please contact your IT team');
      console.error(err)
   }
}



// =======================================================
//          /api/addUserGroup - POST
// =======================================================

exports.addUserGroup = async (req, res) => {
   const { userID, userGroup, mainTheme, welcomeScreen } = req.body;
   const checkQuery = {
      text: 'select "UserID" from "UserGroup" where "UserID"= $1',
      values: [userID]
   }

   try {
      let checkRes = await client.query(checkQuery);

      if (checkRes.rowCount === 0) {
         const query = {
            text: 'INSERT INTO "UserGroup" ("UserID", "UserGroup", "MainTheme", "WelcomeScreen") VALUES($1, $2, $3, $4);',
            values: [userID, userGroup, mainTheme, welcomeScreen],
         }

         client.query(query)
            .then(response => {
               res.status(200).send(userID + ' added to user group');
            })
            .catch(err => {
               res.status(501).send(`request failed, please contact your IT team`);
            });
      } else {
         res.status(404).send('Exists');
      }
   } catch (err) {
      res.status(501).send(`request failed, please contact your IT team`);
   }
}

// =======================================================
//          /api/addGroupReport - POST
// =======================================================

exports.addGroupReport = async (req, res) => {
   const { userGroup, reportID } = req.body;

   const insertQuery = {
      text: 'INSERT INTO "GroupReportLink" ("UserGroup", "Report") VALUES ($1, $2);',
      values: [userGroup, reportID]
   }

   try {
      let result = await client.query(insertQuery);

      if (result.rowCount === 1) {
         res.status(200).send('added to Group - Report link')
      } else {
         res.status(501).send('unable to add to Group - Report link');
      }
   } catch (err) {
      res.status(500).send('failed')
   }
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