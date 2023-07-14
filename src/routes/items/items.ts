// Express
import { Request, Response, Router } from "express";
// Console colors
import chalk from "chalk";
import { API_MELI } from "../../constants";

const router = Router();

router.get("/api/items", async (req: Request, res: Response) => {
  const { search, firstname, lastname } = req.query;
  try {
    const response = await API_MELI.get(`search?q=${search}`, {});
    const author = { firstname, lastname };
    const categories = ["?", "?"];
    const items = response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      price: {
        currency: "ARS",
        amount: item.price,
        decimals: 0,
      },
    }));
    res.json({ author, categories, items });
  } catch (error) {
    console.error(chalk.redBright(error));
    res.status(500).json({ error: "Error al buscar el item" });
  }
});

router.get("/api/items/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ id });
});

export default router;
