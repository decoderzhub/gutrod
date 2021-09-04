import { useRouter } from 'next/router'
import { useRef, useEffect} from 'react'

import {Loader} from '@googlemaps/js-api-loader';

import { useEntry } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'

export default function EditEntryPage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useEntry(id)

  const googlemap = useRef(null);
  

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
    });
    let map;
    if (data) {
      let latlong = getLatLng(data)
      console.log(latlong)
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
  });

  const getLatLng = (data) => {
    let latlng_array = data.latlong.split(',')
    let _latlng = [parseFloat(latlng_array[0]), parseFloat(latlng_array[1])]
    return _latlng
  }


  if (data) {
    return (
      <>
        <Nav title="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.title}</h1>
          <p>{"Name: " + data.firstname + " " + data.lastname}</p>
          <p>{"Email: " + data.email }</p>
          <p>{"Phone: " + data.phone}</p>
          <p>{"American contact: " + data.amcontact}</p>
          <p>{"Message: " + data.content}</p>
          <div  style={{width: 400, height: 300, marginTop: 15}} id="map" ref={googlemap} />

        </Container>
      </>
    )
  } else {
    return (
      <>
        <Nav title="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
        </Container>
      </>
    )
  }
}
