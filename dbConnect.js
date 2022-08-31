require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const uri =
	"mongodb+srv://" +
	process.env.mongo_user +
	":" +
	process.env.mongo_password +
	"@prac4.th6vaw0.mongodb.net/?retryWrites=true&w=majority"; // replace it with the url you get from mongo atlas
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, db) => {
	if (!err) {
		console.log("Database Connected");
	} else {
		console.log("[error]", err);
	}
});

exports.mongoClient = client;
