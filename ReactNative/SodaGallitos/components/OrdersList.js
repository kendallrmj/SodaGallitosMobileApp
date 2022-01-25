import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteOrder, getOrders } from "../api";
import OrderItem from "./OrderItem";

const OrdersList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const loadOrders = async () => {
    try {
      console.log("loadOrders");
      const orders = await getOrders();
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await loadOrders();
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
          await loadOrders();
        },
      },
    ]);
  };

  useEffect(() => {
    loadOrders();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <OrderItem order={item} handleDelete={handleDelete} />
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={orders}
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
