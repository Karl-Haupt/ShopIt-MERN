import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryChart, VictoryBar } from "victory";

import Sidebar from '../Admin/Sidebar';
import Metadata from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import { allOrders } from '../../Actions/orderActions';

const AdminAnalytics = () => {
    const dispatch = useDispatch();
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders);

    let ordersForMonth = [];

    useEffect(() => {
        dispatch(allOrders());

    }, [dispatch])

    let monthlyDateForOrders = (date, dateMonth) => {
      let numberOfOrderPerMonth = 0;

        orders && orders.map((order) => {
          let dateOfOrder = new Date(order.createdAt);
          
          if(date.getMonth() + 1 === dateOfOrder.getMonth() + 1 && dateOfOrder.getMonth() + 1 === dateMonth) {
            numberOfOrderPerMonth = numberOfOrderPerMonth + 1;
          }
        });

        if(new Date().getDay() + 1 === 28) {
          ordersForMonth.push({ 
            dateMonth: dateMonth,
            payments: numberOfOrderPerMonth
          })
        }
      return numberOfOrderPerMonth;
    };

    // ordersForMonth.push(monthlyDateForOrders());
    console.log("The date " + new Date().getDay() + 1)

    const data = [
      { x: "Jan", y: monthlyDateForOrders(new Date(), 1) },
      { x: "Feb", y: monthlyDateForOrders(new Date(), 2) },
      { x: "Mar", y: monthlyDateForOrders(new Date(), 3) },
      { x: "Apr", y: monthlyDateForOrders(new Date(), 4) },
      { x: "May", y: monthlyDateForOrders(new Date(), 5) },
      { x: "Jun", y: monthlyDateForOrders(new Date(), 6) },
      { x: "Jul", y: monthlyDateForOrders(new Date(), 7) },
      { x: "Aug", y: monthlyDateForOrders(new Date(), 8) },
      { x: "Sep", y: monthlyDateForOrders(new Date(), 9) },
      { x: "Oct", y:  monthlyDateForOrders(new Date(), 10) },
      { x: "Nov", y: monthlyDateForOrders(new Date(), 11) },
      { x: "Dec", y: monthlyDateForOrders(new Date(), 12) },
    ];

    let monthlyDateForTotalAmountDate = (date, dateMonth) => {
      let totalAmountOfOrders = 0;

        orders && orders.map((order) => {
          let dateOfOrder = new Date(order.createdAt);
          
          if(date.getMonth() + 1 === dateOfOrder.getMonth() + 1 && dateOfOrder.getMonth() + 1 === dateMonth) {
            totalAmountOfOrders = totalAmountOfOrders + order.totalPrice;
          }
        
        });
      return totalAmountOfOrders;
    };

    const totalAmountData = [
      { x: "Jan", y: monthlyDateForTotalAmountDate(new Date(), 1) },
      { x: "Feb", y: monthlyDateForTotalAmountDate(new Date(), 2) },
      { x: "Mar", y: monthlyDateForTotalAmountDate(new Date(), 3) },
      { x: "Apr", y: monthlyDateForTotalAmountDate(new Date(), 4) },
      { x: "May", y: monthlyDateForTotalAmountDate(new Date(), 5) },
      { x: "Jun", y: monthlyDateForTotalAmountDate(new Date(), 6) },
      { x: "Jul", y: monthlyDateForTotalAmountDate(new Date(), 7) },
      { x: "Aug", y: monthlyDateForTotalAmountDate(new Date(), 8) },
      { x: "Sep", y: monthlyDateForTotalAmountDate(new Date(), 9) },
      { x: "Oct", y:  monthlyDateForTotalAmountDate(new Date(), 10) },
      { x: "Nov", y: monthlyDateForTotalAmountDate(new Date(), 11) },
      { x: "Dec", y: monthlyDateForTotalAmountDate(new Date(), 12) },
    ];

    const styles = {
      display: "flex",
      flexDirection: "row",
    }
    
    return (
      <div className="row">
        <Metadata title={'Analytics'} />
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>



        {loading ? <Loader /> : <div id="victoryCharts">
            
            <Fragment className="col-6 col-md-9">
              
            <div className="analytics_heading">
              <h4 >Number of orders/month</h4>
              <h4>Total Amount per month</h4>
            </div>
            
              <div id="analytics_flex">

                  <VictoryChart
                      domainPadding={{ x: 20 }}
                      animate={{duration: 500}} >
                          <VictoryBar
                          data={data}
                          x="x"
                          y="y"
                          style={{
                            data: { fill: "tomato", width: 12 }
                          }}
                          animate={{
                            onExit: {
                              duration: 500,
                              before: () => ({
                                _y: 0,
                                fill: "orange",
                                label: "BYE"
                              })
                            }
                          }}
                          />
                  </VictoryChart>
                  
                  <VictoryChart
                      domainPadding={{ x: 20 }}
                      animate={{duration: 500}} >
                          <VictoryBar
                          data={totalAmountData}
                          x="x"
                          y="y"
                          style={{
                            data: { fill: "tomato", width: 12 }
                          }}
                          animate={{
                            onExit: {
                              duration: 500,
                              before: () => ({
                                _y: 0,
                                fill: "orange",
                                label: "BYE"
                              })
                            }
                          }}
                          />
                  </VictoryChart>
                </div>
            </Fragment>
          </div>}
        
      </div>
    )
}

export default AdminAnalytics
