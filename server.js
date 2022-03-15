const express = require("express")
require("dotenv").config()
const dbConnect = require("./config/dbConn")
const cors = require('cors')

const app = express()
dbConnect()
app.use(cors())
app.use(express.json())

const PathRoute = require("./Routes/PathRoutes")
const TaskRoute = require("./Routes/TaskRouter")
const ColumnRoute = require("./Routes/ColumnRoute")

app.get("/", (req, res) => {
    res.send("Welcome to Todo List by eWise Solutions")
})
app.use("/path", PathRoute)
app.use("/task", TaskRoute)
app.use("/column", ColumnRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server has been Started on http://localhost:${process.env.PORT}`);
})