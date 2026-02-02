import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'faculty' | 'student';
    profile: {
        firstName: string;
        lastName: string;
        avatar?: string;
        phone?: string;
        dateOfBirth?: Date;
        gender?: 'male' | 'female' | 'other';
        address?: {
            street?: string;
            city?: string;
            state?: string;
            pincode?: string;
        };
    };
    isActive: boolean;
    isVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        role: {
            type: String,
            enum: ['admin', 'faculty', 'student'],
            default: 'student',
            required: true,
        },
        profile: {
            firstName: {
                type: String,
                required: [true, 'First name is required'],
                trim: true,
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required'],
                trim: true,
            },
            avatar: String,
            phone: String,
            dateOfBirth: Date,
            gender: {
                type: String,
                enum: ['male', 'female', 'other'],
            },
            address: {
                street: String,
                city: String,
                state: String,
                pincode: String,
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        lastLogin: Date,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};

// Virtual for full name
userSchema.virtual('fullName').get(function () {
    return `${this.profile.firstName} ${this.profile.lastName}`;
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
