const express = require("express");
const cors = require("cors");
const {User,Store,Rating,}=require("./models/index")
const app = express();

app.use(cors());
app.use(express.json());



app.get("/health",(req,res)=>{
    res.send("ok")
    console.log("health ok")
})


app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/store", require("./routes/store.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/rating", require("./routes/rating.router"));



app.get("/", (req, res) => {
  res.send("Store Rating API Running...");
});


module.exports = app;
