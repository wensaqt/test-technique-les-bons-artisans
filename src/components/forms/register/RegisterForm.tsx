"use client";
import CustomInput from "@/components/input/CustomInput";
import { Box, Button, FormControl } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterData } from "@/common/interfaces/register.interface";
import { CustomController } from "@/components/input/CustomInput.types";
import { passwordRestrictions } from "../restrictions/password.restrictions";
import { emailRestrictions } from "../restrictions/email.restrictions";
import { nameRestrictions } from "../restrictions/name.restrictions";
import { registerUser } from "@/app/api/auth/auth.req";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    const response = await registerUser(data);
    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
  };

  const nameController: CustomController = {
    name: "name",
    control: control,
    rules: nameRestrictions,
  };
  const emailController: CustomController = {
    name: "email",
    control: control,
    rules: emailRestrictions,
  };
  const passwordController: CustomController = {
    name: "password",
    control: control,
    rules: passwordRestrictions,
  };

  return (
    <FormControl className="bg-slate-200 w-1/3 p-4 rounded flex flex-col gap-4">
      <CustomInput
        controller={nameController}
        placeholder="Enter username here..."
      />
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
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="w-1/3"
          variant="outlined"
        >
          Register
        </Button>
      </Box>
    </FormControl>
  );
};

export default RegisterForm;
