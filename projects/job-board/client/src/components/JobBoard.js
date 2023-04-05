import JobList from './JobList';
import { JOBS_QUERY } from './graphql/queries';
import { useQuery } from '@apollo/client';

function JobBoard() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only'
  });
  console.log('[JobBoard] useQuery: ', { data, loading, error })
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (error) {
    return (
      <h1>Sorry, something went wrong</h1>
    )
  }
  const { jobs } = data;

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
