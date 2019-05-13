import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EmailSchema = new Schema({
    to: {
        type: String,
        required: 'Enter receiver'
    },
    content: {
        type: String,
        required: 'Enter content'
    },
    subject: {
        type: String,
        required: 'Enter a subject'
    },
    status: {
        type: String            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});