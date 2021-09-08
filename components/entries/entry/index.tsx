import { useEffect, useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'
import firebase from 'firebase'
import ButtonLink from '@/components/button-link'
import Button from '@/components/button'
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function Entry({ id, title, firstname, lastname, email, phone, amcontact, content, latlong }) {
  const [deleting, setDeleting] = useState(false)

  async function deleteEntry() {
    setDeleting(true)
    let res = await fetch(`/api/delete-entry?id=${id}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    mutate('/api/get-entries')
    setDeleting(false)
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      firebase.auth().signOut()
    }
  },[user]);

  return (
    <div>
      <div className="flex items-center">
        <ButtonLink href={`/entry/${id}`} className="h-5 py-0 mx-1">
         {firstname + " " + lastname}
        </ButtonLink>
        <div className="flex ml-0">
          <ButtonLink
            href={`/entry/edit/${id}?title=${title}&firstname=${firstname}&lastname=${lastname}&email=${email}&phone=${phone}&amcontact=${amcontact}&content=${content}&latlong=${latlong}`}
            className="h-5 py-0 mx-1"
          >
            Edit
          </ButtonLink>
          <Button
            disabled={deleting}
            onClick={deleteEntry}
            className="h-5 py-0 mx-1"
          >
            {deleting ? 'Deleting ...' : 'Delete'}
          </Button>
        </div>
        
      </div>
      <div className="flex items-center my-1">
      <ButtonLink href={`/login`} className="h-5 py-0 mx-1">
         Whatsapp
        </ButtonLink>
      </div>
      <p>{content}</p>
    </div>
  )
}

export default Entry
