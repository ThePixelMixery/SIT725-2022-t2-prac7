require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
let projectCollection;
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//connection
const uri =
	"mongodb+srv://" +
	process.env.mongo_user +
	":" +
	process.env.mongo_password +
	"@prac4.th6vaw0.mongodb.net/SIT725_2022_t1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var port = process.env.port || 3000;
const cardList = [
	{
		title: "Pumpkin",
		image: "images/dog3.jpg",
		link: "About Pumpkin",
		description: "Pumpkin is a puppy",
	},
	{
		title: "Roxy",
		image: "images/dog4.jpg",
		link: "About Roxy",
		description: "Roxy is a puppy",
	},
];
app.get("/api/projects", (req, res) => {
	res.json({ statusCode: 200, data: cardList, message: "Success" });
});
const createColllection = (collectionName) => {
	client.connect((err, db) => {
		projectCollection = client.db().collection(collectionName);
		if (!err) {
			console.log("MongoDB Connected");
		} else {
			console.log("DB Error: ", err);
			process.exit(1);
		}
	});
};
const insertProjects = (project, callback) => {
	projectCollection.insert(project, callback);
};
const getProjects = (callback) => {
	projectCollection.find({}).toArray(callback);
};
app.post("/api/projects", (req, res) => {
	console.log("New Project added", req.body);
	var newProject = req.body;
	insertProjects(newProject, (err, result) => {
		if (err) {
			res.json({ statusCode: 400, message: err });
		} else {
			res.json({
				statusCode: 200,
				message: "Project Successfully added",
				data: result,
			});
		}
	});
});
app.listen(port, () => {
	console.log("App running at http://localhost:" + port);
	createColllection("pets");
});
