import React from "react";
import {} from "antd";
import Banner from "../../components/Banner/Banner";
import PopularProduct from "./PopularProduct";
import BePartner from "./BePartner";
import "./Home.scss";
import CatBox from "./CatBox";
import SaleBox from "./SaleBox";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="home">
        <PopularProduct />
        <SaleBox />
        <CatBox />
        <BePartner />
      </div>
    </>
  );
};

export default Home;
