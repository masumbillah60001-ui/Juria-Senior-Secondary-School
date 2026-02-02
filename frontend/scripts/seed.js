const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college_portal';

// Define schemas inline to avoid TS/Module issues in seed script
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    profile: {
        firstName: String,
        lastName: String,
        phone: String,
        dateOfBirth: Date,
        gender: String,
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
}, { timestamps: true });

const departmentSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    code: { type: String, unique: true },
    description: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String, unique: true },
    department: mongoose.Schema.Types.ObjectId,
    degree: String,
    duration: Number,
    totalSemesters: Number,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const subjectSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String, unique: true },
    course: mongoose.Schema.Types.ObjectId,
    semester: Number,
    credits: Number,
    type: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    studentId: { type: String, unique: true },
    admissionNumber: String,
    admissionDate: Date,
    course: mongoose.Schema.Types.ObjectId,
    department: mongoose.Schema.Types.ObjectId,
    semester: Number,
    section: String,
    batch: String,
    rollNumber: String,
    status: { type: String, default: 'active' },
}, { timestamps: true });

const facultySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    employeeId: { type: String, unique: true },
    joiningDate: Date,
    designation: String,
    department: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'active' },
}, { timestamps: true });

// Models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);

async function seed() {
    try {
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Department.deleteMany({});
        await Course.deleteMany({});
        await Subject.deleteMany({});
        await Student.deleteMany({});
        await Faculty.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Hash password
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create Admin User
        await User.create({
            email: 'admin@college.edu',
            password: hashedPassword,
            role: 'admin',
            profile: { firstName: 'Admin', lastName: 'User', phone: '9999999999', gender: 'male' },
        });
        console.log('✅ Created admin user');

        // Create Departments
        const departments = await Department.insertMany([
            { name: 'Computer Science', code: 'CS', description: 'CS Dept' },
            { name: 'Electronics', code: 'EC', description: 'EC Dept' },
            { name: 'Mechanical', code: 'ME', description: 'Mech Dept' },
        ]);
        console.log('✅ Created departments');

        // Create Courses
        const courses = await Course.insertMany([
            { name: 'B.Tech CS', code: 'BTCS', department: departments[0]._id, degree: 'UG', duration: 4, totalSemesters: 8 },
            { name: 'B.Tech EC', code: 'BTEC', department: departments[1]._id, degree: 'UG', duration: 4, totalSemesters: 8 },
        ]);
        console.log('✅ Created courses');

        // Create Subjects
        await Subject.insertMany([
            { name: 'Data Structures', code: 'CS201', course: courses[0]._id, semester: 3, credits: 4, type: 'both' },
            { name: 'DBMS', code: 'CS301', course: courses[0]._id, semester: 4, credits: 4, type: 'both' },
            { name: 'Circuits', code: 'EC201', course: courses[1]._id, semester: 3, credits: 4, type: 'theory' },
        ]);
        console.log('✅ Created subjects');

        // Create Faculty
        const facultyUser = await User.create({
            email: 'faculty@college.edu',
            password: hashedPassword,
            role: 'faculty',
            profile: { firstName: 'John', lastName: 'Smith', gender: 'male', dateOfBirth: new Date('1980-01-01') },
        });

        await Faculty.create({
            userId: facultyUser._id,
            employeeId: 'FAC001',
            joiningDate: new Date(),
            designation: 'Professor',
            department: departments[0]._id,
        });
        console.log('✅ Created faculty');

        // Create Students
        for (let i = 1; i <= 5; i++) {
            const studentUser = await User.create({
                email: `student${i}@college.edu`,
                password: hashedPassword,
                role: 'student',
                profile: { firstName: `Student`, lastName: `${i}`, gender: 'male', dateOfBirth: new Date('2000-01-01') },
            });

            await Student.create({
                userId: studentUser._id,
                studentId: `STU00${i}`,
                admissionNumber: `ADM00${i}`,
                admissionDate: new Date(),
                course: courses[0]._id,
                department: departments[0]._id,
                semester: 3,
                section: 'A',
                batch: '2024',
                rollNumber: `R00${i}`,
            });
        }
        console.log('✅ Created 5 students');

        // Create specific Demo Student
        const demoStudentUser = await User.create({
            email: 'student@college.edu',
            password: hashedPassword,
            role: 'student',
            profile: { firstName: 'Demo', lastName: 'Student', gender: 'female', dateOfBirth: new Date('2001-01-01') },
        });

        await Student.create({
            userId: demoStudentUser._id,
            studentId: 'STU0000',
            admissionNumber: 'ADM0000',
            admissionDate: new Date(),
            course: courses[0]._id, // BTCS
            department: departments[0]._id, // CS
            semester: 3,
            section: 'A',
            batch: '2024',
            rollNumber: 'R000',
        });
        console.log('✅ Created demo student (student@college.edu)');

        console.log('🎉 Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
