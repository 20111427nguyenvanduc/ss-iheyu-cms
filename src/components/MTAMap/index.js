import React, {useEffect, useRef, useState} from "react"
import {Map, TileLayer, Popup, Marker, Polyline, Rectangle, Tooltip, Button, Polygon} from "react-leaflet"
import _ from "lodash"
// import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
// import "leaflet-rotatedmarker";
import "./smoothZoom"

class MapContent extends React.Component {
 constructor(props) {
  super(props)
  this.map = null
  this.markerRef = undefined
  this.state = {
   isZooming: false,
  }
 }

 saveMarkerRef = (ref) => {
  if (ref && ref.leafletElement) {
   ref.leafletElement._icon.style[L.DomUtil.TRANSITION] += " transform .5s ease"
   this.markerRef = ref.leafletElement
  }
 }

 componentDidUpdate() {
  const {markers} = this.props
  let bounds = []
  if (_.isEmpty(bounds) || !this.map) return
  // if (bounds.length > 1) {
  //   props.bounds = bounds
  //   props.boundsOptions = {padding: [50, 50]}
  // }
 }

 render() {
  const {zoom = 16, center, markers, popups, polylines, boundsPlaces, nameAddress, polygon, onClick = () => {}} = this.props
  const {isZooming} = this.state
  let bounds = boundsPlaces ? boundsPlaces.map((place, i) => [place.lat, place.lng]) : []
  let polylinesPath = (polylines && polylines.length && polylines.map((place) => [place.lat, place.lng])) || []
  if (polylinesPath.length) {
   bounds = bounds.concat(polylinesPath)
  }
  const props = {
   ref: (ref) => (this.map = ref),
   center,
   zoom,
   onClick,
   scrollWheelZoom: false, // disable original zoom function
   smoothWheelZoom: true, // enable smooth zoom
   smoothSensitivity: 1,
   // onZoomStart: ()=>{this.setState({isZooming: true})},
   // onZoomEnd: ()=>{this.setState({isZooming: false})}
  }

  if (bounds.length > 1) {
   props.bounds = bounds
   props.boundsOptions = {padding: [10, 10]}
  }

  return (
   <Map {...props}>
    <TileLayer
     attribution='<a href="https://www.heyu.vn/" target="_blank">HeyU</a>'
     url={`https://maps.heyu.asia/styles/Bright/{z}/{x}/{y}@2x.png`} //`https://api.mtamap.vn/v1/map/style_map/{z}/{x}/{y}` `http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`
     subdomains={["mt0", "mt1", "mt2", "mt3"]}
    />
    {polylines ? <Polyline className='my_polyline' positions={polylines} /> : null}
    {!_.isEmpty(markers)
     ? markers.map((marker, i) => (
        <Marker
         key={i}
         // position={marker.position} //lat,lng
         position={[marker.position.lat, marker.position.lng]}
         icon={
          marker.icon
           ? new L.Icon({
              iconUrl: marker.icon,
              iconAnchor: new L.Point(marker.iconAnchorWidth || 25, marker.iconAnchorHeight || 45),
              iconSize: new L.Point(marker.iconWidth || 50, marker.iconHeight || 50),
             })
           : new L.Icon.Default()
         }
         rotationOrigin='center'
        >
         {marker.popup ? <Popup>{marker.popup}</Popup> : null}
        </Marker>
       ))
     : null}
    {!_.isEmpty(popups) ? popups.map((popup) => <Popup key={JSON.stringify(popup.position)} {...popup} />) : null}

    {!_.isEmpty(polygon)
     ? polygon.map(({positions, title, color, fillColor}, i) => (
        <Polygon key={`polygon` + title + i} color={color || "red"} fillColor={fillColor || "white"} positions={positions}>
         <Tooltip sticky>{title}</Tooltip>
        </Polygon>
       ))
     : null}
   </Map>
  )
 }
}

export default MapContent
