import React from 'react';

import { SearchPage } from '../searchPage';
import { PageWrapper } from '../../components/pageWrapper/PageWrapper';

const App: React.FC = (): React.JSX.Element => {
  return (
    <PageWrapper>
      <SearchPage />
    </PageWrapper>
  );
};

export default App;
