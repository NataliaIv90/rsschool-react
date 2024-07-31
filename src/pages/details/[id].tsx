import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PageWrapper } from '@/components/pageWrapper';
import { useRouter } from 'next/router';
import { useGetCharacterDataQuery } from '@/redux/slices/starWarsApiSlice';
import { RouteError } from '@/components/routeError';
import { CardWrapper } from '@/components/detailedSection/cardWrapper/CardWrapper';
import { useLoading } from '@/shared/hooks';

interface DetailsPageProps {
  id: string;
}

const Details = ({ id }: DetailsPageProps) => {
  const router = useRouter();
  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCharacterDataQuery({ id });

  const handleClose = () => {
    const page = router.query.page || '1';
    router.push(`/?page=${page}`);
  };

  useLoading(isLoading, isFetching);

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return (
    <PageWrapper>
      <CardWrapper character={character} handleClose={handleClose} />
    </PageWrapper>
  );
};

// Fetching the route parameter
export const getServerSideProps: GetServerSideProps<DetailsPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  return {
    props: {
      id: id as string,
    },
  };
};

export default Details;
