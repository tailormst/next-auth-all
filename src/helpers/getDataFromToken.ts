import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value || ""; // Encoded token

        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };

        return decodedToken.id;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while verifying token.");
    }
};
