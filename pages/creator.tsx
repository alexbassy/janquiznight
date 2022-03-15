import styled from '@emotion/styled'
import Image from 'next/image'
import SlideEditor from '../components/SlideEditor'
import CreatorLayout from '../components/CreatorLayout'
import { questions, IQuestion, IQuestionOption } from '../lib/questions'
import { useState } from 'react'
import { css } from '@emotion/react'

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

interface IPreview {
  isActive: boolean
}

const Preview = styled.li<IPreview>`
  width: 100%;
  position: relative;
  aspect-ratio: 4 / 3;
  background: rgb(120 120 120);
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 0 0.25rem #ffffff20;
    `}
`

const Background = styled(Image)`
  width: 100%;
  height: 100%;
`

export default function Creator() {
  const [activeSlide, setActiveSlide] = useState<IQuestion['id']>(
    questions[0].id,
  )
  const activeQuestion = questions.find(
    (question) => question.id === activeSlide,
  ) as IQuestion

  return (
    <CreatorLayout
      title='Creator'
      sidebar={
        <List>
          {questions.map((question) => {
            return (
              <Preview
                key={question.id}
                role='button'
                onClick={() => setActiveSlide(question.id)}
                isActive={activeSlide === question.id}
              >
                {question.image.url && (
                  <Background
                    src={`/slide-images/${question.image.url}`}
                    layout='fill'
                    objectFit='cover'
                  />
                )}
              </Preview>
            )
          })}
        </List>
      }
    >
      <SlideEditor question={activeQuestion} />
    </CreatorLayout>
  )
}
