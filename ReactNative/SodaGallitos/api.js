const API_O = "http://192.168.193.103:3000/orders";
const API_T = "http://192.168.193.103:3000/tables";
const API_D = "http://192.168.193.103:3000/dishes";
const API_E = "http://192.168.193.103:3000/extras";

//Orders
export const saveOrder = async (newOrder) => {
  const res = await fetch(API_O, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });
  return await res.json();
};


export const deleteOrder = async (id) => {
  await fetch(`${API_O}/${id}`, {
    method: "DELETE",
  });
};

export const getOrders = async () => {
  const res = await fetch(API_O, {
    method: "GET",
  });
  return await res.json();
};

//Tables
export const getTables = async () => {
  const res = await fetch(API_D, {
    method: "GET",
  });
  return await res.json();
};

export const getTable = async (tableId) => {
  const res = await fetch(`${API_T}/${tableId}`);
  return await res.json();
};

//Dishes
export const getDishes = async () => {
  const res = await fetch(API_D, {
    method: "GET",
  });
  return await res.json();
};

//Extras
export const getExtras = async () => {
  const res = await fetch(API_E, {
    method: "GET",
  });
  return await res.json();
};