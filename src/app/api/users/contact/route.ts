import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
    try {
        await connect();
        const body = await req.json();

        // Save form data to MongoDB
        const newContact = new Contact(body);
        await newContact.save();

        return NextResponse.json({ message: "Form submitted successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error saving contact form:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connect();
        const contacts = await Contact.find();
        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error); // Now using the 'error' variable
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
