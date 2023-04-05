import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { request } from 'graphql-request';
import { getAccessToken } from '../../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql'

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const JOB_DETAIL_FRAGMENT = gql`
fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
}`

export const JOBS_QUERY = gql`
query JobsQuery {
  jobs {
    id
    title
    company {
      id
      name
    }
  }
}`

export async function getCompany(id) {
  const query = gql`
       query CompanyQuery ($id: ID!) {
  company(id: $id) {
    id
    name
    description
    jobs {
      id
      title
    }
  }
   }`;
  const variables = { id };
  const { data: { company } } = await client.query({ query, variables });
  return company;
}

export async function getJob(id) {
  const query = gql`
    query JobQuery ($id: ID!) {
  job(id: $id) {
   ...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}`;
  const variables = { id };
  const { data: { job } } = await client.query({ query, variables });
  return job;

}

export async function createJob(input) {
  const mutation = gql`
  mutation createJobMutation($input: CreateJobInput!) {
  job: createJob (input: $input) {
    ...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}`;
  const variables = { input };
  const context = {
    headers: { 'Authorization': "Bearer " + getAccessToken() }
  }
  const { data: { job } } = await client.mutate({ mutation, variables, context });
  return job
}

export async function deleteJob(id) {
  const query = gql`
mutation DeleteJobMutation ($id: ID!) {
  deleteJob(id: $id) {
    id
    title
  }
}`
  const variables = { id };
  const { job } = await request(GRAPHQL_URL, query, variables)
  return job
}

