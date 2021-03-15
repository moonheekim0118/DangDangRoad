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
  focusTheme?: 'fromBlueToWhite' | 'fromWhiteToBlue';
  /** submit handler */
  submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchBar = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const { color, focusTheme = 'default', submitHandler, ...rest } = props;

  const [value, valueChangeHandler] = useInput();

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <S.Form onSubmit={submitHandler}>
      <input
        type="search"
        id="placeSearch"
        value={value}
        onChange={valueChangeHandler}
        css={[
          S.inputStyle,
          S.inputColorThemes[color],
          S.focusThemes[focusTheme],
        ]}
        {...rest}
      />
      <S.Label htmlFor="placeSearch" css={S.colorThemes[color]}>
        <Icon icon={faSearch} size="large" style={S.iconStyle} />
      </S.Label>
      <S.ButtonContainer css={S.colorThemes[color]}>
        <Button
          type="submit"
          className="searchBtn"
          size="medium"
          width="100%"
          css={S.searchBtnStyle}>
          {SEARCH_BUTTON_CAPTION}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default forwardRef(SearchBar);
