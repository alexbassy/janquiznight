import React from 'react'
import styled from '@emotion/styled'
import { IQuestion } from '../lib/questions'
import { SlideImage, SlideTextContainer, SlideTitle } from './slide/compounds'
import { Slide } from './slide/organisms'

const Container = styled.div`
  max-height: 100%;
  aspect-ratio: 4/3;
  position: relative;
  margin: auto;
  align-self: center;
  justify-self: center;
`

interface ISlideEditorProps {
  question: IQuestion
}

export default function SlideEditor(props: ISlideEditorProps) {
  const { id, title, options, image } = props.question
  return (
    <Container>
      <Slide {...props.question} isEditing isAnimated={false} />
    </Container>
  )
}
