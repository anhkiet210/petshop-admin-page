import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListCard from "./components/list-card/ListCard";
import { Grid } from "@mui/material";
import Chart from "./components/chart/Chart";
import ListOrder from "../order/pages/list-order/ListOrder";
import orderApi from "../../api/orderApi";

Dashboard.propTypes = {};

function Dashboard(props) {
  const [listOrder, setListOrder] = useState([])
  const [monthlyRevenue  , setMonthlyRevenue] = useState([])
  const processing = listOrder.filter( item => item.status === 'Đang chờ xác nhận')
  const deliverd = listOrder.filter( item => item.status === 'Đã giao')
  const refuse = listOrder.filter( item => item.status === 'Hủy đơn hàng')
  const totalRevenue = deliverd.reduce( (x, y) => {
    const { totalCost } = y
    x =+ totalCost
    return x
  }, 0)
  // console.log(deliverd);

  useEffect( () => {
    (
      async () => {
        try{
          const res = await orderApi.getOrderByStatus('Đang chờ xác nhận')
          setListOrder(res)
        }catch(err){
          console.log(err);
        }
      }
    )();
  }, [])

  useEffect ( () => {
    (
      () => {
        const temp = []
        let isTrue = false
        for(let i = 1; i <= 6; i++){
          for(let j = 0; j < deliverd?.length; j++){
            const tempdate = new Date(deliverd[j]?.createdAt).getMonth() + 1
            tempdate === i ? isTrue = true : isTrue = false
          }
          if(isTrue){
            const dt = deliverd.filter( item => new Date(item.updatedAt).getMonth() + 1 === i)
                                .reduce( (x, y) => {
                                  const { totalCost } = y
                                  x += totalCost
                                  return x
                                }, 0) 
            temp.push(dt)
          }else{
            temp.push(0)
          }
        }
        setMonthlyRevenue(temp)
      }
    )();
  }, [listOrder])


  return (
    <div className="dashboard">
      <Grid container spacing={3}>
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <ListCard 
            processing={processing}
            deliverd={deliverd}
            refuse={refuse}
            totalRevenue={totalRevenue}
          ></ListCard>
        </Grid>

        <Grid item lg={5} md={5} sm={12} xs={12}>
          <Chart 
            monthlyRevenue={monthlyRevenue}
          ></Chart>
        </Grid>
      </Grid>

      <ListOrder status="Đang chờ xác nhận"></ListOrder>
    </div>
  );
}

export default Dashboard;
