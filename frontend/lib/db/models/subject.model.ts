import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    code: string;
    course: mongoose.Types.ObjectId;
    semester: number;
    credits: number;
    type: 'theory' | 'practical' | 'both';
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const subjectSchema = new Schema<ISubject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
        },
        credits: {
            type: Number,
            required: true,
            min: 1,
        },
        type: {
            type: String,
            enum: ['theory', 'practical', 'both'],
            default: 'theory',
        },
        description: String,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
subjectSchema.index({ course: 1, semester: 1 });

const Subject: Model<ISubject> =
    mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);

export default Subject;
