import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";
import { use } from "react";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        

        // find email is already exist or not
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, {status: 400})
        }

        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            return NextResponse.json({error: "Password does not match"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login Successfully",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}