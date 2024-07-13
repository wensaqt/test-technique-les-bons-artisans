"use client";
import { loginUser } from "@/app/api/auth/auth.req";
import { LoginData } from "@/common/interfaces/login.interface";
import CustomInput from "@/components/input/CustomInput";
import { setUser } from "@/store/auth-slice";
import { dispatch } from "@/store/store";
import { Box, Button, FormControl, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginData>();
  const router = useRouter();

  const emailController = {
    name: "email",
    control: control,
  };
  const passwordController = {
    name: "password",
    control: control,
  };

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const response = await loginUser(data);
    if (response.ok) {
      dispatch(setUser(response.user));
      router.push("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <FormControl className="bg-slate-200 w-1/3 p-4 rounded flex flex-col gap-4">
      <CustomInput
        controller={emailController}
        placeholder="Enter email here..."
      />
      <CustomInput
        controller={passwordController}
        placeholder="Enter password here..."
        type="password"
        visibilityToggle={true}
      />
      <Box className="flex justify-end">
        <Button
          className="w-1/3"
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </Box>
    </FormControl>
  );
};

export default LoginForm;
