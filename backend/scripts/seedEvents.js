const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Event = require('../models/Event');
const User = require('../models/User');

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedEvents = async () => {
    await connectDB();

    try {
        // Find admin user
        const admin = await User.findOne({ email: 'admin@wellness.com' });

        if (!admin) {
            console.error('Admin user not found. Please run createRoles.js first.');
            process.exit(1);
        }

        const events = [
            {
                title: "eSports Tournament - Gaming for Wellness",
                date: "2025-09-06",
                time: "All Day",
                location: "SVNIT Campus",
                description: "The Wellness Club embraced the world of eSports with an exciting two-day gaming festival. Students participated in competitive battles, community gaming sessions, and stress-relief activities through gaming.",
                tags: ["Gaming", "eSports", "Community", "Entertainment"],
                images: ["/esports_1.png"],
                image: "/esports_1.png",
                isFeatured: true,
                status: "closed",
                registrationLimit: 200,
                organizer: admin._id
            },
            {
                title: "Session on Suicide Prevention",
                date: "2025-09-10",
                time: "5:00 PM",
                location: "Seminar Hall",
                description: "A crucial dialogue on mental health, hope, and supporting one another. Together we can break the stigma.",
                tags: ["Mental Health", "Awareness", "Support"],
                images: ["/suicide_prevention.png"],
                image: "/suicide_prevention.png",
                isFeatured: true,
                status: "closed",
                registrationLimit: 150,
                organizer: admin._id
            },
            {
                title: "Stress Management Session",
                date: "2025-10-05",
                time: "6:00 PM",
                location: "Yoga Hall",
                description: "Learn ancient techniques to handle academic pressure. Conducted by Gayatri Pariwar.",
                tags: ["Wellness", "Workshop", "Stress Relief"],
                images: ["/stress_management.png"],
                image: "/stress_management.png",
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Lifestyle Disease Awareness",
                date: "2025-10-12",
                time: "10:00 AM",
                location: "Main Auditorium",
                description: "Expert talk by Dr. Sanjay Shah on preventing modern lifestyle ailments. A two-part lecture series.",
                tags: ["Health", "Seminar", "Education"],
                images: ["/lifestyle_wellness.png"],
                image: "/lifestyle_wellness.png",
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Physiotherapy Session",
                date: "2025-10-20",
                time: "4:00 PM",
                location: "Health Center",
                description: "Corrective posture and mobility session for students to combat long study hours.",
                tags: ["Health", "Physical", "Workshop"],
                images: ["/physiotherapy.png"],
                image: "/physiotherapy.png",
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Eyes & Dental Checkup",
                date: "2025-11-05",
                time: "9:00 AM",
                location: "Dispensary",
                description: "Comprehensive vision and dental screening camp for all students and staff.",
                tags: ["Health", "Checkup", "Medical"],
                images: ["/eye_dental_camp.png"],
                image: "/eye_dental_camp.png",
                isFeatured: true,
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Special Eyes Checkup",
                date: "2025-11-06",
                time: "10:00 AM",
                location: "Dispensary",
                description: "Advanced vision testing and glaucoma screening for faculty and students.",
                tags: ["Health", "Checkup", "Medical"],
                images: ["/eye_dental_camp.png"],
                image: "/eye_dental_camp.png",
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Session on Universal Brotherhood",
                date: "2025-11-14",
                time: "6:30 PM",
                location: "Open Air Theatre",
                description: "Celebrating unity and oneness beyond boundaries. A spiritual gathering for peace.",
                tags: ["Spiritual", "Community", "Peace"],
                images: ["/universal_brotherhood.png"],
                image: "/universal_brotherhood.png",
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Blood Donation Camp 2.0",
                date: "2025-09-17",
                time: "10:00 AM - 5:00 PM",
                location: "Staff Club, SVNIT",
                description: "A mega blood donation drive under 'Raktadaan Amrit Mahotsav 2.0,' encouraging students and staff to donate blood and save lives.",
                tags: ["Healthcare", "Social Cause", "Donation"],
                images: ["/blood_1.png"],
                image: "/blood_1.png",
                isFeatured: true,
                status: "closed",
                organizer: admin._id
            },
            {
                title: "Mental Health Session (Talk to Angel)",
                date: "2025-12-10",
                time: "11:00 AM",
                location: "MTB Seminar Room",
                description: "Special session in Mechanical Dept. on mental wellness and counseling by 'Talk to Angel'.",
                tags: ["Mental Health", "Counseling", "Workshop"],
                images: ["/mental_health_angel.png"],
                image: "/mental_health_angel.png",
                isFeatured: true,
                status: "closed",
                organizer: admin._id
            },
            {
                title: "NAAD — Musical Concert",
                date: "2025-11-09",
                time: "7:00 PM",
                location: "Canteen Cements",
                description: "NAAD is a full-fledged musical concert organized by the Wellness Club. Theme: 'Come connect heart with happiness, dance with divinity.'",
                tags: ["Music", "Concert", "Cultural"],
                images: ["/naad_concert.png"],
                image: "/naad_concert.png",
                isFeatured: true,
                status: "closed",
                organizer: admin._id
            }
        ];

        // Clear existing events? Maybe not, or yes to avoid duplicates
        await Event.deleteMany({});
        console.log('Cleared existing events...');

        await Event.insertMany(events);
        console.log('✅ Events Seeded Successfully');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedEvents();
