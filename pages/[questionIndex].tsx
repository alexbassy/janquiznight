import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Slide } from '../components/slide/organisms'
import Layout from '../components/Layout'
import questions from '../lib/questions'

const Question = () => {
  const router = useRouter()
  const { questionIndex } = router.query
  const [isAnswerShown, setIsAnswerShown] = useState(false)
  const [isPhotoShown, setIsPhotoShown] = useState(false)

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
        <Slide
          {...activeQuestion}
          isAnswerShown={isAnswerShown}
          isPhotoShown={isPhotoShown}
        />
      </main>
    </Layout>
  )
}

export default Question
