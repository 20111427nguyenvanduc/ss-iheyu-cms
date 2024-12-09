import React, { Fragment, useState } from "react"
import { Chart } from "react-charts"
const emptyData = [
 {
  label: "Doanh thu",
  data: [
   {
    primary: "N-3",
    secondary: 0,
   },
   {
    primary: "N-2",
    secondary: 0,
   },
   {
    primary: "N-1",
    secondary: 0,
   },
   {
    primary: "N",
    secondary: 0,
   },
   {
    primary: "N+1",
    secondary: 0,
   },
   {
    primary: "N+2",
    secondary: 0,
   },
   {
    primary: "N+3",
    secondary: 0,
   },
  ],
 },
]
export default function Line({ data = emptyData }) {
 const primaryAxis = React.useMemo(
  () => ({
   getValue: (datum) => datum.primary,
  }),
  [],
 )

 const secondaryAxes = React.useMemo(
  () => [
   {
    getValue: (datum) => datum.secondary,
    elementType: "line"
   },
  ],
  [],
 )

 return (
  <Fragment>
   <Chart
    options={{
     data,
     primaryAxis,
     secondaryAxes,
    }}
   />
  </Fragment>
 )
}
