const getUser = (req, res) => {
	res.json({
		statusCode: 200,
		message: "Success",
		data: { name: "Aya", age: 27 },
	});
};

module.exports = {
	getUser,
};
