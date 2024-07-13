"use client";
import LoginForm from "@/components/forms/login/LoginForm";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <Box className="h-full w-full flex-col flex items-center">
      <LoginForm />
      <Typography
        onClick={() => router.push("/auth/register")}
        className="cursor-pointer text-blue-500 mt-4"
      >
        No account yet? Click here!
      </Typography>
    </Box>
  );
};

export default LoginPage;
