import IsAnimatedContext from '@/contexts/isAnimatedContext'
import { IQuestion } from '../../lib/questions'
import {
  SlideCount,
  SlideImage,
  SlideOption,
  SlideTitle,
  SlideTextContainer,
  SlideList,
} from './compounds'

interface ISlideProps extends IQuestion {
  isAnswerShown?: boolean
  isPhotoShown?: boolean
  isEditing?: boolean
  isAnimated?: boolean
}

export function Slide(props: ISlideProps) {
  const {
    id,
    count,
    image,
    isAnswerShown,
    isPhotoShown,
    title,
    options,
    isAnimated, // False when in creator view
  } = props
  return (
    <IsAnimatedContext.Provider value={Boolean(isAnimated)}>
      <SlideImage image={image} isAnswerShown={isAnswerShown} />
      <SlideTextContainer isPhotoShown={isPhotoShown}>
        <SlideCount count={count} />
        <SlideTitle id={id}>{title}</SlideTitle>
        <SlideList id={id}>
          {options.map((option) => (
            <SlideOption
              key={option.id}
              {...option}
              isAnswerShown={isAnswerShown}
            />
          ))}
        </SlideList>
      </SlideTextContainer>
    </IsAnimatedContext.Provider>
  )
}
