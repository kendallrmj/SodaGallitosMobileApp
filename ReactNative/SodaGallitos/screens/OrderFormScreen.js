import React, { useEffect, useState } from "react";
import {  StyleSheet } from "react-native";
import { saveOrder,getTables, getDishes, getExtras } from "../api";
import { useIsFocused } from "@react-navigation/native";
import Layout from "../components/Layout";
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button'
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'

const OrderFormScreen = ({ navigation, route }) => {
  const [tables, setTables] = useState([]);  
  const [dishes, setDishes] = useState([]);  
  const [extras, setExtras] = useState([]);      
  const isFocused = useIsFocused();
  const loadTables = async () => {
    try {
      console.log("getTables");
      const tables = await getTables();
      setTables(tables);
    } catch (error) {
      console.log(error);
    }
  };  
  const loadDishes = async () => {
    try {
      console.log("getDishes");
      const dishes = await getDishes();
      setDishes(dishes);
     } catch (error) {
      console.log(error);
    }
  };  
  const loadExtras = async () => {
    try {
      console.log("getExtras");
      const extras = await getExtras();
      setExtras(extras);
    } catch (error) {
      console.log(error);
    }
  };    
  const [selectedTable, setSelectedTable] = useState({})
  const [selectedDishes, setSelectedDishes] = useState([])
  const [selectedExtras, setSelectedExtras] = useState([])  

  const [order, setOrder] = useState({
    table: "",
    user: "",
    note: "",
    extras: [],
    dishes: []
  });

  const [editing] = useState(false);


  function addExtras(item) {
    order.extras.push(item.id);
  }
  function addDishes(item) {
    order.dishes.push(item.id);
  }
  
  const handleSubmit = async () => {
    try {
      order.table=selectedTable.id.toString();
      selectedDishes.forEach(addDishes);
      selectedExtras.forEach(addExtras);
      order.user = await AsyncStorage.getItem('@id');
//      console.log(order)
      await saveOrder(order);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setOrder({ ...order, [name]: value });

  function onMultiChangeDishes() {
    return (item) => setSelectedDishes(xorBy(selectedDishes, [item], 'id'))
  }
  function onMultiChangeExtras() {
    return (item) => setSelectedExtras(xorBy(selectedExtras, [item], 'id'))
  }
  function onChangeTable() {   
    return (val) => setSelectedTable(val)
  }

  useEffect(() => {
    loadTables();
    loadDishes();
    loadExtras();
    console.log("load");
  }, [isFocused]);

  return (
    <Layout>
      
      <SelectBox
        inputPlaceholder=" "
        label="Seleccione la mesa"
        labelStyle={{fontWeight: 'bold', color: theme.colors.secondary,fontSize:18,textAlign:"center"}}
        containerStyle={styles.container}
        optionContainerStyle={styles.container}
        optionsLabelStyle={styles.text}
        inputFilterContainerStyle={styles.container}
        inputFilterStyle={styles.text}
        selectedItemStyle={styles.text}
        arrowIconColor={theme.colors.secondary}
        searchIconColor={theme.colors.secondary}
        options={tables}
        value={selectedTable}
        onChange={onChangeTable()}        
        hideInputFilter={false}
      />

      <SelectBox
        inputPlaceholder=" "
        label="Seleccione los platillos"
        labelStyle={{fontWeight: 'bold', color: theme.colors.secondary,fontSize:18,textAlign:"center"}}
        containerStyle={styles.container}
        optionContainerStyle={styles.container}
        optionsLabelStyle={styles.text}        
        multiOptionsLabelStyle = {styles.multitext}
        multiOptionContainerStyle	={styles.multicontainer}        
        inputFilterContainerStyle={styles.container}
        inputFilterStyle={styles.text}        
        options={dishes}
        selectedValues={selectedDishes}
        onMultiSelect={onMultiChangeDishes()}
        onTapClose={onMultiChangeDishes()}
        arrowIconColor={theme.colors.secondary}
        searchIconColor={theme.colors.secondary}
        toggleIconColor={theme.colors.secondary}
        isMulti
      />      
      
      <SelectBox
        inputPlaceholder=" "
        label="Seleccione los adicionales"
        labelStyle={{fontWeight: 'bold', color: theme.colors.secondary,fontSize:18,textAlign:"center"}}
        containerStyle={styles.container}
        optionContainerStyle={styles.container}
        optionsLabelStyle={styles.text}        
        multiOptionsLabelStyle = {styles.multitext}
        multiOptionContainerStyle	={styles.multicontainer}
        inputFilterContainerStyle={styles.container}
        inputFilterStyle={styles.text}
        options={extras}
        selectedValues={selectedExtras}        
        onMultiSelect={onMultiChangeExtras()}
        onTapClose={onMultiChangeExtras()}
        arrowIconColor={theme.colors.secondary}
        searchIconColor={theme.colors.secondary}
        toggleIconColor={theme.colors.secondary}
        isMulti
      />      
      <TextInput
        label="Nota"
        returnKeyType="done"
        value={order.note}
        onChangeText={(text) => handleChange("note", text)}
      />

      <Button mode="contained" onPress={handleSubmit}>
        Nueva Orden
      </Button>
    </Layout>
  );
};


const styles = StyleSheet.create({
  text:{
    fontWeight: 'bold', 
    color: theme.colors.text,
    fontSize:16
  },
  multitext: {
    color: theme.colors.primary,
    fontSize:14,    
  },
  container: {
    width: '85%', 
    margin: 20,
  },
  multicontainer: {
    height: 28,
    marginVertical: 2,
    backgroundColor: theme.colors.secondary
  }  
});

export default OrderFormScreen;
