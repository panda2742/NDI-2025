const express = require("express");
const path = require('path');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = require("http").createServer(app);


app.use('/api/chatbot', require('./routes/chatbot'));


app.use(function (req, res, next) {
	res.status(404);

	res.format({
		json: function () {
			res.json({ error: 'Not found' });
		},
		default: function () {
			res.type('txt').send('Not found');
		}
	})
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
	console.log("http://localhost:" + PORT);
});
