import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { createTask, getTasks } from "@/features/task/taskSlice";
import { toast } from "sonner";

const AddTask = ({dateQuery}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(createTask({ title: newTaskTitle }))
        .unwrap()
        .then(() => {
          dispatch(getTasks(dateQuery)); // gọi lại để refresh count
        })
        .catch(() => toast.error("Không thể thêm task!"));
      setNewTaskTitle("");
    } else {
      toast.error("Vui lòng nhập nội dung Task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Việc cần làm"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          
        />

        <Button variant="gradient" size="xl" className="px-6" onClick={addTask} disabled ={!newTaskTitle.trim()}>
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
