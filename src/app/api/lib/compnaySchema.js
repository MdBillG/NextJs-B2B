const companySchema = {
    name: String,
    location: String,
    type: {
        type: String,
        enum: ['unit', 'division']
    },
    users: [{ type: ObjectId, ref: 'User' }]
};