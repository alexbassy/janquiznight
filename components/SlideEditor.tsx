import styled from '@emotion/styled'
import Image from 'next/image'
import { IQuestion } from '../lib/questions'
import { SlideImage } from './slide/compounds'

const Container = styled.div`
  width: 100%;
  max-height: calc(100% - 7rem);
  aspect-ratio: 4 / 3;
  position: relative;
  margin: auto;
`

interface ISlideEditorProps {
  question: IQuestion
}

export default function SlideEditor(props: ISlideEditorProps) {
  const { title, options, image } = props.question
  return (
    <Container>
      <div>
        <h2>{title}</h2>
        <ol>
          {options.map((option) => {
            return <li key={option.id}>{option.text}</li>
          })}
        </ol>
      </div>
      <SlideImage image={image} isAnswerShown />
    </Container>
  )
}
