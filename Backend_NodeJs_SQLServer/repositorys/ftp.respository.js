const sql = require("mssql");
const dbContext = require("../database/dbContext");

async function cbsImport(data) {
  const table = new sql.Table("TBLImportFromCBS");
  table.columns.add("receive_date", sql.DateTime, { nullable: true });
  table.columns.add("filename", sql.VarChar(50), { nullable: true });
  table.columns.add("id_cbd", sql.VarChar(50), { nullable: true });
  table.columns.add("transaction_date", sql.VarChar(10), {
    nullable: true,
  });
  table.columns.add("beginning_balance", sql.VarChar(50), {
    nullable: true,
  });
  table.columns.add("ending_balance", sql.VarChar(50), { nullable: true });
  table.columns.add("cash_id", sql.VarChar(50), { nullable: true });
  table.columns.add("cash_out", sql.VarChar(50), { nullable: true });
  table.columns.add("ship_in", sql.VarChar(50), { nullable: true });
  table.columns.add("ship_out", sql.VarChar(50), { nullable: true });

  // Add data to the table
  for (const item of data) {
    table.rows.add(
      new Date(item[0]),
      item[1],
      item[2],
      item[3],
      item[4],
      item[5],
      item[6],
      item[7],
      item[8],
      item[9]
    );
  }

  let result = await dbContext.executeBulk(table);
  return result;
}

async function b24Import(data) {
  const table = new sql.Table("TBLImportFromBase24");
  table.columns.add("receive_date", sql.DateTime, { nullable: true });
  table.columns.add("filename", sql.VarChar(50), { nullable: true });
  table.columns.add("term_id", sql.VarChar(50), { nullable: true });
  table.columns.add("transaction_date", sql.VarChar(50), {
    nullable: true,
  });
  table.columns.add("enomination_code", sql.VarChar(50), {
    nullable: true,
  });
  table.columns.add("beginning_balance", sql.VarChar(50), { nullable: true });
  table.columns.add("ending_balance", sql.VarChar(50), { nullable: true });
  table.columns.add("ship_in", sql.VarChar(50), { nullable: true });
  table.columns.add("ship_out", sql.VarChar(50), { nullable: true });
  table.columns.add("cash_out", sql.VarChar(50), { nullable: true });

  // Add data to the table
  for (const item of data) {
    table.rows.add(
      new Date(item[0]),
      item[1],
      item[2],
      item[3],
      item[4],
      item[5],
      item[6],
      item[7],
      item[8],
      item[9]
    );
  }

  let result = await dbContext.executeBulk(table);
  return result;
}

module.exports = {
  cbsImport,
  b24Import
};
