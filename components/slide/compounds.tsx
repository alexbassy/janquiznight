import { ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IQuestionImage, IQuestionOption } from '../../lib/questions'
import {
  ImageContainer,
  Image,
  Item,
  GrowWhenCorrect,
  Count,
  Title,
  TextWrapper,
  List,
} from './atoms'
import { listVariants, textAppearance, textVariants } from './variants'

interface ISlideImageProps {
  image: IQuestionImage
  isAnswerShown: boolean
}

export const SlideImage = ({ image, isAnswerShown }: ISlideImageProps) => {
  const imageURL = `/slide-images/${image.url}`

  return (
    <AnimatePresence exitBeforeEnter>
      <ImageContainer
        key={imageURL}
        initial={{
          opacity: 0,
          scale: 1.1,
          rotateY: image.flip ? 180 : 0,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          transition: { delay: 0, duration: 0.5 },
        }}
        transition={{ delay: 0.5, duration: 2 }}
        isFlipped={image.flip}
      >
        <Image
          src={imageURL}
          layout='fill'
          objectFit='cover'
          isObscured={!isAnswerShown && image.obscured}
        />
      </ImageContainer>
    </AnimatePresence>
  )
}

interface ISlideOption extends IQuestionOption {
  isAnswerShown: boolean
}

export const SlideOption = ({
  id,
  correct,
  text,
  isAnswerShown,
}: ISlideOption) => {
  return (
    <Item
      key={id}
      variants={textAppearance}
      transition={{ type: 'spring', duration: 1 }}
    >
      <GrowWhenCorrect
        isAnswerShown={isAnswerShown}
        isCorrect={correct === true}
      >
        {text}
      </GrowWhenCorrect>
    </Item>
  )
}

export const SlideTextContainer = (props: {
  isPhotoShown: boolean
  children: ReactNode
}) => (
  <TextWrapper
    initial='initial'
    animate={props.isPhotoShown ? 'initial' : 'shown'}
    exit='hidden'
    variants={textVariants}
  >
    {props.children}
  </TextWrapper>
)

export const SlideCount = (props: { count: number }) => (
  <Count
    key={'count ' + props.count}
    variants={textAppearance}
    transition={{ duration: 1 }}
  >
    {props.count}
  </Count>
)

export const SlideTitle = (props: { id: string; children: ReactNode }) => (
  <Title
    key={'title ' + props.id}
    variants={textAppearance}
    transition={{ duration: 1, delay: 0.2 }}
  >
    {props.children}
  </Title>
)

export const SlideList = (props: { id: string; children: ReactNode }) => (
  <List variants={listVariants} key={'options ' + props.id}>
    {props.children}
  </List>
)
