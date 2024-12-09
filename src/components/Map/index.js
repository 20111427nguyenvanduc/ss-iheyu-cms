import React from 'react';
import _ from 'lodash';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
  FaAnchor,
  InfoWindow,
  Polygon
} from "react-google-maps";

import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

class GGMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSSR: true
    };
    this.map = null
  }

  componentDidMount(){
    this.setState({
      isSSR: typeof window === "undefined"
    })
  }

  componentDidUpdate(){
    const {markers} = this.props
    if (_.isEmpty(markers) || !this.map) return
    const bounds = new window.google.maps.LatLngBounds();
    markers.map(item => {
      bounds.extend(item.position);
      return item.id
    });
    this.map.fitBounds(bounds)
  }



  render(){
    let {isSSR} = this.state
    // console.log("Map",this.props);
    let {polygons, polylines, markers, infoWindows, center, zoom = 13} = this.props
    let defaultPolygonOptions = {
      fillColor: '#ff1100',
      fillOpacity: 0.5,
      strokeColor: '#ff1100',
      strokeOpacity: 1,
      strokePosition: 'CENTER',
      strokeWeight: '3px'
    }
    let InternalMap = props => (
      <GoogleMap defaultZoom={zoom} center={center} ref={(ref) => { this.map = ref; }}>
        {
          infoWindows ? infoWindows.map((infoWindow, i)=><InfoBox key={`info-window${i}`}
           defaultPosition={infoWindow.position}
           options={{ closeBoxURL: ``, enableEventPropagation: true }}
           >
          {infoWindow.content}
          </InfoBox>)
          :null
        }

        {polylines ? <Polyline path={polylines}/> : null}

        {polygons ?
          polygons.map((polygon, i)=>
          <Polygon
            key={`polygon${i}`}
            path={polygon.path}
            options={polygon.options||defaultPolygonOptions}
            onClick={polygon.onClick}
          />) : null}
        {
          !_.isEmpty(markers) ?
          markers.map((marker, i)=><Marker
          key={i}
          position={marker.position} //lat,lng
          icon={{
            url: marker.icon,
            scaledSize: new google.maps.Size(marker.iconWidth || 30, marker.iconHeight || 30),
            anchor: new google.maps.Point(marker.iconAnchorWidth || 15, marker.iconAnchorHeight || 30),
          }}
          animation= {2}
          />)

          :null
        }
      </GoogleMap>
    );
    const MapHoc = withScriptjs(withGoogleMap(InternalMap));
    let apiKeys = ['AIzaSyB_kYDQeYeTV393H3v_fiOtdIb1HtKkfsg',
                    'AIzaSyAMuUvtpIiuM1NHVsQsZWyQjjQg7mblBSQ',
                    'AIzaSyB0v0gEN5UhrkeVdtlvx5PzLmG3bye4LgU',
                    'AIzaSyC1P2UBG3kbJGkH_0SUHiDRWeon_F0XjvI',
                    'AIzaSyAurXKNpRZJRSq5XTFriNkN8X8KxLrKja0',
                    'AIzaSyCJdnoX93gc2VezKKIw28pN6pLfNkJfsZs',
                    'AIzaSyBfHdVdT6CRBsPhY_k3dYtleT0mMPmdDZQ',
                    'AIzaSyCZYHt6AyCVv9mq2QfuoosVbT-A7CbTZrw',
                    'AIzaSyAcjWZaqfAAOsPk71bb0E6oKi_jsSXp1Kc',
                    'AIzaSyBN9SEQTvYdIb-VNom2HLL4h9gViIzSa_g',
                    'AIzaSyBf9L88_qlRE-_tApA0xMvKApv8z4N4pvg',
                    'AIzaSyB7fEzx_OUzUh7F7tfYW_bG2Sr51Fn9VGY',
                    'AIzaSyAjheW1Yq4qUGLQSvQntIGaoGiL49Kp6nU',
                    'AIzaSyC9zRwRwQZNAIDKcTOHrwAen3KMMUGJt-s',
                    'AIzaSyDvFTwPLly20qkg6JYSXCpa-idE5JfqWB4',
                    'AIzaSyB4SWRfH2zw-EdoAsFao_PV2FCHwpRsaSE',
                    'AIzaSyBipsOLJShcd7pIGFkOk1HVfpZINImOQOY',
                    'AIzaSyAEmkg63CNm7ihAHmFAftfQI5m6h2wKZMI',
                    'AIzaSyDQhZRUwqAvMcbNasHvawM62OjFbiPidEs',
                    'AIzaSyCCeW12bjwuD4S4_W4cbc8PJmpyBENz4vs'];
    let key = _.sample(apiKeys)
    let googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`
    return (
      <MapHoc
        googleMapURL={googleMapUrl}
        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        containerElement={<div style={{ height: '600px', width: `100%` }} />}
        mapElement={<div style={{ height: `100%`, width: `100%` }} />}
      />
    )
  }

}

export default GGMap;
