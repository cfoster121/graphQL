import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getCompany } from './graphql/queries';

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then(setCompany)
  }, [companyId]);
  console.log('[CompanyDetail] company: ', company)

  if(!company) {
    return <p>loading...</p>
  }


  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyDetail;
