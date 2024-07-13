import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../db/db-connection";
import User from "../../db/models/user.model";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
