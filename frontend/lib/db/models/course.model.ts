import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
    name: string;
    code: string;
    department: mongoose.Types.ObjectId;
    degree: 'Diploma' | 'UG' | 'PG' | 'PhD';
    duration: number;
    totalSemesters: number;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
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
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        degree: {
            type: String,
            enum: ['Diploma', 'UG', 'PG', 'PhD'],
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        totalSemesters: {
            type: Number,
            required: true,
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
courseSchema.index({ department: 1 });
courseSchema.index({ isActive: 1 });

const Course: Model<ICourse> =
    mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course;
