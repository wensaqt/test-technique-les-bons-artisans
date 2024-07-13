import { Middleware } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

const authMiddleware: Middleware<{}, any> = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  const user = state.auth.user;

  if (!user) {
    console.log("User not authenticated, redirecting to login...");
    redirect("/auth/login");
  }

  return result;
};

export default authMiddleware;
