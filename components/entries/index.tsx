import Entry from './entry'

function Entries({ entries }) {
  if (entries) {
    return (
      <div>
        {entries.map((e) => (
          <div key={e.id} className="py-2">
            <Entry id={e.id} title={e.title} firstname={e.firstname} lastname={e.lastname} email={e.email} phone={e.phone} amcontact={e.amcontact} content={e.content} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Entries
