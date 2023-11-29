const express = require("express");
const { auth } = require("../middlewares/auth");
const { cakeValid, CakeModel } = require("../models/cakeModel")
const jwt = require('jsonwebtoken');
const router = express.Router();


router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 4;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try {
        let data = await CakeModel
            .find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }

})
router.post("/", auth, async (req, res) => {
    let valdiateBody = cakeValid(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details)
    }
    try {
        let cake = new CakeModel(req.body);
        cake.user_id = req.tokenData.id;
        await cake.save();
        res.status(201).json(cake)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})
router.get("/search", async (req, res) => {
    try {
        let queryS = req.query.s;
        // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
        // i -> מבטל את כל מה שקשור ל CASE SENSITVE
        let searchReg = new RegExp(queryS, "i")
        let data = await CakeModel.find({ name: searchReg })
            .limit(50)
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.put("/:idEdit", auth, async (req, res) => {
    let valdiateBody = cakeValid(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details)
    }
    let token = req.header("x-api-key");
    let idEdit = req.params.idEdit;
    try {
        let tokenData = jwt.verify(token, "BatShevaSecret");
        let data = await CakeModel.findOne({ _id: idEdit });
        if (data.user_id != tokenData.id) {
            console.log("Error updating, it's not your cake!");
            res.status(555).json({ msg: "Error updating, it's not your cake!" })
            return;
        }
        let data1 = await CakeModel.updateOne({ _id: idEdit, user_id: tokenData.id }, req.body)
        // if (!data1) {
        //     console.log("Error updating, There is not this cakes...");
        //     res.status(401).json({ msg: "Error updating, There is not this cakes...", err })
        //     return;
        // }

        res.json(data1);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

router.delete("/:idDel", auth, async (req, res) => {
    let idDel = req.params.idDel
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let tokenData = jwt.verify(token, "BatShevaSecret");
        console.log(tokenData);
        let data = await CakeModel.deleteOne({ _id: idDel, user_id: tokenData.id })
        if (!data) {
            console.log("Error deleting, it's not your cake!");
            res.status(555).json({ msg: "Error deleting, it's not your cake!", err })
            return;

        }
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

module.exports = router;