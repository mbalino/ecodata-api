const Dollar = require("../models/dollar");

class DollarController {

    getDollar = async (req, res) => {
        const password = req.query.password;
        const dollarDate = req.params.doldate;

        let query = {
            d: dollarDate
        };

        if ( password !== process.env.VALIDATION_PASSWORD ) {
            query.answer = { $ne: null };
        }

        const dolQuote = await Dollar.find(query);

        return res.json(dolQuote);
    };

    getDollarAll = async (req, res) => {
        const password = req.query.password;

        let query = {};

        if ( password !== process.env.VALIDATION_PASSWORD ) {
            query.answer = { $ne: null };
        }

        const dolQuote = await Dollar.find(query).sort({
            d: 1
        });

        return res.json(dolQuote);
    };
}

module.exports = DollarController;
