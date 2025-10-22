import mongoose from 'mongoose'
import chalk from 'chalk'

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)     

        console.log(chalk.cyan.underline(`Liên kết database thành công`))
    } catch (error) {
        console.log("Lỗi kết nối database: ", error)
        process.exit(1)
    }
}