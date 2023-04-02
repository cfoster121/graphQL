import { Company, Job } from './db.js'

export const resolvers = {
    Query: {
        company: (root, {id}) => Company.findById(id),
        job: (root, {id}) => Job.findById(id),
        jobs: async () => Job.findAll()
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    }
}