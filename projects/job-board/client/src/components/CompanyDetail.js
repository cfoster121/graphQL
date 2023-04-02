import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getCompany } from './graphql/queries';
import JobList from './JobList.js'

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then(setCompany)
  }, [companyId]);
  console.log('[CompanyDetail] company: ', company)

  if (!company) {
    return <p>loading...</p>
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
