import { FC } from 'react';

import { DetailedView } from '@/components/detailedSection';
import { PageWrapper } from '@/components/pageWrapper';
import { SearchPage } from '@/components/searchPage';
import { ThemeProvider } from '@/shared/context/themeContext/ThemeContext';

const Page: FC = () => {
  return (
    <ThemeProvider>
      <PageWrapper>
        <SearchPage>
          <DetailedView />
        </SearchPage>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Page;
