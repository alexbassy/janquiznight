import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const TextWrapper = styled(motion.section)`
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

const textAppearance = {
  initial: { opacity: 0, y: '4vh' },
  shown: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: '-2vh' },
}

const listVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1,
    },
  },
  shown: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
  hidden: {
    transition: { staggerChildren: 0.05 },
  },
}

const Title = styled(motion.h1)`
  font-size: 3.8vw;
  margin-bottom: 3vh;
  margin-bottom: 8vh;
`

const List = styled(motion.ol)`
  list-style: none;
  padding: 0;
  counter-reset: option-counter;
`

const Item = styled(motion.li)`
  font-size: 2.4vw;
  margin: 4vh 0;
  transform-origin: left;
  counter-increment: option-counter;
`

const GrowWhenCorrect = styled.div`
  display: flex;

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
  }

  transition: 0.5s ease;
  transition-property: opacity, transform, text-shadow;
  transform-origin: left;
  ${(props) =>
    props.isAnswerShown &&
    css`
      opacity: ${props.isCorrect ? 1 : 0.4};
      transform: scale(${props.isCorrect ? 1.2 : 1});
      text-shadow: 0 0 30px rgb(0 0 0 / 100%);
    `}
`

const ImageContainer = styled(motion.div)`
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

const Image = styled(NextImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s ease;
  will-change: opacity, transform, filter;

  ${(props) =>
    props.isObscured &&
    css`
      opacity: 0.8;
      transform: scale(1.2);
      filter: blur(30px) hue-rotate(-40deg);
    `};
`

export default function Slide(props) {
  const { id, image, isAnswerShown, title, options } = props
  const imageURL = `/slide-images/${props.image.url}`
  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <ImageContainer
          key={imageURL}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          isFlipped={image.flip}
        >
          <Image
            src={imageURL}
            layout='fill'
            isObscured={!isAnswerShown && image.obscured}
          />
        </ImageContainer>
      </AnimatePresence>
      <TextWrapper
        initial='initial'
        animate='shown'
        exit='hidden'
        variants={listVariants}
      >
        <Title
          key={'title ' + id}
          variants={textAppearance}
          transition={{ duration: 1 }}
        >
          {title}
        </Title>
        <List variants={listVariants} key={'options ' + title}>
          {options.map(({ id, correct, text }) => {
            return (
              <Item
                key={id}
                variants={textAppearance}
                transition={{ type: 'spring' }}
                transition={{ duration: 1 }}
              >
                <GrowWhenCorrect
                  isAnswerShown={isAnswerShown}
                  isCorrect={correct === true}
                >
                  {text}
                </GrowWhenCorrect>
              </Item>
            )
          })}
        </List>
      </TextWrapper>
    </Container>
  )
}
