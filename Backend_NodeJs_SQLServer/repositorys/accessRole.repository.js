const sql = require("mssql");
var config = require("../database/dbconfig");
const helperService = require("../services/helper.service");
const dbContext = require("../database/dbContext");

async function addRole(params) {
  const query = `INSERT INTO TBLRole(role_code, role_name, active_status, role_desc)
  VALUES(@1, @2, 1, @3);`;
  let result = await dbContext.executeInsert(query, params);
  return result;
}

async function updateRole(params) {
  const query = `
  UPDATE TBLRole 
  SET role_code = @1, 
  role_name = @2, 
  active_status = @3,
  role_desc = @5
  where id = @4;
  `;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function getRole() {
  const query = `select id as value, CONCAT(role_code,' ' ,role_desc) as name from TBLRole  where active_status = 1 order by role_code;`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getRoleAndMenuByRoleId(params) {
  let query = `select r.id as roleId, r.role_code as roleCode, r.role_name as roleName, 
  m.id as menuId, m.menu_name as menuName
  from TBLRole r 
  left join TBLRoleXMenu rxm on r.id = rxm.role_id and rxm.role_x_menu_active = 1
  left join TBLMenu m on m.id = rxm.menu_id and m.menu_active = 1
  where 1=1 and r.active_status = 1 `;

  if (params.roleId !== 0) {
    query += `and  r.id = ${params.roleId} `;
  }

  let result = await dbContext.executeList(query);
  return result;
}

async function deleteRole(params) {
  const query = ` UPDATE TBLRole set active_status = 0 where id = @1;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

async function getLastRoleCode() {
  const query = `select top 1 SUBSTRING(role_code,2,4) as lastRoleCode 
  from TBLRole 
  where active_status = 1 
  order by role_code desc`;
  let result = await dbContext.execute(query);
  return result;
}

async function getRoleById(params) {
  let query = `select id as roleId, role_code as roleCode,
  role_name as roleName, role_desc as roleDesc, active_status as activeStatus
  from TBLRole where active_status = 1 `;

  if (params.roleId) {
    query += `and id = ${params.roleId} `;
  }

  query += `order by role_code asc ;`;

  let result = await dbContext.executeList(query);
  return result;
}

async function getMenu() {
  const query = `select id as value, menu_name as name from TBLMenu 
  where menu_active = 1`;
  let result = await dbContext.executeList(query);
  return result;
}

async function getMenuAndRoleByMenuId(params) {
  let query = `select  m.id as menuId, m.menu_name as menuName,
  r.id as roleId, r.role_code as roleCode, r.role_name as roleName
  from TBLMenu m
  left join TBLRoleXMenu rxm on rxm.menu_id = m.id and rxm.role_x_menu_active = 1
  left join TBLRole r on r.id = rxm.role_id  and r.active_status  = 1
  where m.menu_active = 1 `;

  if (params.menuId) {
    query += `and  m.id = ${params.menuId} `;
  }

  query += `order by m.menu_type_id,m.menu_name,r.role_code `;

  let result = await dbContext.executeList(query);
  return result;
}

async function addRoleAndMenu(params) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    let query = `insert into TBLRoleXMenu (role_id,menu_id,role_x_menu_active)
    values(@1,@2,1);`;
    let rowsuccess = 0;
    for (const item of params.menu) {
      const result = await pool
        .request()
        .input("1", sql.Int, params.roleId)
        .input("2", sql.Int, item.menuId)
        .query(query);

      console.log(
        `Insert INTO TBLRoleXMenu is Rows affected: ${result.rowsAffected}`
      );
      rowsuccess += parseInt(result.rowsAffected);
    }

    // Close the connection pool
    pool.close();

    return helperService.responseResult(
      "success",
      "OK",
      rowsuccess,
      rowsuccess
    );
  } catch (error) {
    console.error("Error executing insert into TBLRoleXMenu:", error);
    return helperService.responseResult(
      "error",
      "Database error executing insert into TBLRoleXMenu:" + error,
      0,
      []
    );
  }
}

async function deleteRoleAndMenu(params) {
  const query = `update TBLRoleXMenu set role_x_menu_active = 0 where role_id = @1;`;
  let result = await dbContext.executeUpdate(query, params);
  return result;
}

module.exports = {
  addRole,
  updateRole,
  getRole,
  getRoleAndMenuByRoleId,
  deleteRole,
  getLastRoleCode,
  getRoleById,
  getMenu,
  getMenuAndRoleByMenuId,
  addRoleAndMenu,
  deleteRoleAndMenu,
};
