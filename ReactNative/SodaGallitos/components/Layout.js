import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { theme } from '../core/theme'

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.back} />
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: theme.colors.primary,
    flex: 1,
    alignItems: "center",
//    alignSelf: 'center',
//    justifyContent: 'center',


  }
});

export default Layout;
