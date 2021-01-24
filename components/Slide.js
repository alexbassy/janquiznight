import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import NextImage from 'next/image'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const TextWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  z-index: 2;
  width: 70vw;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgb(0 0 0 / 0.8) 30%,
    rgb(0 0 0 / 0.6) 70%,
    rgb(0 0 0 / 0) 100%
  );
  /* backdrop-filter: blur(20px); */
  padding: 0 10vw 0 5vw;
`

const Title = styled.h1`
  font-size: 3.8vw;
  margin-bottom: 3vh;
  margin-bottom: 8vh;
`

const List = styled.ol`
  list-style-type: upper-alpha;
`

const Item = styled.li`
  font-size: 2.4vw;
  margin-bottom: 3vh;
  transform-origin: left;
  transition: all 0.25s ease;
  ${(props) =>
    props.isAnswerShown &&
    css`
      opacity: ${props.isCorrect ? 1 : 0.5};
      transform: scale(${props.isCorrect ? 1.2 : 0.9});
    `}
`

const Image = styled(NextImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  will-change: filter;
  transition: all 0.25s ease;
  ${(props) =>
    props.isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
  object-fit: cover;
  ${(props) =>
    props.isObscured &&
    css`
      transform: scale(1.2) ${props.isFlipped && `rotateY(180deg)`};
      filter: blur(30px) hue-rotate(180deg);
    `}
`

export default function Slide(props) {
  const imageURL = `/slide-images/${props.image.url}`
  return (
    <Container>
      <Image
        src={imageURL}
        layout='fill'
        isFlipped={props.image.flip}
        isObscured={props.image.obscured}
      />
      <TextWrapper>
        <Title>{props.title}</Title>
        <List>
          {props.options.map((option) => {
            return (
              <Item
                key={option.text}
                isAnswerShown={props.isAnswerShown}
                isCorrect={option.correct}
              >
                {option.text}
              </Item>
            )
          })}
        </List>
      </TextWrapper>
    </Container>
  )
}
