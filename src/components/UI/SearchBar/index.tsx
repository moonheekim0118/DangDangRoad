import React, { forwardRef, useImperativeHandle, memo } from 'react';
import { useInput } from 'hooks';
import { Icon, Button } from 'components/UI';
import { SEARCH_BUTTON_CAPTION } from 'common/constant/string';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputRef } from 'types/Ref';
import * as S from './style';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  /** input color */
  color: 'blue' | 'white';
  /** have a focus effects or not */
  focusTheme?: 'fromBlueToWhite' | 'fromWhiteToBlue';
  /** initial value */
  initialValue?: string;
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchBar = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const {
    id,
    color,
    focusTheme = 'default',
    initialValue = '',
    onFormSubmit,
    ...rest
  } = props;

  const [value, handleChangeValue] = useInput(initialValue);

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <S.Form onSubmit={onFormSubmit}>
      <input
        type="search"
        id={id}
        value={value}
        onChange={handleChangeValue}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        css={[
          S.inputStyle,
          S.inputColorThemes[color],
          S.focusThemes[focusTheme],
        ]}
        {...rest}
      />
      <S.Label htmlFor={id} css={S.colorThemes[color]}>
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
