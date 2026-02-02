import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResult extends Document {
    student: mongoose.Types.ObjectId;
    subject: mongoose.Types.ObjectId;
    semester: number;
    examType: 'mid_term' | 'end_term' | 'internal';
    academicYear: string;
    maxMarks: number;
    obtainedMarks: number;
    grade: string;
    gradePoint: number;
    status: 'pass' | 'fail' | 'absent';
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const resultSchema = new Schema<IResult>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
        },
        examType: {
            type: String,
            enum: ['mid_term', 'end_term', 'internal'],
            required: true,
        },
        academicYear: {
            type: String,
            required: true,
        },
        maxMarks: {
            type: Number,
            required: true,
        },
        obtainedMarks: {
            type: Number,
            required: true,
        },
        grade: {
            type: String,
            required: true,
        },
        gradePoint: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pass', 'fail', 'absent'],
            required: true,
        },
        publishedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Indexes
resultSchema.index({ student: 1, academicYear: -1 });
resultSchema.index({ subject: 1, semester: 1 });

const Result: Model<IResult> =
    mongoose.models.Result || mongoose.model<IResult>('Result', resultSchema);

export default Result;
