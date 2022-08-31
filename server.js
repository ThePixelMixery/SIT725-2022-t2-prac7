require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoute");
let userRoute = require("./routes/userRoute");
let http = require("http").createServer(app);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/projects", projectRoutes);

app.use("/api/user", userRoute);

var port = process.env.port || 5500;

app.listen(port, () => {
	console.log("App running at http://localhost:" + port);
});
