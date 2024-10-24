import dbconnect from "@/lib/dbconnect";
import UserModel from "@/Models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbconnect();
    try {
        const { username, email, password } = await request.json();

        // Check if a user with the same verified username already exists
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username is already taken and verified"
                },
                {
                    status: 400
                }
            );
        }

        // Check if a user with the same email already exists
        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email already exists"
                },
                {
                    status: 400
                }
            );
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully. Please login."
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Error while registering user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while registering the user."
            },
            {
                status: 500
            }
        );
    }
}
