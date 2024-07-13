import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../db/db-connection";
import User, { IUser } from "../../db/models/user.model";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  const userWithoutPassword: Partial<IUser> = {
    _id: user._id,
    email: user.email,
  };

  return NextResponse.json(
    { token, user: userWithoutPassword },
    { status: 200 }
  );
}
