import { useParams } from 'react-router';
import JobList from './JobList.js'
import { useCompany } from './graphql/hooks';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId)
    
  console.log('[CompanyDetail] company: ', {company, loading, error})
  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>Sorry, something went wrong</p>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className='title is-5'>
        Jobs at {company.name}:
      </h5>
      <div><JobList jobs={company.jobs} />
      </div>
    </div>
  );
}

export default CompanyDetail;
