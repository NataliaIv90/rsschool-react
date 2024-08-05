import { FC } from 'react';

import { ThemeProvider } from '@/shared/context/themeContext/ThemeContext';
import { SearchPage } from '@/components/searchPage';

const Page: FC = () => {
  return (
    <ThemeProvider>
      <SearchPage />
    </ThemeProvider>
  );
};

export default Page;
