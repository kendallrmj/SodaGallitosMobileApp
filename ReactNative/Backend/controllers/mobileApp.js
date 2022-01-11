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
        .execute('deleteOrder')
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
    
    return res.send(200)
  }catch (err) {
    console.log("Create order error: ", err)
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


/*
    var idDishes = [1]
    var idExtras = [1]
    var dishes = new sql.Table();
    var extras = new sql.Table();
    dishes.columns.add('IdElement', sql.Int);  
    extras.columns.add('IdElement', sql.Int);
    idDishes.forEach(function(element, index, array) {
      dishes.rows.add(element);
    })
    idExtras.forEach(function(element, index, array) {
      extras.rows.add(element);
    })
    var idOrder=orderResult.recordset[0].Id
    await pool.request()
        .input('pExtraList',  extras)
        .input('pDishList', dishes)
        .input('pIdOrder', sql.Int, idOrder)
        .execute('addDishAndExtraPerOrder')
    
    //
*/