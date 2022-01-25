import { config } from "../config.js";
import sql from "mssql/msnodesqlv8.js";


//orders
export const getOrders = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool.request().execute('getOrders')
    let rows=results.recordset
    return res.json(rows)
  }catch (err) {
    console.log("Get orders error: ", err)
  }
};

export const deleteOrder = async (req, res) =>{
  try {
    let pool = await sql.connect(config);
    await pool.request()
        .input('pIdOrder', sql.Int, req.params.id)
        .execute('DeleteOrder')
  } catch (err) {
    console.log("Delete order error: ", err)
  }
}
  
export const saveOrder = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let orderResult = await pool.request()
        .input('pIdMesa', sql.Int, req.body.table)
        .input('pResponsableCreacion', sql.Int, req.body.user)
        .input('pNota', sql.NVarChar, req.body.note)
        .execute('addOrder')        


    var ids={
      "Adicionales":req.body.extras,
      "Platillos":req.body.dishes
    }
    let data = JSON.stringify(ids);    
    var idOrder=orderResult.recordset[0].Id
    await pool.request()
        .input('pExtraAndDishList', sql.NVarChar, data)
        .input('pIdOrder', sql.Int, idOrder)
        .execute('addDishAndExtraPerOrder')    
    return res.json(idOrder)
  }catch (err) {
    console.log("Create order error: ", err)
    return res.sendStatus()
  }
}


//Login
export const login = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
        .input('pUserName', sql.NVarChar, req.body.username)
        .input('pPassword', sql.NVarChar, req.body.password)
        .execute('login')
    return res.json(result.recordset)
  }catch (err) {
    console.log("Login error: ", err)
    return res.sendStatus()
  }
}

//tables
export const getTable = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
        .input('pIdTable', sql.Int, req.params.id)
        .execute('getTable')
    return res.json(result.recordset[0])
  } catch (err) {
    console.log("Get table error: ", err)
  }
};

export const getTables = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool.request().execute('getTables')
    return res.json(results.recordset)
  }catch (err) {
    console.log("Get tables error: ", err)
  }
};

//dishes
export const getDishes = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool.request().execute('getDishes')
    return res.json(results.recordset)
  }catch (err) {
    console.log("Get dishes error: ", err)
  }
};

//extras
export const getExtras = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool.request().execute('getExtras')
    return res.json(results.recordset)
  }catch (err) {
    console.log("Get extras error: ", err)
  }
};


