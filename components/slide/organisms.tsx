import { IQuestion } from '../../lib/questions'
import { Container } from './atoms'
import {
  SlideCount,
  SlideImage,
  SlideOption,
  SlideTitle,
  SlideTextContainer,
  SlideList,
} from './compounds'

interface ISlideProps extends IQuestion {
  isAnswerShown: boolean
  isPhotoShown: boolean
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
  } = props
  return (
    <Container>
      <SlideImage image={image} isAnswerShown={isAnswerShown} />
      <SlideTextContainer isPhotoShown={isPhotoShown}>
        <SlideCount count={count} />
        <SlideTitle id={id}>{title}</SlideTitle>
        <SlideList id={id}>
          {options.map((option) => (
            <SlideOption {...option} isAnswerShown={isAnswerShown} />
          ))}
        </SlideList>
      </SlideTextContainer>
    </Container>
  )
}
