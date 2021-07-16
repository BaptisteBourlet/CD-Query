
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


exports.ReportOverview = async (req, res) => {
   const query = {
      text: 'SELECT "ReportName", "description" FROM "Reports" ORDER BY "id";',
      values: []
   }

   let result = await client.query(query);

   let finalResults = result.rows;
   res.render('./reports/overview', { finalResults });
}


exports.ReportEntry = async (req, res) => {
   res.render('./reports/entry');
}

exports.ReportEdit = async (req, res) => {
   const query = {
      text: 'SELECT * FROM "Reports" WHERE "ReportName" = $1;',
      values: [req.query.ReportName]
   }

   let result = await client.query(query)
   let finalResult = result.rows[0];
   res.render('./reports/edit', { finalResult });
}

// ================================================

exports.UserGroupOverview = async (req, res) => {
   const query = {
      text: 'SELECT * FROM "UserGroup" ORDER BY "UserGroup";',
      values: []
   }
   let result = await client.query(query);
   let finalResults = result.rows;
   res.render('./userGroup/overview', { finalResults });
}


exports.UserGroupEntry = async (req, res) => {
   res.render('./userGroup/entry');
}

exports.UserGroupEdit = async (req, res) => {
   let data = req.query

   res.render('./userGroup/edit', { data });
}




// ================================================

exports.UserGroupLinkOverview = async (req, res) => {
   const query = {
      text: 'SELECT * FROM "GroupReportLink" ORDER BY "UserGroup";',
      values: []
   }

   let results = await client.query(query);
   let finalResults = results.rows;

   res.render('./groupReportLink/overview', { finalResults });
}


exports.UserGroupLinkEntry = async (req, res) => {
   res.render('./groupReportLink/entry');
}

exports.UserGroupLinkEdit = async (req, res) => {
   let data = req.query

   res.render('./groupReportLink/edit', { data });
}