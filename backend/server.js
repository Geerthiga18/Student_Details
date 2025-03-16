const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');


dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true
}));

app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); 
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);


app.get("/", (req, res) => {
    res.send("Server is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
