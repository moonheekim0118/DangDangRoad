import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useInput } from 'hooks';
import { Icon, Button } from 'atoms';
import { colorCode } from 'common/style/color';
import {
  REVIEW_SEARCH_PLACEHODLER,
  SEARCH_BUTTON_CAPTION,
} from 'common/constant/string';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  /** input color */
  color: 'blue' | 'white';
  /** have a focus effects or not */
  focus?: boolean;
  placeholder?: string;
  /** default keyword */
  keyword?: string;
  /** key word value handler */
  keywordChangeHanlder?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** submit search handler */
  searchHandler?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

interface InputProps extends Props {
  focusBackground?: 'blue' | 'white';
  focusFont?: 'blue' | 'white';
}

const SearchBar = ({
  color,
  focus = false,
  placeholder = REVIEW_SEARCH_PLACEHODLER,
  keyword,
  keywordChangeHanlder,
  searchHandler,
}: Props): React.ReactElement => {
  const [defaultKeyword, defaultKeywordChangeHanlder] = useInput();

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
        value={keyword ? keyword : defaultKeyword}
        onChange={
          keywordChangeHanlder
            ? keywordChangeHanlder
            : defaultKeywordChangeHanlder
        }
        placeholder={placeholder}
      />
      <IconContainer color={color}>
        <Icon icon={faSearch} className="searchIcon" css={iconStyle} />
      </IconContainer>
      <ButtonContainer color={color}>
        <Button type="submit" onClick={searchHandler}>
          {SEARCH_BUTTON_CAPTION}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

const iconStyle = css`
  transform: rotateY(180deg);
`;

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

const ButtonContainer = styled.div<Props>`
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

  &:focus
    ~ ${ButtonContainer},
    &:focus
    ~ ${IconContainer},
    &:focus::placeholder {
    color: ${(props) => props.focusFont && colorCode[props.focusFont]};
  }

  @media only screen and (max-width: 910px) {
    width: 100%;
  }
`;

export default SearchBar;
