// Express
import { Request, Response, Router } from "express";
// Console colors
import chalk from "chalk";
import { API_MELI } from "../../constants";

const router = Router();

/**
 * @endpoint /api/items&search=:search.
 * @description this endpoint do the logic for gettinng main products by a param search.
 * @return Type
 */
router.get("/api/items", async (req: Request, res: Response) => {
  const { search, firstname, lastname } = req.query;
  try {
    const { data } = await API_MELI.get(`sites/MLA/search?q=${search}`);
    const author = { firstname, lastname };
    const categories = ["Electronica", "Televisores", "Sony"];
    const items = data.results.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      place: item.address.state_name,
      price: {
        currency: "$",
        amount: item.price,
        decimals: 0,
      },
    }));
    console.log(chalk.blueBright("/api/items getting information succesfully"));
    res.status(200).json({ author, categories, items });
  } catch (error) {
    console.error(chalk.redBright(error));
    res.status(500).json({ error: "Error searching the items" });
  }
});

/**
 * @endpoint /api/items/:id.
 * @description this endpoint do the logic for gettinng product detail by a id.
 * @return Type
 */
router.get("/api/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname } = req.query;
  try {
    const { data: itemDetail } = await API_MELI.get(`items/${id}`);
    const { data: itemDetailDescription } = await API_MELI.get(
      `items/${id}/description`
    );
    const author = { firstname, lastname };
    const categories = ["Electronica", "Televisores", "Sony"];
    const item = {
      id: itemDetail.id,
      title: itemDetail.title,
      picture: itemDetail?.pictures[0]?.url || itemDetail.thumbnail,
      condition: itemDetail.condition,
      free_shipping: itemDetail.shipping.free_shipping,
      sold_quantity: itemDetail.sold_quantity,
      description: itemDetailDescription.plain_text,
      price: {
        currency: "$",
        amount: itemDetail.price,
        decimals: 0,
      },
    };
    console.log(
      chalk.blueBright(`/api/items/${id} getting information succesfully`)
    );
    res.status(200).json({ author, categories, item });
  } catch (error) {
    console.error(chalk.redBright(error));
    res.status(500).json({ error: "Error searching the item detail" });
  }
  res.json({ id });
});

export default router;
