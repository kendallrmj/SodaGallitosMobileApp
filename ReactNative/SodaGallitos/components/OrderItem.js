import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from '../core/theme'

const OrderItem = ({ order, handleDelete }) => {
  const navigation = useNavigation();



  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen", { id: order.id })}
      >
        <Text style={styles.itemTitle}>{order.NombreMesa}</Text>
        <Text style={{ color: theme.colors.text }}>{order.Fecha}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: theme.colors.error, padding: 7, borderRadius: 5 }}
        onPress={() => handleDelete(order.Id)}
      >
        <Text style={{ color: theme.colors.primary }}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FBF3DF",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  itemTitle: {
    color: theme.colors.text,
  },
});
export default OrderItem;
