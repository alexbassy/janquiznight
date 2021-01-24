import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Slide from '../components/Slide'
import Layout from '../components/Layout'
import { questions } from '../lib/questions.yaml'

const Question = () => {
  const router = useRouter()
  const { questionIndex } = router.query
  const [isAnswerShown, setIsAnswerShown] = useState(false)

  // Get question ID from path
  const id = Number(questionIndex)
  const activeQuestion = questions[id]

  const onPrevious = useCallback(() => {
    console.log({ isAnswerShown, nextQuestion: questions[id - 1] })
    if (isAnswerShown) {
      setIsAnswerShown(false)
    } else {
      const previousQuestion = id - 1
      if (!questions[previousQuestion]) {
        return null
      }
      router.push({ query: { questionIndex: id - 1 } })
    }
  }, [questionIndex, isAnswerShown])

  const onNext = useCallback(() => {
    console.log({
      isAnswerShown,
      id,
      nextQuestion: questions[id + 1],
    })
    if (isAnswerShown) {
      const nextQuestion = id + 1
      console.log('to', nextQuestion)
      if (!questions[nextQuestion]) {
        return null
      }
      router.push({ query: { questionIndex: id + 1 } })
      setIsAnswerShown(false)
    } else {
      setIsAnswerShown(true)
    }
  }, [questionIndex, isAnswerShown])

  useEffect(() => {
    const onKeyUp = (ev) => {
      console.log(ev.key)
      if (ev.key === ' ' || ev.key === 'ArrowRight') {
        onNext()
      }
      if (ev.key === 'ArrowLeft') {
        onPrevious()
      }
    }
    document.addEventListener('keyup', onKeyUp)
    return () => document.removeEventListener('keyup', onKeyUp)
  }, [onNext, onPrevious])

  if (!/^\d$/.test(questionIndex)) {
    return 'Die Route sollte numerisch sein'
  }

  if (!activeQuestion) {
    return 'Es gibt keine Frage mit diesem ID'
  }

  return (
    <Layout>
      <Slide {...activeQuestion} isAnswerShown={isAnswerShown} />
    </Layout>
  )
}

export default Question
