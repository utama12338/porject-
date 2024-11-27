var config = require("../database/dbconfig");
const sql = require("mssql");
const dbContext =  require("../database/dbContext");

async function getUser(params) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("username", sql.VarChar, params.username)
      .query(`SELECT us.id AS userId, us.username,us.firstname AS name,
      uif.id AS unitId, uif.unit_name AS unitName, uif.branch_org64 AS branchOrg64,
      uif.cost_center AS costCenter, uif.cash_center AS cashCenter, 
      uif.unit_type_id AS unitTypeId, ut.unit_name AS unitTypeName, us.position
      FROM TBLUsers us
      LEFT JOIN TBLUnitInformation uif ON us.id = uif.id AND uif.unit_active = 1
      LEFT JOIN TBLUnitType ut ON uif.unit_type_id = ut.id AND ut.unit_active = 1
      WHERE LOWER(us.username) = LOWER(@username);`
      );
    
    // return product.recordsets;
    return user.recordsets;

  } catch (error) {
    console.log("Find user is error : " ,errorr);
  }
}

async function addUser(params) {
  // Create a connection pool
  const pool = new sql.ConnectionPool(config);

  // Connect to the database
  pool
    .connect()
    .then(() => {
      console.log("Connected to MSSQL database");

      // Insert query
      const insertQuery = `
      INSERT INTO TBLUsers(username, firstname, unitname, fullcode64, role_id, position, active_status, unitid)
      VALUES(@username, @firstname, @unitname, @fullcode64, @roleId, @position, @activeStatus, @unitId);
    `;

      // Execute the insert query
      pool
        .request()
        .input("username", sql.VarChar, params.userName)
        .input("firstname", sql.VarChar, params.firstName)
        .input("unitname", sql.VarChar, params.unitName)
        .input("fullcode64", sql.VarChar, params.org64)
        .input("roleId", sql.Int, params.roleId)
        .input("position", sql.VarChar, params.position)
        .input("activeStatus", sql.Int, 1)
        .input("unitId", sql.Int, params.unitId)
        .query(insertQuery)
        .then((result) => {
          console.log("Rows affected:", result.rowsAffected);
          
        })
        .catch((err) => {
          console.error("Error executing insert query:", err);
        })
        .finally(() => {
          // Close the connection when done
          pool.close();
          return true;
        });
    })
    .catch((err) => {
      console.error("Error connecting to MSSQL database:", err);
    });
}

async function findMenuByUser(params){
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("username", sql.VarChar, params.username)
      .query(
        `select m.id as menuId,
        m.menu_name as menuName,
        m.menu_routes as menuRole,
        m.menu_sort as menuSort
        from TBLUsers u
        left join TBLRole r on u.role_id = r.id and r.active_status = 1
        left join TBLRoleXMenu rm on r.id = rm.role_id and rm.role_x_menu_active = 1
        left join TBLMenu m on rm.menu_id = m.id and m.menu_active = 1
        where LOWER(u.username) = LOWER(@username) and u.active_status = 1;`
      );
    
    // return product.recordsets;
    return user.recordsets;

  } catch (error) {
    console.log("Find user is error : " ,errorr);
  }
}

async function findRoleByUser(params){
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("username", sql.VarChar, params.username)
      .query(
        `select r.id as roleId,
        r.role_code as roleCode,
        r.role_name as roleName
        from TBLUsers u 
        left join TBLRole r on u.role_id = r.id and r.active_status = 1
        where LOWER(u.username) = LOWER(@username) and u.active_status = 1;`
      );
    
    // return product.recordsets;
    return user.recordsets;

  } catch (error) {
    console.log("Find user is error : " ,errorr);
  }
}

async function checkUserDup(params){
  const query = `select username from TBLUsers where LOWER(username) = LOWER(@1) and active_status = 1 ;`;
  let result = await dbContext.executeWihtParams(query, params);
  return result;
}


async function register(params){
  const query = `INSERT INTO TBLUsers (username,firstname,unitname,fullcode64,active_status)
  VALUES(@1,@2,@3,@4,1);`;
  let result = await dbContext.executeInsert(query, params);
  return result;
}

async function findUser(params){
  let query = `select u.id as idH, u.username as userName, u.firstname as name,
  r.id as roleId, r.role_code as roleCode, r.role_name as roleName,
  unf.id as unitId, unf.unit_name as unitName, u.active_status as activeStatus, 
  u.fullcode64 as org64, u.unitname as unitNameFromUser, u.position
  from TBLUsers u
  left join TBLRole r on u.role_id = r.id and r.active_status = 1
  left join TBLUnitInformation unf on u.unitid = unf.id and unf.unit_active = 1
  where 1=1 `

  if(params.userName){
    query += `and u.username like '%${params.userName}%' `
  }

  if(params.name){
    query += `and u.firstname like '%${params.name}%' `
  }

  if(params.unitName){
    query += `and unf.unit_name like '%${params.unitName}%' `
  }

  if(params.roleId !== 0){
    query += `and  r.id = ${params.roleId} `
  }

  if(params.activeStatus){
    query += `and u.active_status = ${params.activeStatus} `
  }

  let result = await dbContext.executeList(query);
  return result;

}

async function updateUser(params){
  const query = `UPDATE TBLUsers SET 
  username = @1, firstname = @2, unitname = @3, fullcode64 = @4,
  role_id = @5, active_status = @6, unitid = @7, position = @8 WHERE id = @9;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function deleteUser(params){
  const query = `UPDATE TBLUsers SET active_status = 0 WHERE id = @1;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

module.exports = {
  getUser,
  addUser,
  findMenuByUser,
  findRoleByUser,
  checkUserDup,
  register,
  findUser,
  updateUser,
  deleteUser,
};
