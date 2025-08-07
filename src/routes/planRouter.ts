import express from "express";
import { prisma } from "../lib/prisma";
export const planRouter = express.Router();

planRouter.post("/", async (req, res) => {
    const { store_location, valid_from, valid_to, items } = req.body;


    try {
        const store = await prisma.store.findUnique({
            where: {
                store_location: store_location
            }
        });
        if (!store) {
            res.json({
                success: false,
                message: "Store not available"
            })
        };
        items.map(async (item: {
            category: string;
            name: string;
            half_price: number;
            full_price: number,
            extra_charge: number

        }) => {
            const plan = await prisma.plan.create({
                data: {
                    store_id: store!.id,
                    valid_from: new Date(valid_from),
                    valid_to: new Date(valid_to),
                    categories: {
                        create: {
                            name: item.category,
                            items: {
                                create: {
                                    name: item.name,
                                    half: item.half_price,
                                    footlong: item.full_price,
                                    extra: item.extra_charge,
                                }
                            }
                        }
                    }
                }
            })
            return res.json({
                "plan_id": plan.id,
                "store_location": store_location,
                "success": true,
                "message": "Plan Created Successfully",
            })
        })

    } catch (error) {
        return res.json({
            success: false,
            message: "Plan not created successfully"
        })
    }
})


planRouter.get("/:plan_id", async (req, res) => {
    try {
        const plan = await prisma.plan.findUnique({
            where: {
                id: Number(req.params.plan_id)
            },
            include: {
                categories: {
                    include: {
                        items: true
                    }
                },
                store: true
            }
        });
        const items = plan?.categories.map((category) => {
            const response = category.items.map((item) => ({
                    "category": category.name,
                    "name": item.name,
                    "half_price": item.half,
                    "full_price": item.footlong,
                    "extra_charge": item.extra ?? 0
            }))
            return response;
        })
        console.log(items);
        
        const response = {
            "plan_id": req.params.plan_id,
            "store_location": plan?.store.store_location,
            "valid_from": plan?.valid_from,
            "valid_to": plan?.valid_to,
            "items": items
        }
        return res.json(response);
    } catch (error) {
        return res.json({
            success: false,
            message: "error getting response"
        })
    }
})