import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAttendance extends Document {
    student: mongoose.Types.ObjectId;
    subject: mongoose.Types.ObjectId;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    markedBy: mongoose.Types.ObjectId;
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
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
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            required: true,
        },
        markedBy: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        remarks: String,
    },
    {
        timestamps: true,
    }
);

// Compound index for unique attendance per student per subject per date
attendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: -1 });

const Attendance: Model<IAttendance> =
    mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', attendanceSchema);

export default Attendance;
