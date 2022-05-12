import React from "react";
import PropTypes from "prop-types";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Card from "../card/Card";
import { Grid } from "@mui/material";
import { formatPrice } from "../../../../utils/common";

ListCard.propTypes = {};

function ListCard(props) {
  const { processing, deliverd, refuse, totalRevenue } = props
  const CardList = [
    {
      name: "Đang xử lý",
      count: processing.length,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Đã giao",
      count: deliverd.length,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Đã hủy",
      count: refuse.length,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Tổng doanh thu",
      count: formatPrice(totalRevenue),
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {CardList.map((item, index) => {
          return (
            <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
              <Card item={item}></Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ListCard;
