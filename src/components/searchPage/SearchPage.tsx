import { useCallback, FC } from 'react';
import { useRouter } from 'next/router';

import { useGetListDataQuery } from '@/redux/slices/starWarsApiSlice';
import { useSaveSearchQuery, useLoading } from '@/shared/hooks';

import { RouteError } from '../routeError/RouteError';
import { Search } from './search';
import { scrollToTop } from '@/shared/utils';
import { Loader } from '@/shared/components';

export const SearchPage: FC = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useSaveSearchQuery();
  const router = useRouter();
  const { query } = router;

  // Obtain the current page from query parameters
  const page = query.page ? (query.page as string) : '1';

  // const handleNavigation = () => {
  //   router.push('/new-path');
  // };

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
    <div className="search-page">
      <Search
        results={results}
        handlePageChange={handlePageChange}
        handleCharacterSelect={handleCharacterSelect}
        handleSearch={handleSearch}
        handleSearchTermChange={handleSearchTermChange}
        params={{ page }}
        searchTerm={searchTerm}
      />
    </div>
  );
};
