import { useState, useEffect} from 'react'
import Router from 'next/router'

import Button from '@/components/button'

var xlatlong = ""

export default function EntryForm() {
  
  
  const getLocation = () => {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      xlatlong = "Geolocation is not supported by this browser.";
      setLatlong(xlatlong)
    }
  }

  const showPosition = (position) => {
    //var x = document.getElementById("location");
    //x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.>
    var lat = position.coords.latitude
    var long = position.coords.longitude
    xlatlong = [lat, long].toString()
    setLatlong(xlatlong)
    //setCookie("Latitude", [lat,long] , 365)
  }
  

  const [title, setTitle] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amcontact, setAmcontact] = useState('')
  const [content, setContent] = useState('')
  const [latlong, setLatlong] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getLocation()
  }, [])

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/create-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          firstname,
          lastname,
          email,
          phone,
          amcontact,
          content,
          latlong
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      console.log(e)
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="title">
          <h3 className="font-bold">Title</h3>
        </label>
        <input
          id="title"
          className="shadow border rounded w-full"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="firstname">
          <h3 className="font-bold">First Name</h3>
        </label>
        <input
          id="firstname"
          className="shadow border rounded w-full"
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="lastname">
          <h3 className="font-bold">Last Name</h3>
        </label>
        <input
          id="lastname"
          className="shadow border rounded w-full"
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="email">
          <h3 className="font-bold">Email</h3>
        </label>
        <input
          id="email"
          className="shadow border rounded w-full"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="phone">
          <h3 className="font-bold">Phone Number</h3>
        </label>
        <input
          id="phone"
          className="shadow border rounded w-full"
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="amcontact">
          <h3 className="font-bold">American Contact Name</h3>
        </label>
        <input
          id="amcontact"
          className="shadow border rounded w-full"
          type="text"
          name="amcontact"
          value={amcontact}
          onChange={(e) => setAmcontact(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="content">
          <h3 className="font-bold">Content</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-48"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="latlong">
          <h3 className="font-bold">Location</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-10"
          id="latlong"
          name="latlong"
          value={latlong}
          readOnly
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Creating ...' : 'Create'}
      </Button>
    </form>
  )
}
