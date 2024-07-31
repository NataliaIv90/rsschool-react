import { useCallback, FC, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { useGetListDataQuery } from '@/redux/slices';
import { useSaveSearchQuery, useLoading } from '@/shared/hooks';

import { RouteError } from '../routeError/RouteError';
import { Search } from './search';
import { scrollToTop } from '@/shared/utils';

type TSearchPageProps = {
  children?: ReactNode;
};

export const SearchPage: FC<TSearchPageProps> = ({
  children,
}): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const router = useRouter();
  const { query } = router;

  const page = query.page ? (query.page as string) : '1';

  const {
    data: results,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetListDataQuery({
    page,
    searchTerm,
  });

  const handleSearchTermChange = useCallback(
    async (newSearchTerm: string): Promise<void> => {
      await setSearchTerm(newSearchTerm);
    },
    [setSearchTerm]
  );

  const handleCharacterSelect = useCallback(
    (id: string) => {
      router.push(`/details/?page=${page}&id=${id}`);
    },
    [router, page]
  );

  const handlePageChange = useCallback(
    (newPage: number): void => {
      scrollToTop();
      router.push(`/?page=${newPage}`);
    },
    [router]
  );

  const handleSearch = useCallback((): void => {
    scrollToTop();
    router.push('/?page=1');
  }, [router]);

  useLoading(isLoading, isFetching);

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return (
    <Search
      results={results}
      handlePageChange={handlePageChange}
      handleCharacterSelect={handleCharacterSelect}
      handleSearch={handleSearch}
      handleSearchTermChange={handleSearchTermChange}
      params={{ page }}
      searchTerm={searchTerm}
    >
      {children}
    </Search>
  );
};
