const connection = require('../utils/database');
const { isEmpty } = require('../utils/object_isEmpty');
const { ADD_ASSET } = require('../validation/asset');

exports.add_asset = (req, res, next) => {
    console.log(req.body.userId)

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
            console.log("Hii1", err)
            if (err) return res.status(500).json({ status: false, message: "Server error" });
            console.log("Hii2")

            if (data.length == 0) return res.status(409).json({ status: false, message: "User does not exist" });

            connection.query("INSERT INTO asset VALUES(Null, ?)", [[req.body.amount, req.body.date, req.body.assetType, req.body.type, req.body.description, req.body.userId]], (err, data, fields) => {
                if (err) return res.status(500).json({ status: false, message: "Server error" });
    
                res.status(200).json({
                    status: true,
                    message: "Asset Added Success"
                })
            })
        })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error" });
    }

}
