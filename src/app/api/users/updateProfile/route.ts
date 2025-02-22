import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { role, institution } = reqBody;

        if (!role || !institution) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.role = role;
        user.institution = institution;
        await user.save();

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error updating profile:", error); // Logs the error
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
