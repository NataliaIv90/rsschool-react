import { FC } from 'react';

import { PageWrapper } from '@/components/pageWrapper';
import { ThemeProvider } from '@/shared/context/themeContext/ThemeContext';
import { SearchPage } from '@/components/searchPage';

const Page: FC = () => {
  return (
    <ThemeProvider>
      <PageWrapper>
        <SearchPage />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Page;
