import { Router } from "express";
import { PostNumberServices } from "../services";

const postnumber = Router();

postnumber.use((req, res, next) => {
  console.log(`request postnumber at: ${new Date().toLocaleString()}`);
  next();
});

postnumber.get("/", async (req, res) => {
  try {
    const result = await PostNumberServices.get();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json("Not found");
  }
});

export default postnumber;
