import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmpty = ({filter}) => {
  return (
    <Card
        className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >
        <div className="space-y-3">
            <Circle className='size-12 mx-auto text-muted-foreground'/>
            
            <div>
                <h3 className='font-medium text-foreground'>
                    {
                       filter === "active"
                        ? "Không có task đang làm"
                        : filter === "complete"
                        ? "Chưa có task hoàn thành"
                        : filter === "cancel"
                        ? "Không có task đã hủy"
                        : "Không có task"
                    }
                    <p className="text-sm text-muted-foreground">
                        {
                            filter === "all"
                                ? "Thêm task"
                                : `Chuyển sang trạng thái "Tất cả" để thấy toàn bộ nhiệm vụ ${
                                    filter ==='active'? "đã hoàn thành" : "đang làm"
                                }`
                        }
                    </p>
                </h3>
            </div>
        </div>

    </Card>
  )
}

export default TaskEmpty