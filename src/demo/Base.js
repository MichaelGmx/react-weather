// @emotion/core  renamed->  @emotion/react
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const buttonDefault = (props) => css`
  display: block;
  width: 120px;
  height: 30px;
  font-size: 14px;
  background-color: transparent;
  color: ${props.theme === 'dark' ? '#dadada' : '#212121'};
`;

const RejectButton = styled.button`
  ${buttonDefault}
  background-color: red;
`;

const AcceptButton = styled.button`
  ${buttonDefault}
  background-color: green;
`;

export { buttonDefault, RejectButton, AcceptButton };