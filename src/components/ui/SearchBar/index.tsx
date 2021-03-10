import React, {
  forwardRef,
  useImperativeHandle,
  InputHTMLAttributes,
  FormEvent,
} from 'react';
import { useInput } from 'hooks';
import { Icon, Button } from 'atoms';
import { SEARCH_BUTTON_CAPTION } from 'common/constant/string';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputRef } from 'types/Ref';
import * as S from './style';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** input color */
  color: 'blue' | 'white';
  /** have a focus effects or not */
  focus?: boolean;
  /** submit search handler */
  submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchBar = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const { color, focus, submitHandler, ...rest } = props;

  /** if it has focus effects, define foucsBack color and fontColor */
  const focusBack = focus ? (color === 'blue' ? 'white' : 'blue') : undefined;
  const focusFont = focus ? color : undefined;

  const [value, valueChangeHandler] = useInput();

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <S.Form onSubmit={submitHandler}>
      <S.Input
        type="text"
        color={color}
        focusBackground={focusBack}
        focusFont={focusFont}
        value={value}
        onChange={valueChangeHandler}
        {...rest}
      />
      <S.IconContainer color={color}>
        <Icon icon={faSearch} className="searchIcon" css={S.iconStyle} />
      </S.IconContainer>
      <S.ButtonContainer color={color}>
        <Button className="searchBtn" type="submit" css={S.searchBtnStyle}>
          {SEARCH_BUTTON_CAPTION}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default forwardRef(SearchBar);
