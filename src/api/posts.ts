import { Router } from "express";
import { PostServices } from "../services";

const posts = Router();

posts.use((req, res, next) => {
  console.log(`request posts at: ${new Date().toLocaleString()}`);
  next();
});

posts.get("/", async (req, res) => {
  try {
    const offset: number = +req.query.offset;
    const limit: number = +req.query.limit;

    const result = await PostServices.getList(offset, limit);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json("Not found");
  }
});

posts.post("/", async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      body: req.body.body,
      creatorName: req.body.creatorName,
    };

    if (
      Object.values(post).some((value) => value === null || value === undefined)
    ) {
      res.status(422).json("missing properties");
      return;
    }

    await PostServices.insert(post);

    res.status(201).json("post added");
  } catch (error) {
    res.status(404).json("Not found");
  }
});

export default posts;
