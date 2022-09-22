require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoute");
let userRoute = require("./routes/userRoute");

//let http = require("http").createServer(app);
//let io = require("socket.io")(http);​

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	setInterval(() => {
		socket.emit("number", new Date().toISOString());
	}, 1000);

	setInterval(() => {
		socket.emit("random_number", parseInt(Math.random() * 10));
	}, 8080);
});

app.use("/api/projects", projectRoutes);

app.use("/api/user", userRoute);

var port = process.env.port || 8080;

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
	var firstNumber = parseInt(req.params.firstNumber);
	var secondNumber = parseInt(req.params.secondNumber);
	var result = firstNumber + secondNumber || null;

	console.log(result);
	if (result == null) {
		res.json({ result: result, statusCode: 400 }).status(400);
	} else {
		res.json({ result: result, statusCode: 200 }).status(200);
	}
});

server.listen(port, () => {
	console.log("App running at http://localhost:" + port);
});
