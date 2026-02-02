import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaculty extends Document {
    userId: mongoose.Types.ObjectId;
    employeeId: string;
    joiningDate: Date;
    designation: string;
    department: mongoose.Types.ObjectId;
    qualifications: Array<{
        degree: string;
        institution: string;
        year: number;
    }>;
    specialization: string[];
    status: 'active' | 'on_leave' | 'resigned';
    createdAt: Date;
    updatedAt: Date;
}

const facultySchema = new Schema<IFaculty>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        employeeId: {
            type: String,
            required: true,
            unique: true,
        },
        joiningDate: {
            type: Date,
            default: Date.now,
        },
        designation: {
            type: String,
            required: true,
            enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'],
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        qualifications: [
            {
                degree: String,
                institution: String,
                year: Number,
            },
        ],
        specialization: [String],
        status: {
            type: String,
            enum: ['active', 'on_leave', 'resigned'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
facultySchema.index({ userId: 1 });
facultySchema.index({ department: 1 });

const Faculty: Model<IFaculty> =
    mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', facultySchema);

export default Faculty;
