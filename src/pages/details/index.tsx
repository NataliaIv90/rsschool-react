import { PageWrapper } from '@/components/pageWrapper';
import { DetailedView } from '@/components/detailedSection';
import { SearchPage } from '@/components/searchPage';

const Details = () => {
  return (
    <PageWrapper>
      <SearchPage>
        <DetailedView />
      </SearchPage>
    </PageWrapper>
  );
};

export default Details;
