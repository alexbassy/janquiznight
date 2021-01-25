import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Slide from '../components/Slide'
import Layout from '../components/Layout'
import { questions as rawQuestions } from '../lib/questions.yaml'
import { nanoid } from 'nanoid'

const questions = rawQuestions.map((q) => ({
  ...q,
  id: nanoid(),
  options: q.options.map((o) => ({ ...o, id: nanoid() })),
}))

const Question = () => {
  const router = useRouter()
  const { questionIndex } = router.query
  const [isAnswerShown, setIsAnswerShown] = useState(false)

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
      router.push({ query: { questionIndex: id - 1 } })
    }
  }, [questionIndex, isAnswerShown])

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
  }, [questionIndex, isAnswerShown])

  useEffect(() => {
    const onKeyUp = (ev) => {
      if (ev.key === ' ' || ev.key === 'ArrowRight') onNext()
      if (ev.key === 'ArrowLeft') onPrevious()
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
