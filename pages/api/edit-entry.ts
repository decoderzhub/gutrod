import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { id, title, firstname, lastname, email, phone, amcontact, content} = req.body
  try {
    if (!id || !title || !content) {
      return res
        .status(400)
        .json({ message: '`id`,`title`, and `content` are all required' })
    }

    const results = await query(
      `
      UPDATE entries
      SET title = ?, firstname = ?, lastname = ?, email= ?, phone = ?, amcontact = ?, content = ?, latlong = ?
      WHERE id = ?
      `,
      [filter.clean(title), filter.clean(firstname), filter.clean(lastname), filter.clean(email), filter.clean(phone), filter.clean(amcontact), filter.clean(content), id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
