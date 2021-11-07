import {
  useCallback,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { useRouter } from 'next/router'
import { Slide } from '../components/slide/organisms'
import { PresentationContainer } from '../components/slide/atoms'
import Layout from '../components/Layout'
import Scores from '../components/Scores'
import { questions, players } from '../lib/questions'
import {
  getScoresFromCache,
  RoundState,
  saveScoresToCache,
  ScoresState,
} from '@/lib/scores'

const Question = () => {
  const router = useRouter()
  const { questionIndex } = router.query
  const [isAnswerShown, setIsAnswerShown] = useState(false)
  const [isPhotoShown, setIsPhotoShown] = useState(false)
  const [scores, setScores] = useState<ScoresState>(getScoresFromCache())

  const handleSetScore = (scores: RoundState) => {
    setScores((currentScores) => {
      if (typeof questionIndex === 'undefined') {
        return currentScores
      }

      const newScores = { ...currentScores } || {}
      newScores[questionIndex.toString()] = scores
      saveScoresToCache(newScores)
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
            questionId={activeQuestion.id}
            round={scores?.[questionIndex!.toString()] || {}}
            onSetScores={handleSetScore}
          />
        </PresentationContainer>
      </main>
    </Layout>
  )
}

export default Question
