import JobList from './JobList';
import { useJobs } from './graphql/hooks';

function JobBoard() {
  const { jobs, loading, error } = useJobs();
  console.log('[JobBoard] useQuery: ', { jobs, loading, error })
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
