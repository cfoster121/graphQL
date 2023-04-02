import { Company, Job } from './db.js'

export const resolvers = {
    Query: {
        job: async (root, {id}) => Job.findById(id),
        jobs: async () => Job.findAll()
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    }
}