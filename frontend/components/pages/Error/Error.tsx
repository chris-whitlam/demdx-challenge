import { FC } from 'react';
import { PageTitle } from '../../atoms';

const Error: FC = () => (
  <div data-test-id='error-page'>
    <PageTitle data-test-id='page-title'>Something went wrong!</PageTitle>
  </div>
)

export default Error;