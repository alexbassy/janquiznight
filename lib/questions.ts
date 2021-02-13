import { nanoid } from 'nanoid'
// @ts-ignore
import allQuestions from './questions.yaml'

const questions: IQuestion[] = allQuestions.questions

export interface IQuestionOption {
  id: string
  text: string
  correct: boolean
}

export interface IQuestionImage {
  url: string
  flip: boolean
  obscured: boolean
}

export interface IQuestion {
  id: string
  count: number
  title: string
  options: IQuestionOption[]
  image: IQuestionImage
}

// Add unique IDs for easy use inside React lists
const withIDs = questions.map((question, i) => ({
  ...question,
  id: nanoid(),
  count: i + 1,
  options: question.options.map((option) => ({
    ...option,
    id: nanoid(),
    correct: Boolean(option.correct),
  })),
  image: {
    id: nanoid(),
    ...question.image,
    flip: Boolean(question.image.flip),
    obscured: Boolean(question.image.obscured),
  },
}))

export default withIDs
