import { DateTime } from "luxon";
import {
  cartService,
  historiesService,
  ticketService,
  userService,
} from "../dao/index.js";
import transporter from "../services/nodemailer.js";
import { makeid } from "../utils.js";

const insertProdToCart = async (req, res) => {
  const owner = req.user.email;
  const prodId = req.params.pid;
  const cart = await cartService.getCartBy({ owner });
  const exists = cart.products.find((prod) => prod._id.toString() === prodId);
  if (exists)
    return res
      .status(400)
      .send({ status: "error", error: "Product already in cart" });
  cart.products.push({ _id: prodId });

  await cartService.updateCart(cart._id, { products: cart.products });

  res.redirect("/cart");
};

const purchase = async (req, res) => {
  const user = await userService.getUsersBy({ _id: req.user.id });
  const owner = user.email;
  const cart = await cartService.getCartBy({ owner });
  const populatedCart = await cartService.getCartBy(
    { owner },
    { populate: true }
  );

  const products = populatedCart.products.map((product) => {
    return {
      name: product._id.name,
      price: product._id.price,
    };
  });

  const total = products.reduce((prev, curr) => prev + curr.price, 0);

  const ticket = {
    user: user._id,
    products: cart.products,
    total: total,
    code: makeid(20),
  };
  await ticketService.createTicket(ticket);
  const history = await historiesService.getHistoryBy({ user: user._id });
  const event = {
    event: "Purchase",
    date: DateTime.now().toISO(),
    description: `Hizo una compra de ${products
      .map(
        (product) =>
          `${product.name} - $${product.price} 
            `
      )
      .join("-")}`,
  };
  if (!history) {
    await historiesService.createHistory({ user: user._id, events: [event] });
  } else {
    history.events.push(event);
    await historiesService.updateHistory(history._id, {
      events: history.events,
    });
  }
  transporter.sendMail({
    from: "Wine not? <ricvaldezmadegmail.com",
    to: user.email,
    subject: "Purchase in 'Wine not?'",
    html: `<div><h1>Thanks for your purchase with us!</h1></div>
      <p>Your purchased items:</p>
    <ul>
      ${products
        .map(
          (product) =>
            `<li>${product.name} - $${product.price} 
            </li>`
        )
        .join("")}
    </ul>
    <p>Total: $${total}</p>
    `,
    attachments: [
      {
        filename: "purchase.jpg",
        path: "./src/public/img/perrito.jpg",
      },
    ],
  });

  await cartService.updateCart(cart, { products: [] });
  res.send({ status: "success", message: "Purchase successfully" });
};

export default { insertProdToCart, purchase };
