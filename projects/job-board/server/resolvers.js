import { Company, Job } from './db.js'

function rejectIf(condition) {
    if(condition) {
        throw new Error('Must be logged in')
    }
}
export const resolvers = {
    Query: {
        company: (_root, { id }) => Company.findById(id),
        job: (_root, { id }) => Job.findById(id),
        jobs: async () => Job.findAll()
    },

    Mutation: {
        createJob: (_root, { input }, { user }) => {
            rejectIf(!user);
            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(job.companyId !== user.companyId);
            return Job.delete(id)
        },
        updateJob: async (_root, { input }, {user}) => {
            console.log('Updating job: ', user)
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);
            return Job.update({ ...input, companyId: user.companyId });
        },
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    }
}