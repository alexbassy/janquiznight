import React from 'react'
import styled from '@emotion/styled'
import { IQuestion } from '../lib/questions'
import { SlideImage, SlideTextContainer, SlideTitle } from './slide/compounds'

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
  const { id, title, options, image } = props.question
  return (
    <Container>
      <SlideTextContainer isPhotoShown>
        <SlideTitle id={id}>{title}</SlideTitle>
        <ol>
          {options.map((option) => {
            return <li key={option.id}>{option.text}</li>
          })}
        </ol>
      </SlideTextContainer>
      <SlideImage image={image} isAnswerShown />
    </Container>
  )
}
