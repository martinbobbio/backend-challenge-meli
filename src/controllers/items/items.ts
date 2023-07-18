// Express
import { Request, Response } from "express";
// Constants
import { API_MELI } from "../../constants";
// Utils
import { getTopNRepeatedStrings } from "../../utils";
// Console colors
import chalk from "chalk";

/**
 * Controller for retrieving item list information from API of Mercado Libre.
 *
 * @function getItems
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<void>} Promise that resolves once the item list information is retrieved.
 */
export const getItems = async (req: Request, res: Response) => {
  const { search } = req.query;
  const author = res.locals.author;
  const LIMIT_ITEMS = 4;

  // Getting item list
  try {
    const { data: itemList } = await API_MELI.get(
      `sites/MLA/search?q=${search}`
    );
    itemList.results = itemList.results.slice(0, LIMIT_ITEMS);
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

    res.status(200).json({ author, categories, items });
  } catch (error) {
    console.error(chalk.redBright(error));
    console.error(chalk.redBright(`Error searching the item list ${error}`));
    res.status(500).json({ error: "Error searching the item list" });
  }
};

/**
 * Controller for retrieving item detail information from API of Mercado Libre.
 *
 * @function getItemDetail
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<void>} Promise that resolves once the item detail information is retrieved.
 */
export const getItemDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = res.locals.author;

  // Getting item detail
  try {
    const { data: itemDetail } = await API_MELI.get(`items/${id}`);

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
    res.status(200).json({ author, categories, item });
  } catch (error) {
    console.error(chalk.redBright(error));
    console.error(chalk.redBright(`Error searching the item ${error}`));
    res.status(500).json({ error: "Error searching the item detail" });
  }
};
