import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveOrder } from "../api";
import Layout from "../components/Layout";
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'


  
const OrderFormScreen = ({ navigation, route }) => {
  const [order, setOrder] = useState({
    mesa: "",
    platillos: "",
    adicionales: "",
    nota: "",
  });
  const [editing] = useState(false);

  const [selectedTable, setSelectedTable] = useState({})
  const [selectedDishes, setSelectedDishes] = useState([])
  const k_tables = [
    {
      item: 'Mesa #1',
      id: '1',
    },
    {
      item: 'Mesa #2',
      id: '2',
    },
    {
      item: 'Mesa #3',
      id: '3',
    },
    {
      item: 'Mesa #4',
      id: '4',
    },
    {
      item: 'Mesa Exterior',
      id: '5',
    }        
  ]

  const k_dishes = [
    {
      item: 'Arroz con pollo',
      id: '1',
    },
    {
      item: 'Gallo Pinto',
      id: '2',
    },
    {
      item: 'Ceviche',
      id: '3',
    }
  ]

  const handleSubmit = async () => {
    try {
      await saveOrder(order);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setOrder({ ...order, [name]: value });

  function onMultiChange() {
    return (item) => setSelectedDishes(xorBy(selectedDishes, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTable(val)

  }

  return (
    <Layout>
      
      <SelectBox
        inputPlaceholder=" "
        label="Seleccione la mesa"
        labelStyle={{fontWeight: 'bold', color: "#576574",fontSize:18,textAlign:"center"}}                
        containerStyle={{width: '90%', height: 40, margin: 20}}
        options={k_tables}
        value={selectedTable}
        onChange={onChange()}
        hideInputFilter={false}
        arrowIconColor="white"
        searchIconColor="white"
        toggleIconColor="white"        
      />

      <SelectBox
        inputPlaceholder=" "
        label="Seleccione los platillos"
        labelStyle={{fontWeight: 'bold', color: "#576574",fontSize:18,textAlign:"center"}}                
        containerStyle={{width: '90%', height: 40, margin: 20}}        
        options={k_dishes}
        selectedValues={selectedDishes}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        arrowIconColor="white"
        searchIconColor="white"
        toggleIconColor="white"        
        isMulti
      />      
      


      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Nueva Orden</Text>
      </TouchableOpacity>
    </Layout>
  );
};


/*
      <DropDownPicker
        placeholder="Seleccione la mesa"        
        placeholderStyle={{fontWeight: 'bold', color: "#576574"}}        
        activeItemStyle={{alignItems: 'center'}}
        style={{backgroundColor: '#222f3e',borderColor: "#10ac84"}}
        containerStyle={{width: '90%', height: 30, margin: 20}}        
                
        open={openT}
        value={valueT}
        items={itemsT}
        setOpen={setOpenT}
        setValue={setValueT}
        setItems={setItemsT} 
      />
*/
const styles = StyleSheet.create({
  select: {
    backgroundColor: "#10ac84",
    width: "90%",

  },
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "white",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: "maroon",
    textAlign: "center",
    fontWeight: 'bold'    
  },
});

export default OrderFormScreen;
