const db = require('../db');

exports.anything = async (req, res) => {

	return res.status(200).json({ details: "Y'a r pour le moment" });

}
