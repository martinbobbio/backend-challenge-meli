// Express
import { Request, Response, Router } from "express";
// Constants
import { API_MELI } from "../../constants";
// Utils
import { getTopNRepeatedStrings } from "../../utils";
// Console colors
import chalk from "chalk";

const router = Router();

/**
 * Route handler for retrieving item list information from API of Mercado Libre.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<void>} Promise that resolves once the item list information is retrieved.
 */
router.get("/api/items", async (req: Request, res: Response) => {
  const { search, firstname, lastname } = req.query;
  const LIMIT_ITEMS = 4;

  // Getting item list
  try {
    const { data: itemList } = await API_MELI.get(
      `sites/MLA/search?q=${search}`
    );
    itemList.results = itemList.results.slice(0, LIMIT_ITEMS);
    const author = { firstname, lastname };
    let categories = [];
    const items = itemList.results.map((item) => ({
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

    // Getting categories
    try {
      const promises = itemList.results.map(async (item) => {
        const { data: itemCategory } = await API_MELI.get(
          `categories/${item.category_id}`
        );
        return itemCategory.name;
      });

      const categoriesSearch = await Promise.all(promises);
      categories = getTopNRepeatedStrings(categoriesSearch, 3);
    } catch (error) {
      console.error(
        chalk.redBright(`Error searching the item list categories ${error}`)
      );
    }

    console.log(chalk.blueBright("/api/items getting information succesfully"));
    res.status(200).json({ author, categories, items });
  } catch (error) {
    console.error(chalk.redBright(error));
    console.error(chalk.redBright(`Error searching the item list ${error}`));
    res.status(500).json({ error: "Error searching the item list" });
  }
});

/**
 * Route handler for retrieving item detail information from API of Mercado Libre.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<void>} Promise that resolves once the item detail information is retrieved.
 */
router.get("/api/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname } = req.query;

  // Getting item detail
  try {
    const { data: itemDetail } = await API_MELI.get(`items/${id}`);

    const author = { firstname, lastname };
    const categories = [];
    const item = {
      id: itemDetail.id,
      title: itemDetail.title,
      picture: itemDetail?.pictures[0]?.url || itemDetail.thumbnail,
      condition: itemDetail.condition,
      free_shipping: itemDetail.shipping.free_shipping,
      sold_quantity: itemDetail.sold_quantity,
      description: "",
      price: {
        currency: "$",
        amount: itemDetail.price,
        decimals: 0,
      },
    };

    // Getting categories
    try {
      const { data: itemDetailCategories } = await API_MELI.get(
        `categories/${itemDetail.category_id}`
      );
      itemDetailCategories?.path_from_root?.map((category) => {
        categories.push(category.name);
      });
    } catch (error) {
      console.error(
        chalk.redBright(`Error searching the item detail categories ${error}`)
      );
    }

    // Getting description
    try {
      const { data: itemDetailDescription } = await API_MELI.get(
        `items/${id}/description`
      );
      item.description = itemDetailDescription?.plain_text;
    } catch (error) {
      console.error(
        chalk.redBright(`Error searching the item detail description ${error}`)
      );
    }

    console.log(
      chalk.blueBright(`/api/items/${id} getting information succesfully`)
    );
    res.status(200).json({ author, categories, item });
  } catch (error) {
    console.error(chalk.redBright(error));
    console.error(chalk.redBright(`Error searching the item ${error}`));
    res.status(500).json({ error: "Error searching the item detail" });
  }
  res.json({ id });
});

export default router;
