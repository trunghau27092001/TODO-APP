import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { reset, getTasks } from "../features/task/taskSlice";
import { toast } from "sonner";
import { visibleTaskLimit } from "@/lib/data";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const { tasks, activeCount, completeCount } = useSelector(
    (state) => state.task.tasksList
  );
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");
  const [page, setPage] = useState(1);

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTasks(dateQuery));
    }

    return () => {
      dispatch(reset(dateQuery));
    };
  }, [navigate, user, dispatch, isError, message, dateQuery]);

  useEffect(()=>{
    setPage(1)
  }, [filter])
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

 
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChanged = (pageNumber) => {
    setPage(pageNumber);
  };

   if(visibleTasks.length===0)
  {
    handlePrevPage()
  }

  if (isLoading) {
    return (
      <Spinner className="size-10 text-purple-500 flex justify-center items-center min-h-screen bg-transparent dark:bg-zinc-950 mx-auto relative z-10" />
    );
  }
  return (
    <div className="container mx-auto relative z-10">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6 flex flex-col h-screen justify-between gap-10">
        <div className="flex flex-col gap-8">
          <Header />

          <AddTask dateQuery={dateQuery} />

          <StatsAndFilter
            activeTaskCount={activeCount}
            completedTaskCount={completeCount}
            filter={filter}
            setFilter={setFilter}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            dateQuery={dateQuery}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageChanged={handlePageChanged}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
