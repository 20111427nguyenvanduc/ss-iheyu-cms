import React, { useState, useEffect } from "react"

const MTAMap = React.lazy(() => import("./"))

export default function MapView({ center, zoom, polylines, markers, bounds, polygon, ...props }) {
 const isSSR = typeof window === "undefined"

 return (
  <div className='animated fadeInDown' style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
   {center ? (
    !isSSR && (
     <React.Suspense fallback={<div />}>
      <MTAMap zoom={zoom} center={center} markers={markers} polylines={polylines} boundsPlaces={bounds} polygon={polygon} {...props} />
     </React.Suspense>
    )
   ) : (
    <div></div>
   )}
  </div>
 )
}
