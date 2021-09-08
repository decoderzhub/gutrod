import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef } from "react"
import styled from "styled-components"


function Gmaps(mapdata) {
    const data = mapdata.data
    const googlemap = useRef(null);
    useEffect(() => {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          version: 'weekly',
        });
        let map;
        if (data) {
          let latlong = getLatLng(data)
          var  map_center = { lat: latlong[0], lng: latlong[1]}
          loader.load().then(() => {
            const google = window.google;
            map = new google.maps.Map(googlemap.current, {
              center: map_center,
              zoom: 8,
            });
            const marker = new google.maps.Marker({
              position: map_center,
              map: map,
            });
          });
        }
      },);
    
      function getLatLng(data){
        let latlng_array = []
        if(data.latlong){
          latlng_array = data.latlong.split(',')
        }else{
          latlng_array = data.split(',')
        }
        let _latlng = [parseFloat(latlng_array[0]), parseFloat(latlng_array[1])]
        return _latlng
      }
    
    
    return (
        <Container>
          <div  style={{width: "85vw", height: 200, marginTop: 15}} id="map" ref={googlemap} />

        </Container>
    )
}

export default Gmaps


const Container = styled.div`
  display: grid;
  place-items: center;
  height: 25vh;
`;