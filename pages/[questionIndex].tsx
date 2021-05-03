import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Slide } from '../components/slide/organisms'
import { PresentationContainer } from '../components/slide/atoms'
import Layout from '../components/Layout'
import Scores, { IScoresState, IScores } from '../components/Scores'
import { questions, players } from '../lib/questions'

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

interface IScoresState {
  [id: string]: IScores
}

const Question = () => {
  const router = useRouter()
  const { questionIndex } = router.query
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

  // Get question ID from path
  const id = Number(questionIndex)
  const activeQuestion = questions[id]

  const onPrevious = useCallback(() => {
    if (isAnswerShown) {
      setIsAnswerShown(false)
    } else {
      const previousQuestion = id - 1
      if (!questions[previousQuestion]) {
        return null
      }
      setIsPhotoShown(false)
      router.push({ query: { questionIndex: id - 1 } })
    }
  }, [id, isAnswerShown])

  const onNext = useCallback(() => {
    if (!isAnswerShown) {
      return setIsAnswerShown(true)
    }
    const nextQuestion = id + 1
    if (!questions[nextQuestion]) {
      return null
    }
    router.push({ query: { questionIndex: id + 1 } })
    setIsAnswerShown(false)
    setIsPhotoShown(false)
  }, [id, isAnswerShown])

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
  }, [onNext, onPrevious])

  if (!/^\d+$/.test(id.toString())) {
    return 'Only numbers accepted there'
  }

  if (!activeQuestion) {
    return 'That’s not a question yet'
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
            questionId={activeQuestion.image.url}
            scores={scores || {}}
            onSetScores={handleSetScore}
          />
        </PresentationContainer>
      </main>
    </Layout>
  )
}

export default Question
