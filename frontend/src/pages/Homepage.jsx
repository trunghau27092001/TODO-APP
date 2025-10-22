import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Homepage = () => {

  const [taskBuffer, setTaskBuffer] = useState([])

  useEffect(()=>{
    fetchTask()
  },[])
  
  const fetchTask = async() => {
    try {
      const res = await fetch("http://localhost:8080/api/tasks")
      const data = await res.json()
      setTaskBuffer(data.task)
    } catch (error) {
       console.error("Lỗi gọi tasks: ", error)
       toast.error("Lỗi khi truy xuất tasks.")
    }
  }


  return (
    <div className="min-h-screen w-full relative">
    {/* Mint Fresh Breeze Background */}
    <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
    }}
  />
    <div className="container mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6 flex flex-col h-screen justify-between gap-10">
          <div className="flex flex-col gap-8">
            <Header/>

          <AddTask/>

            <StatsAndFilter/>

            <TaskList/>

            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination/>
              <DateTimeFilter/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
  </div>
  )
}

export default Homepage