import { nanoid } from 'nanoid'

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

export interface IPlayer {
  id: string
  name: string
  score: number
  image: string
}

// Add unique IDs for easy use inside React lists
export const getQuestionsWithIds = (questions: IQuestion[]): IQuestion[] =>
  questions.map((question, i) => ({
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

export const getPlayersWithIDs = (players: IPlayer[]): IPlayer[] =>
  players.map((player, i) => ({
    ...player,
    id: nanoid(),
  }))
