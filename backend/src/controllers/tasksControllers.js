import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

// Hàm tái sử dụng để lấy lại toàn bộ dữ liệu
const getUserTasksData = asyncHandler(async (filter, userId) => {
  if (!userId) {
    res.status(404);
    throw new Error("Không xác thực được người dùng");
  }
  const now = new Date();
  let startDate;
  switch (filter) {
    case "day":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      const mondayDaTe =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDaTe);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default: {
      startDate = null;
    }
  }
  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  const result = await Task.aggregate([
    {
      $match: {
        user: userId,
        ...query,
      },
    },
    {
      $facet: {
        tasks: [{ $sort: { createdAt: -1 } }],
        activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
        completedCount: [
          { $match: { status: "complete" } },
          { $count: "count" },
        ],
      },
    },
  ]);

  // Phòng lỗi null / undefined
  const facet = result?.[0] || {};

  const tasks = facet.tasks || [];
  const activeCount = facet.activeCount?.[0]?.count || 0;
  const completeCount = facet.completedCount?.[0]?.count || 0;

  return { tasks, activeCount, completeCount };
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  const userId = req.user?._id;
  if (!userId) {
    res.status(401);
    throw new Error("Không xác thực được người dùng");
  }

  const data = await getUserTasksData(filter, userId);
  res.status(200).json(data);
});

export const createTask = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { title } = req.body;
  if (!userId) {
    res.status(401);
    throw new Error("Không xác thực được người dùng");
  }
  if (!title) {
    res.status(400);
    throw new Error("Vui lòng thêm tiêu đề!");
  }

  const createTask = await Task.create({
    title,
    user: req.user?._id,
  });

  if (!createTask) {
    res.status(500);
    throw new Error("Lỗi tạo mới task");
  }

  res.status(201).json(createTask);
});

export const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error("Không xác thực được người dùng!");
  }

  const { title, status, completedAt } = req.body;

  if (!title && !status && !completedAt) {
    res.status(400);
    throw new Error("Dữ liệu lỗi!");
  }

  const updateTask = await Task.findByIdAndUpdate(
    req.body.id,
    { title, status, completedAt },
    {
      new: true,
    }
  );

  if (!updateTask) {
    res.status(404);
    throw new Error("Cập nhật không thành công");
  }

  res.status(200).json(updateTask);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) {
    res.status(401);
    throw new Error("Không xác thực được người dùng");
  }

  if (!id) {
    res.status(400);
    throw new Error("Thiếu ID của task cần xóa");
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    res.status(404);
    throw new Error("Xóa không thành công");
  }

  res.status(200).json({
    message: "Xóa task thành công",
    id: req.params.id,
  });
});
