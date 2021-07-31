import { Router } from "express";
import { StatisticsServices } from "../services";

const statistics = Router();

enum SubPathes {
  TOP_CREATORS = "/topcreators",
  RUN_TIMES = "/runtimes",
}

statistics.use((req, res, next) => {
  console.log(`request statistics at: ${new Date().toLocaleString()}`);
  next();
});

statistics.get(SubPathes.TOP_CREATORS, async (req, res) => {
  try {
    const result = await StatisticsServices.getTopCreators();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json("Not found");
  }
});

statistics.get(SubPathes.RUN_TIMES, async (req, res) => {
  try {
    const methodName = String(req.query.methodName);

    const result = await StatisticsServices.getAverageRuntime(methodName);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json("Not found");
  }
});

export default statistics;
