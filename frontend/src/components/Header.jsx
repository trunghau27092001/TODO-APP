import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="space-y-2 text-center flex justify-between">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        Todo App
      </h1>
      {user && (
        <div className="flex gap-2 items-center">
        <Avatar className="size-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4 text-primary">
          <p style={{ fontSize: "16px" }}>Welcome, {user.name}</p>
          <Button
            className="bg-transparent text-primary bg-clip-padding cursor-pointer hover:text-primary-foreground"
            onClick={onLogout}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Header;
