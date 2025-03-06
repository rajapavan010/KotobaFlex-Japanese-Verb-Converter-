import React from "react";
import Layout from "../components/Layout";
import Converter from "../components/N5Converter"; // Use the Converter component

const N5Page = () => {
  return (
    <Layout>
      <Converter title="N5 Converter" />
    </Layout>
  );
};

export default N5Page;
