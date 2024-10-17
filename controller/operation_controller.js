const connection = require('../utils/database');
const { isEmpty } = require('../utils/object_isEmpty');
const { ADD_ASSET } = require('../validation/asset');

exports.add_asset = (req, res, next) => {

    if (isEmpty(req.body)) {
        res.status(401).json({
            status: false,
            message: "Object is empty"
        })
    }

    try {

        const { error } = ADD_ASSET.validate(req.body);

        if (error) return res.status(402).json({ status: false, message: "Invalid request data", error: error.details[0].message });

        connection.query("SELECT * FROM user WHERE id = ?", [[req.body.userId]], async (err, data, fields) => {
            if (err) return res.status(500).json({ status: false, message: "Server error" });

            if (data.length == 0) return res.status(409).json({ status: false, message: "User does not exist" });

            connection.query("INSERT INTO asset VALUES(Null, ?)", [[req.body.amount, req.body.date, req.body.assetType, req.body.type, req.body.description, req.body.userId]], (err, data, fields) => {
                if (err) return res.status(500).json({ status: false, message: "Server error" });
    
                res.status(200).json({
                    status: true,
                    message: "Successfully Added!"
                })
            })
        })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error" });
    }

}

exports.get_recent_asset = (req, res, next) => {

    try {

        connection.query("SELECT * FROM asset", async (err, data, fields) => {
            if (err) return res.status(500).json({ status: false, message: "Server error" });

            res.status(200).json({
                status: true,
                message: "Recent Expenses and Income",
                data: data
            })
        })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error" });
    }

}

exports.get_dashboard_data = (req, res, next) => {

    let income = 0;
    let expense = 0;

    try {

        connection.query("SELECT * FROM asset limit 8", async (err, data1, fields) => {
            if (err) return res.status(500).json({ status: false, message: "Server error" });

            connection.query("SELECT * FROM asset", async (err, data2, fields) => {
                if (err) return res.status(500).json({ status: false, message: "Server error" });

                for (let i = 0; i < data2.length; i++) {
                    if (data2[i].assetType == "Income") {
                        income += data2[i].amount;
                    } else {
                        expense += data2[i].amount;
                    }
                }

                res.status(200).json({
                    status: true,
                    message: "Recent Expenses and Income",
                    data: data1,
                    income: income,
                    expense: expense
                })
            });
        })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error" });
    }

}

