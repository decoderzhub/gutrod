import { useRouter } from 'next/router'
import { useEntry } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'
import Gmaps from '@/components/gmaps'


export default function EditEntryPage() {
  
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useEntry(id)
  
  

  if (data) {
    return (
      <>
        <Nav title="View"/>
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.title}</h1>
          <p>{"Name: " + data.firstname + " " + data.lastname}</p>
          <p>{"Email: " + data.email }</p>
          <p>{"Phone: " + data.phone}</p>
          <p>{"American contact: " + data.amcontact}</p>
          <p>{"Message: " + data.content}</p>
          <Gmaps data={data}/>
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



