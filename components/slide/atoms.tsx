import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import NextImage from 'next/image'
import { motion } from 'framer-motion'

export const PresentationContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

export const TextWrapper = styled(motion.section)`
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
  padding: 0 10vw 0 5vw;
`

export const Title = styled(motion.h1)`
  font-size: 2.4rem;
  margin: 0.5em 0;
`

export const Count = styled(motion.span)`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff80;
  margin: auto 0 0;
`

export const List = styled(motion.ol)`
  list-style: none;
  padding: 0;
  counter-reset: option-counter;
  margin-bottom: auto;
`

export const Item = styled(motion.li)`
  font-size: 1.4rem;
  margin: 1.4rem 0;
  transform-origin: left;
  counter-increment: option-counter;
`

interface IAnswer {
  isAnswerShown?: boolean
  isCorrect: boolean
}

export const Answer = styled.div<IAnswer>`
  display: flex;
  align-items: center;
  transition: 0.75s ease;
  transition-property: opacity, transform, text-shadow;
  transform-origin: left;

  ::before {
    content: counter(option-counter, upper-alpha);
    margin-right: 1rem;
    background: #ffffff21;
    align-self: flex-start;
    display: flex;
    font-size: 1.5rem;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    place-content: center;
    place-items: center;
    transition: all 0.75s ease;
    will-change: color, background-color;

    ${(props) =>
      props.isAnswerShown &&
      props.isCorrect &&
      css`
        color: #ffffffaa;
        background-color: #258629;
      `}
  }

  ${(props) =>
    props.isAnswerShown &&
    css`
      opacity: ${props.isCorrect ? 1 : 0.2};
      text-shadow: 0 0 30px rgb(0 0 0 / 100%);
    `}
`

interface IImageContainer {
  isFlipped: boolean
}

export const ImageContainer = styled(motion.div)<IImageContainer>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  // Flipped pictures
  ${(props) =>
    props.isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
`

interface IImageAtom {
  isObscured: boolean
}

export const Image = styled(NextImage)<IImageAtom>`
  width: 100%;
  height: 100%;
  transition: all 1s ease;
  object-fit: cover;
  will-change: opacity, transform, filter;

  ${(props) =>
    props.isObscured &&
    css`
      opacity: 0.8;
      transform: scale(1.2);
      filter: blur(30px) hue-rotate(-40deg);
    `};
`
