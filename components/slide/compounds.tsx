import { ReactNode, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IQuestionImage, IQuestionOption } from '../../lib/questions'
import {
  ImageContainer,
  Image,
  Item,
  Answer,
  Count,
  Title,
  TextWrapper,
  List,
} from './atoms'
import { listVariants, textAppearance, textVariants } from './variants'
import IsAnimatedContext from '@/contexts/isAnimatedContext'

interface ISlideImageProps {
  image: IQuestionImage
  isAnswerShown?: boolean
}

export const SlideImage = ({ image, isAnswerShown }: ISlideImageProps) => {
  const isAnimated = useContext(IsAnimatedContext)
  const imageURL = `/slide-images/${image.url}`

  return (
    <AnimatePresence exitBeforeEnter>
      <ImageContainer
        key={imageURL}
        initial={
          isAnimated
            ? {
                opacity: 0,
                scale: 1.1,
                rotateY: image.flip ? 180 : 0,
              }
            : false
        }
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          transition: { delay: 0, duration: isAnimated ? 0.5 : 0 },
        }}
        transition={{ delay: 0.5, duration: 2 }}
        isFlipped={image.flip}
      >
        <Image
          src={imageURL}
          layout='fill'
          isObscured={!isAnswerShown && image.obscured}
        />
      </ImageContainer>
    </AnimatePresence>
  )
}

export const SlideTextContainer = (props: {
  isPhotoShown?: boolean
  children: ReactNode
}) => {
  const isAnimated = useContext(IsAnimatedContext)
  return (
    <TextWrapper
      initial={isAnimated ? 'initial' : false}
      animate={props.isPhotoShown ? 'initial' : 'shown'}
      exit='hidden'
      variants={textVariants}
    >
      {props.children}
    </TextWrapper>
  )
}

export const SlideCount = (props: { count: number }) => {
  const isAnimated = useContext(IsAnimatedContext)
  return (
    <Count
      key={'count ' + props.count}
      variants={textAppearance}
      transition={{ duration: isAnimated ? 1 : 0 }}
    >
      {props.count}
    </Count>
  )
}

export const SlideTitle = (props: { id: string; children: ReactNode }) => {
  const isAnimated = useContext(IsAnimatedContext)
  return (
    <Title
      key={'title ' + props.id}
      variants={textAppearance}
      transition={{ duration: isAnimated ? 1 : 0, delay: 0.2 }}
    >
      {props.children}
    </Title>
  )
}

export const SlideList = (props: { id: string; children: ReactNode }) => (
  <List variants={listVariants} key={'options ' + props.id}>
    {props.children}
  </List>
)

interface ISlideOption extends IQuestionOption {
  isAnswerShown?: boolean
}

export const SlideOption = ({
  id,
  correct,
  text,
  isAnswerShown,
}: ISlideOption) => {
  const isAnimated = useContext(IsAnimatedContext)

  return (
    <Item
      variants={textAppearance}
      transition={{ type: 'spring', duration: isAnimated ? 1 : 0 }}
    >
      <Answer isAnswerShown={isAnswerShown} isCorrect={correct === true}>
        {text}
      </Answer>
    </Item>
  )
}
