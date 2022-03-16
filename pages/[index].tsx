import { promises as fs } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { useCallback, useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Slide } from '../components/slide/organisms'
import { PresentationContainer } from '../components/slide/atoms'
import Layout from '../components/Layout'
import Scores, { IScoresState, IScores } from '../components/Scores'
import { getQuestionsWithIds, getPlayersWithIDs, IQuestion, IPlayer } from '../lib/questions'

const CACHE_KEY = 'scores'

function saveScoresToCatch(scores: IScoresState): void {
  localStorage.setItem(CACHE_KEY, JSON.stringify(scores))
}

function getScoresFromCache(): IScoresState {
  try {
    const result = JSON.parse(localStorage.getItem(CACHE_KEY) || '')
    if (result && Object.keys(result).length) {
      return result as IScoresState
    }
    return {}
  } catch (e) {
    return {}
  }
}

interface IQuestionsPageProps {
  players: IPlayer[]
  activeQuestion: IQuestion
  questions: IQuestion[]
  questionIndex: number
}

const Question: React.FC<IQuestionsPageProps> = ({
  questionIndex,
  activeQuestion,
  questions,
  players,
}) => {
  const router = useRouter()
  const [isAnswerShown, setIsAnswerShown] = useState(false)
  const [isPhotoShown, setIsPhotoShown] = useState(false)
  const [scores, setScores] = useState<IScoresState>(getScoresFromCache())

  const handleSetScore = (questionId: string, scores: IScores) => {
    setScores((currentScores) => {
      console.log(currentScores)
      const newScores = { ...(currentScores || {}) }
      newScores[questionId] = scores
      saveScoresToCatch(newScores)
      return newScores
    })
  }

  const navigateToQuestion = useCallback(
    (index: number) => {
      router.push({ query: { index } })
    },
    [router],
  )

  const onPrevious = useCallback(() => {
    if (isAnswerShown) {
      setIsAnswerShown(false)
    } else {
      const previousQuestion = questionIndex
      if (!questions[previousQuestion]) {
        return null
      }
      setIsPhotoShown(false)
      navigateToQuestion(previousQuestion)
    }
  }, [questionIndex, isAnswerShown, questions, navigateToQuestion])

  const onNext = useCallback(() => {
    if (!isAnswerShown) {
      return setIsAnswerShown(true)
    }
    const nextQuestion = questionIndex + 2
    if (!questions[nextQuestion]) {
      return null
    }
    navigateToQuestion(nextQuestion)
    setIsAnswerShown(false)
    setIsPhotoShown(false)
  }, [questionIndex, isAnswerShown, questions, navigateToQuestion])

  const onShowPicture = useCallback(() => {
    setIsPhotoShown((isPhotoShown) => !isPhotoShown)
  }, [])

  useEffect(() => {
    const onKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === ' ' || ev.key === 'ArrowRight') onNext()
      if (ev.key === 'ArrowLeft') onPrevious()
      if (ev.key === 'ArrowUp') onShowPicture()
    }
    document.addEventListener('keyup', onKeyUp)
    return () => document.removeEventListener('keyup', onKeyUp)
  }, [onNext, onPrevious, onShowPicture])

  if (!/^\d+$/.test(questionIndex.toString())) {
    return <p>Only numbers accepted there</p>
  }

  if (!activeQuestion) {
    return <p>That’s not a question yet</p>
  }

  return (
    <Layout>
      <main>
        <PresentationContainer>
          <Slide
            {...activeQuestion}
            isAnswerShown={isAnswerShown}
            isPhotoShown={isPhotoShown}
            isAnimated
          />
          <Scores
            players={players}
            questionId={activeQuestion.image.url}
            scores={scores || {}}
            onSetScores={handleSetScore}
          />
        </PresentationContainer>
      </main>
    </Layout>
  )
}

async function loadYaml<T>(fileName: string, topLevel: string): Promise<T> {
  const fileDirectory = path.join(process.cwd(), 'lib')
  const filePath = path.join(fileDirectory, fileName)
  const fileYaml = yaml.load(await fs.readFile(filePath, 'utf-8')) as any
  return fileYaml[topLevel] as T
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const players = getPlayersWithIDs(await loadYaml<IPlayer[]>('players.yaml', 'people'))
  const questions = getQuestionsWithIds(await loadYaml<IQuestion[]>('questions.yaml', 'questions'))
  const questionIndex = Number(params?.index) - 1
  const activeQuestion = questions[questionIndex]
  return {
    props: {
      questionIndex,
      activeQuestion,
      questions,
      players,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const questions = await loadYaml<IQuestion[]>('questions.yaml', 'questions')
  const paths = Object.keys(questions).map((index) => `/${Number(index) + 1}`)
  return {
    paths,
    fallback: true,
  }
}

export default Question
