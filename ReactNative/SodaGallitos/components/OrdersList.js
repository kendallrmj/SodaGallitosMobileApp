import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteOrder, getOrders } from "../api";
import OrderItem from "./OrderItem";

const OrdersList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const dt = [
    {
      "Id": "Mesa #1",
      "Fecha": "2022-01-09 18:13",
      "IdMesa": 1,
      "Estado": 1,
      "TipoArregloPrecio": null,
      "ValorArregloPrecio": null,
      "NotaArregloPrecio": null,
      "ResponsableCreacion": 1,
      "Nota": null
    },
    {
      "Id": "Mesa #2",
      "Fecha": "2022-01-10 10:12",
      "IdMesa": 1,
      "Estado": 1,
      "TipoArregloPrecio": null,
      "ValorArregloPrecio": null,
      "NotaArregloPrecio": null,
      "ResponsableCreacion": 1,
      "Nota": null
    },
    {
      "Id": "Mesa #4",
      "Fecha": "2022-01-10 10:14",
      "IdMesa": 2,
      "Estado": 1,
      "TipoArregloPrecio": null,
      "ValorArregloPrecio": null,
      "NotaArregloPrecio": null,
      "ResponsableCreacion": 1,
      "Nota": "Sin olores                                                                                          "
    },
    {
      "Id": "Mesa Exterior",
      "Fecha": "2022-01-10 10:37",
      "IdMesa": 2,
      "Estado": 1,
      "TipoArregloPrecio": null,
      "ValorArregloPrecio": null,
      "NotaArregloPrecio": null,
      "ResponsableCreacion": 1,
      "Nota": "Sin picante                                                                                         "
    }
  ]

  const getUsers = async () => {
    try {
      console.log("getUsers");
      const orders = await getOrders();
      //setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await getUsers();
    setRefreshing(false);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Eliminar orden", "¿Estas seguro de eliminar la orden?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          await deleteOrder(id);
          await getUsers();
        },
      },
    ]);
  };

  useEffect(() => {
    getUsers();
    console.log("called");
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <OrderItem order={item} handleDelete={handleDelete} />
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={dt}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
};

export default OrdersList;
