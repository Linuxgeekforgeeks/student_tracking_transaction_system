import express from "express"
import dotevn from "dotenv"

const app=express()

const PORT=process.env.PORT|| 4000

app.listen(PORT,()=>{
    console.log(`Our server is running on the port ${PORT}`)
})