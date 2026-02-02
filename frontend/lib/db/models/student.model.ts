import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
    userId: mongoose.Types.ObjectId;
    studentId: string;
    admissionNumber: string;
    admissionDate: Date;
    course: mongoose.Types.ObjectId;
    department: mongoose.Types.ObjectId;
    semester: number;
    section: string;
    batch: string;
    rollNumber: string;
    status: 'active' | 'graduated' | 'dropout' | 'transferred';
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        studentId: {
            type: String,
            required: true,
            unique: true,
        },
        admissionNumber: {
            type: String,
            required: true,
            unique: true,
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8,
        },
        section: {
            type: String,
            required: true,
            uppercase: true,
        },
        batch: {
            type: String,
            required: true,
        },
        rollNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'graduated', 'dropout', 'transferred'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
studentSchema.index({ userId: 1 });
studentSchema.index({ course: 1, semester: 1 });
studentSchema.index({ status: 1 });

const Student: Model<IStudent> =
    mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);

export default Student;
