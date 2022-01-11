import React from "react";
import Layout from "../components/Layout";

import OrdersList from "../components/OrdersList";

const HomeScreen = () => {
  return (
    <Layout>
      <OrdersList />
    </Layout>
  );
};

export default HomeScreen;
