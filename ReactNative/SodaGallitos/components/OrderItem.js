import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTable } from "../api";

const OrderItem = ({ order, handleDelete }) => {
  const navigation = useNavigation();
/*  
  const [table, setTable] = useState({
    name: ""
  });  

  const getTableName = async () => {
    try {
      const table = await getTable();
      setTable(table)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableName();
    //console.log("called");
  }, [isFocused]);
*/

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen", { id: order.id })}
      >
        <Text style={styles.itemTitle}>{order.Id}</Text>
        <Text style={{ color: "#8395a7" }}>{order.Fecha}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
        onPress={() => handleDelete(order.id)}
      >
        <Text style={{ color: "#fff" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  itemTitle: {
    color: "#ffffff",
  },
});
export default OrderItem;
