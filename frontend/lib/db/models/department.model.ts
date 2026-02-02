import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDepartment extends Document {
    name: string;
    code: string;
    description?: string;
    hod?: mongoose.Types.ObjectId;
    establishedYear?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        description: String,
        hod: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
        establishedYear: Number,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Department: Model<IDepartment> =
    mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);

export default Department;
