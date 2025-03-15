const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected for Data Seeding"))
.catch(err => console.error("MongoDB Connection Error:", err));

const seedUsers = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const users = [
        { username: "admin", password: hashedPassword },
        { username: "user1", password: hashedPassword }
    ];
    await User.insertMany(users);
    console.log("Users seeded successfully");
};

const seedStudents = async () => {
    const students = [
        { name: "Geerthi", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fstudent%2F&psig=AOvVaw0p6_xT6tJILdstiTVP-fiy&ust=1742109138187000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDLjrPEi4wDFQAAAAAdAAAAABAE", age: 20, status: "Active" },
        { name: "Jenu", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fstudent%2520png&psig=AOvVaw0p6_xT6tJILdstiTVP-fiy&ust=1742109138187000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDLjrPEi4wDFQAAAAAdAAAAABAJ", age: 22, status: "Inactive" },
        { name: "Gobi", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-psd%2Fhappy-young-indian-college-student-png_371906277.htm&psig=AOvVaw0p6_xT6tJILdstiTVP-fiy&ust=1742109138187000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDLjrPEi4wDFQAAAAAdAAAAABAP", age: 19, status: "Active" },
        { name: "Raja", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fyoung-asian-indian-student-with-glasses-backpack-holds-laptop-shows-thumbs-up-sign_46354153.htm&psig=AOvVaw0p6_xT6tJILdstiTVP-fiy&ust=1742109138187000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDLjrPEi4wDFQAAAAAdAAAAABAV", age: 21, status: "Inactive" }
    ];
    await Student.insertMany(students);
    console.log("Students seeded successfully");
};

const seedDatabase = async () => {
    await seedUsers();
    await seedStudents();
    mongoose.disconnect();
};

seedDatabase().catch(err => console.log(err));