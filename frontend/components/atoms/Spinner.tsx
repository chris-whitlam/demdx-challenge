import { FC } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    height: 50px;
    width: 50px;
    color: #126e2c;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    filter: drop-shadow(0.25rem 0.25rem 0.15rem rgba(0, 0, 0, 0.2)); 

    @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }
}
`

const Spinner: FC = () =>
  <SpinnerContainer data-test-id='loading-spinner'>
    <ImSpinner9 />
  </SpinnerContainer>


export default Spinner;