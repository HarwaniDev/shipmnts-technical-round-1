import express from "express";
export const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "get method for user route"
    }).status(200);
});

