import { LoginData } from "@/common/interfaces/login.interface";
import { RegisterData } from "@/common/interfaces/register.interface";
import { redirect } from "next/navigation";

export const registerUser = async (data: RegisterData): Promise<Response> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("User registered successfully");
  } else {
    console.error("Error registering user");
  }

  return response;
};

export const loginUser = async (data: LoginData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return {
    ok: response.ok,
    user: result.user,
    token: result.token,
  };
};
