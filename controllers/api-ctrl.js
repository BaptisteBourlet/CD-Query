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

   try {
      const checkQuery = {
         text: 'SELECT "ReportName" FROM "Reports" WHERE "ReportName" = $1;',
         values: [req.body.ReportName]
      }

      let checkResult = await client.query(checkQuery);

      if (checkResult.rowCount === 0) {
         const getMaxIdQuery = {
            text: 'SELECT MAX(id) FROM "Reports";',
            values: []
         }

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
      } else {
         res.status(404).send('Report Name already exists!');
      }
   } catch (err) {
      res.status(501).send('something wrong, please contact your IT team');
      console.error(err)
   }
}


exports.editReport = async (req, res) => {
   let updateStr = '';
   let columns = Object.keys(req.body);
   let updatedValues = Object.values(req.body);

   for (let i = 0; i < columns.length; i++) {
      updateStr += `"${columns[i]}" = $${i + 1}, `;
   }

   updateStr = updateStr.slice(0, -2);

   const editQuery = {
      text: `UPDATE "Reports" SET ${updateStr} WHERE "ReportName" = $1;`,
      values: [...updatedValues]
   }

   try {
      let result = await client.query(editQuery);

      if (result.rowCount === 1) {
         console.log('ok');
         res.status(200).send('Report edited successfully');
      } else {
         res.status(404).send('unable to edit Report');
      }
   } catch (err) {
      res.status(501).send(`request failed, please contact your IT team`);
   }
}



exports.deleteReport = async (req, res) => {
   const { ReportName } = req.body;

   const deleteQuery = {
      text: 'DELETE FROM "Reports" WHERE "ReportName" = $1;',
      values: [ReportName]
   }

   try {
      let result = await client.query(deleteQuery);

      if (result.rowCount === 1) {
         res.status(200).send(`${ReportName} deleted successfully`);
      }

   } catch (err) {
      res.status(500).send('unable to delete Report');
      console.log(err)
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
//          /api/editUserGroup - POST
// =======================================================


exports.editUserGroup = async (req, res) => {
   const { userID, userGroup, mainTheme, welcomeScreen } = req.body;

   const editQuery = {
      text: 'UPDATE "UserGroup" SET "UserGroup" = $2 WHERE "UserID" = $1 AND "MainTheme" = $3 AND "WelcomeScreen" = $4;',
      values: [userID, userGroup, mainTheme, welcomeScreen]
   }

   let result = await client.query(editQuery);

   if (result.rowCount === 1) {
      res.status(200).send('edited successfully');
   } else {
      res.status(404).send('failed');
   }
}

// =======================================================
//          /api/deleteUserGroup - POST
// =======================================================

exports.deleteUserGroup = async (req, res) => {
   const { UserID, UserGroup, MainTheme, WelcomeScreen } = req.body;

   const deleteQuery = {
      text: 'DELETE FROM "UserGroup" WHERE "UserID" = $1 AND "UserGroup" = $2 AND "MainTheme" = $3 AND "WelcomeScreen" = $4',
      values: [UserID, UserGroup, MainTheme, WelcomeScreen]
   }

   let result = await client.query(deleteQuery);

   res.send('the hell')
}



// =======================================================
//          /api/addGroupReport - POST
// =======================================================

exports.addGroupReport = async (req, res) => {
   const { UserGroup, ReportID } = req.body;

   const checkQuery = {
      text: 'SELECT * FROM "GroupReportLink" WHERE "UserGroup" = $1 AND "Report" = $2;',
      values: [UserGroup, ReportID]
   }

   try {
      let checkResult = await client.query(checkQuery);

      if (checkResult.rowCount === 0) {
         const insertQuery = {
            text: 'INSERT INTO "GroupReportLink" ("UserGroup", "Report") VALUES ($1, $2);',
            values: [UserGroup, ReportID]
         }
         let result = await client.query(insertQuery);

         if (result.rowCount === 1) {
            res.status(200).send('added to Group - Report link')
         } else {
            res.status(501).send('unable to add to Group - Report link');
         }
      } else {
         res.status(404).send('Report Link already exists');
      }
   } catch (err) {
      res.status(500).send('failed')
   }
}


exports.editGroupReport = async (req, res) => {
   const { UserGroup, ReportID, oldReportID } = req.body;

   const editQuery = {
      text: 'UPDATE "GroupReportLink" SET "Report" = $2 WHERE "UserGroup" = $1 AND "Report" = $3',
      values: [UserGroup, ReportID, oldReportID]
   }

   try {
      let result = await client.query(editQuery);

      if (result.rowCount === 1) {
         res.status(200).send('Report Link edited successfully')
      } else {
         res.status(501).send('Unable to edit Report Link');
      }
   } catch (err) {
      res.status(500).send('failed')
   }
}


exports.deleteGroupReport = async (req, res) => {
   const { UserGroup, ReportID } = req.body;

   const deleteQuery = {
      text: 'DELETE FROM "GroupReportLink" WHERE "UserGroup" = $1 AND "Report" = $2',
      values: [UserGroup, ReportID]
   }

   try {
      let result = await client.query(deleteQuery);

      if (result.rowCount === 1) {
         res.status(200).send('Report Link deleted successfully')
      } else {
         res.status(501).send('Unable to delete Report Link');
      }
   } catch (err) {
      console.log(err)
   }
}