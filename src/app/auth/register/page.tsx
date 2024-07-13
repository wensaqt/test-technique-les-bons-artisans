"use client";
import RegisterForm from "@/components/forms/register/RegisterForm";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  return (
    <Box className="h-full w-full flex flex-col justify-center items-center">
      <RegisterForm />
      <Typography
        onClick={() => router.push("/auth/login")}
        className="cursor-pointer text-blue-500 mt-4"
      >
        Already have an account? Click here!
      </Typography>
    </Box>
  );
};

export default RegisterPage;
