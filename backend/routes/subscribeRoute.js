import express from "express";
import { Subscriber } from "../model/subscribeModel.js";


const router = express.Router();

// Subscribe to Newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.json({ message: "Successfully subscribed to newsletters!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
