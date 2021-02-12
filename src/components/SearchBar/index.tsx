import React from 'react';
import Icon from 'atoms/Icon';
import Span from 'atoms/Span';
import useInput from 'hooks/useInput';
import styled from '@emotion/styled';
import { colorCode } from 'model/colorCode';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  /** input color */
  color: 'blue' | 'white';
  /** have a focus effects or not */
  focus?: boolean;
}

interface InputProps extends Props {
  focusBackground?: 'blue' | 'white';
  focusFont?: 'blue' | 'white';
}

const PLACEHOLDER = '지역명을 입력하세요. 예) 강원도 속초시';

const SearchBar = ({ color, focus = false }: Props) => {
  const [keyword, keywordChangeHanlder] = useInput();

  /** if it has focus effects, define foucsBack color and fontColor */
  const focusBack = focus ? (color === 'blue' ? 'white' : 'blue') : undefined;
  const focusFont = focus ? color : undefined;

  return (
    <Form>
      <Input
        type="text"
        color={color}
        focusBackground={focusBack}
        focusFont={focusFont}
        value={keyword}
        onChange={keywordChangeHanlder}
        placeholder={PLACEHOLDER}
      />
      <IconContainer color={color}>
        <Icon icon={faSearch} iconsize={20} rotate={180} />
      </IconContainer>
      <SpanContainer color={color}>
        <Span fontsize={1} cursor="pointer">
          Go
        </Span>
      </SpanContainer>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
`;

const IconContainer = styled.div<Props>`
  position: absolute;
  top: 50%;
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  transform: translateY(-50%);
  left: 10px;
`;

const SpanContainer = styled.div<Props>`
  position: absolute;
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  top: 50%;
  transform: translateY(-50%);
  right: -40px;

  @media only screen and (max-width: 910px) {
    right: 10px;
  }
`;

const Input = styled.input<InputProps>`
  background-color: ${(props) => colorCode[props.color]};
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  border: none;
  border-radius: 20px;
  width: 120%;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);

  ::placeholder {
    color: ${(props) =>
      props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  }

  &:focus {
    outline: none;
    background-color: ${(props) =>
      props.focusBackground && colorCode[props.focusBackground]};
    color: ${(props) => props.focusFont && colorCode[props.focusFont]};
  }

  &:focus ~ ${SpanContainer}, &:focus ~ ${IconContainer}, &:focus::placeholder {
    color: ${(props) => props.focusFont && colorCode[props.focusFont]};
  }

  @media only screen and (max-width: 910px) {
    width: 100%;
  }
`;

export default SearchBar;
