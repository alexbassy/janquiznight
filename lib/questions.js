import { nanoid } from 'nanoid'
import { questions } from './questions.yaml'

// Add unique IDs for easy use inside React lists
const withIDs = questions.map((q, i) => ({
  ...q,
  id: nanoid(),
  count: i + 1,
  options: q.options.map((o) => ({ ...o, id: nanoid() })),
}))

export default withIDs
