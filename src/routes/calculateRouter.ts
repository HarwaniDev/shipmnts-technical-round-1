import express from "express";
import { prisma } from "../lib/prisma";
export const calculateRouter = express.Router();

calculateRouter.post("/", async (req, res) => {
    const { store_location, order_date, length, selections, extras } = req.body;

    const store = await prisma.store.findUnique({
        where: {
            store_location: store_location
        }
    });
    let rate = 0;
    selections.map(async (selection: any) => {
        selection.map(async (item: any) => {
            const selection_item = await prisma.item.findUnique({
                where: {
                    name: item
                }
            });
            if (length === "full") {
            rate += selection_item!.footlong
            } else if (length === "half") {
                rate += selection_item!.half
                // forgot to add 
            } else if (length === "") {
            }
        })
    })
})