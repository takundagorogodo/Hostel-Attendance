import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDb from "../config/db";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async()=>{
    try {
        await connectDb;

        const existingAdmin = await User.findOne({role:"admin"});

        if(existingAdmin){
            console.log("Admin already exists");
            process.exit();
        }

        const salt = await bcrypt.genSalt(process.env.HASH_KEY||10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,salt);

        const admin = await User.create({
            username:process.env.ADMIN_USERNAME,
            password:hashedPassword,
            role:"admin"
        });
        
        console.log("Admin created succesfully");
        console.log(admin);
        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();