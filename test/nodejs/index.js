const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
});

app.set("view engine", "ejs");

app.use("/script/test", express.static("test/views"));
app.use("/ardime", express.static("src"));

app.get("/", (req, res) => {
	res.render("test");
});
