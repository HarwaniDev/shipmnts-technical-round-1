import express from "express";
import { prisma } from "../lib/prisma";
export const router = express.Router();

router.post("/", async (req, res) => {
    const { store_location, currency, tax_percentage, premium_items } = req.body;
    try {
        const store = await prisma.store.findFirst({
            where: {
                store_location: store_location
            }
        });

        if (store) {
            return res.json({
                "success": false,
                "message": "Store with this location already exists",
            })
        };

        await prisma.store.create({
            data: {
                store_location: store_location,
                currency: currency,
                tax_percentage: tax_percentage,
                premium_items: premium_items
            }
        });
        return res.json(
            {
                "success": true,
                "message": "Store Created Successfully",
            }
        )
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Error adding store"
        });
    }
});

router.put("/:store_location", async (req, res) => {
    const { currency, tax_percentage, premium_items } = req.body;
    const store_location = req.params.store_location;

    try {
        await prisma.store.update({
            where: {
                store_location: store_location
            },
            data: {
                currency: currency,
                tax_percentage: tax_percentage,
                premium_items: premium_items
            }
        })
        return res.json({
            "success": true,
            "message": "Store Updated Successfully",
        });
    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: "error updating store details"
        })
    }
})


 
