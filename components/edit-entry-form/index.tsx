import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Button from '../button'

export default function EntryForm() {
  const [_title, setTitle] = useState('')
  const [_firstname, setFirstName] = useState('')
  const [_lastname, setLastName] = useState('')
  const [_email, setEmail] = useState('')
  const [_phone, setPhone] = useState('')
  const [_amcontact, setAmcontact] = useState('')
  const [_content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id, firstname, lastname, email, phone, amcontact, title, content } = router.query

  useEffect(() => {
    if (typeof firstname === 'string') {
      setFirstName(firstname)
    }
    if (typeof lastname === 'string') {
      setLastName(lastname)
    }
    if (typeof email === 'string') {
      setEmail(email)
    }
    if (typeof phone === 'string') {
      setPhone(phone)
    }
    if (typeof amcontact === 'string') {
      setAmcontact(amcontact)
    }
    if (typeof title === 'string') {
      setTitle(title)
    }
    if (typeof content === 'string') {
      setContent(content)
    }
  }, [firstname, lastname, email, phone, amcontact, title, content])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/edit-entry', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: _title,
          content: _content,
          firstname: _firstname,
          lastname: _lastname,
          email: _email,
          phone: _phone,
          amcontact: _amcontact
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
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
          value={_title}
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
          value={_firstname}
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
          value={_lastname}
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
          type="email"
          name="email"
          value={_email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="phone">
          <h3 className="font-bold">Phone</h3>
        </label>
        <input
          id="phone"
          className="shadow border rounded w-full"
          type="text"
          name="phone"
          value={_phone}
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
          value={_amcontact}
          onChange={(e) => setAmcontact(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="content">
          <h3 className="font-bold">Message</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-48"
          id="content"
          name="content"
          value={_content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Saving ...' : 'Save'}
      </Button>
    </form>
  )
}
