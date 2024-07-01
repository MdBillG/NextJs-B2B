const quoteSchema = {
    companyId: ObjectId,
    amount: Number,
    description: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdBy: ObjectId,  // Reference to the User who created the quote
    createdAt: Date
};