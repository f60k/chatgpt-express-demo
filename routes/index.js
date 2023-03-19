const express = require("express");
const router = express.Router();

// const app = express();
// const request = require("request");
// const bodyParser = require("body-parser");

// const app = require("app.js");
const react = require("react");
const { render } = require("react-dom");

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");

const KEY = "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";

const configuration = new Configuration({
	apiKey: KEY,
});

const openai = new OpenAIApi(configuration);

// const { JSDOM } = require("jsdom");

let todos = [];

async function ask(query, res, redirect, model = "gpt-3.5-turbo-0301") {
	const response = await openai.createChatCompletion({
		model: model,
		messages: [{ role: "user", content: query }],
	});

	const answer =
		"(Q:" + query + ")" + response.data.choices[0].message?.content;
	console.log(answer);
	todos.push(answer);
	res.redirect(redirect);
}

router.get("/", function (req, res, next) {
	res.render("index", {
		title: "CHAT GPT REQ",
		todos: todos,
	});
	console.log("GET");
});

router.get("/med", function (req, res, next) {
	res.render("med", {
		title: "MEDICAL",
		todos: todos,
	});
	console.log("GET");
});

router.post("/", function (req, res, next) {
	const where = req.body.where;
	const what = req.body.what;
	// todos.push(todo);

	query = where + "の" + what + "の人気スポットを５件知りたい。";
	console.log("query is " + query);
	ask(query, res, '/');
	// res.redirect("/");
});

router.post("/med", function (req, res, next) {
	const where = req.body.where;
	const what = req.body.what;
	// todos.push(todo);

	query = where + "の" + what + "を教えて。";
	console.log("query is " + query);
	ask(query, res, '/med');
	// res.redirect("/");
});

module.exports = router;
