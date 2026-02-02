import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClass extends Document {
    course: mongoose.Types.ObjectId;
    department: mongoose.Types.ObjectId;
    semester: number;
    section: string;
    academicYear: string;
    subjects: {
        subjectId: mongoose.Types.ObjectId;
        facultyId?: mongoose.Types.ObjectId;
        schedule?: {
            day: string;
            startTime: string;
            endTime: string;
            room?: string;
        }[];
    }[];
    classTeacher?: mongoose.Types.ObjectId;
    students: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ClassSchema: Schema<IClass> = new Schema(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
        semester: { type: Number, required: true },
        section: { type: String, required: true }, // e.g., 'A', 'B'
        academicYear: { type: String, required: true }, // e.g., '2025-2026'
        subjects: [
            {
                subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
                facultyId: { type: Schema.Types.ObjectId, ref: 'Faculty' },
                schedule: [
                    {
                        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
                        startTime: { type: String },
                        endTime: { type: String },
                        room: { type: String },
                    },
                ],
            },
        ],
        classTeacher: { type: Schema.Types.ObjectId, ref: 'Faculty' },
        students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure unique class per details
ClassSchema.index({ course: 1, semester: 1, section: 1, academicYear: 1 }, { unique: true });

const Class: Model<IClass> =
    mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);

export default Class;
