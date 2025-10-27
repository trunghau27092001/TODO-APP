import React, { useState } from "react";
import { Card } from "./ui/card";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { deleteTask, getTasks, updateTask } from "@/features/task/taskSlice";
import { toast } from "sonner";

const TaskCard = ({ task, index, dateQuery}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskEdit, setTaskEdit] = useState({
    title: task.title || "",
    completedAt: task.completedAt,
    status: task.status,
  });

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id))
      .unwrap()
      .then(() => {
        dispatch(getTasks(dateQuery)); // gọi lại để refresh count
      })
      .catch(() => toast.error("Không thể xóa task!"));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    }
  };

  const handleUpdateTask = () => {
    setIsEditing(false);
    dispatch(
      updateTask({
        id: task._id,
        title: taskEdit.title,
        completedAt: taskEdit.completedAt,
        status: taskEdit.status,
      })
    )
      .unwrap()
      .then(() => dispatch(getTasks(dateQuery)))
      .catch(() => toast.error("Cập nhật thất bại!"));
  };

  const handleToggleStatus = () => {
    dispatch(
      updateTask(
        task.status === "complete"
          ? {
              id: task._id,
              status: "active",
              completedAt: null,
            }
          : {
              id: task._id,
              status: "complete",
              completedAt: new Date().toISOString(),
            }
      )
    )
      .unwrap()
      .then(() => dispatch(getTasks()))
      .catch(() => toast.error("Không thể cập nhật trạng thái!"));
  };

  const onChange = (e) => {
    //set lại dữ liệu (function setFormData) từ dữ liệu trên form (...prevState: để giữ đầy đủ props của object)
    setTaskEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200 ",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={handleToggleStatus}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5 " />
          )}
        </Button>

        <div className="flex-1 min-w-0 ">
          {isEditing ? (
            <Input
              placeholder="Nội dung task"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={taskEdit.title}
              name="title"
              onChange={onChange}
              autoFocus
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setTaskEdit((prev) => ({
                  title: task.title || "",
                  ...prev,
                }));
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString("vi-VN")}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <CheckCircle2 className="size-3 text-success" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString("vi-VN")}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setTaskEdit((prev) => ({
                title: task.title || "",
                ...prev,
              }));
            }}
            disabled = {task.status === 'complete'}
          >
            <SquarePen className="size-4 " />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => handleDeleteTask()}
            disabled = {task.status === 'complete'}
          >
            <Trash2 className="size-4 " />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
