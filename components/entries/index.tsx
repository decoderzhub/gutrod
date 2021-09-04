import Entry from './entry'

function Entries({ entries }) {
  //entries = [{id:0, title: "Welcome to footbread", content: "click on add to add your information." }]
  console.log(entries)
  if (entries) {
    return (
      <div>
        {entries.map((e) => (
          <div key={e.id} className="py-2">
            <Entry id={e.id} title={e.title} content={e.content} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Entries
