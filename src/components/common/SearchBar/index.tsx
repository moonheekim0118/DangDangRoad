import React, { InputHTMLAttributes } from 'react';
import { Icon, Button } from 'atoms';
import { SEARCH_BUTTON_CAPTION } from 'common/constant/string';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** input color */
  color: 'blue' | 'white';
  /** have a focus effects or not */
  focus?: boolean;
  /** submit search handler */
  submitHandler?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const SearchBar = (props: Props): React.ReactElement => {
  const { color, focus, submitHandler, ...rest } = props;

  /** if it has focus effects, define foucsBack color and fontColor */
  const focusBack = focus ? (color === 'blue' ? 'white' : 'blue') : undefined;
  const focusFont = focus ? color : undefined;

  return (
    <S.Form>
      <S.Input
        type="text"
        color={color}
        focusBackground={focusBack}
        focusFont={focusFont}
        {...rest}
      />
      <S.IconContainer color={color}>
        <Icon icon={faSearch} className="searchIcon" css={S.iconStyle} />
      </S.IconContainer>
      <S.ButtonContainer color={color}>
        <Button type="submit" onClick={submitHandler}>
          {SEARCH_BUTTON_CAPTION}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SearchBar;
