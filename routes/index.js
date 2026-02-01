const express = require("express");
const router = express.Router();
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');

const routeList = [
    { path: "/products", route: productRoutes },
    { path: "/users", route: userRoutes },
    { path: "/orders", route: orderRoutes },
];

for (const { path, route } of routeList) {
    router.use(path, route);
}

module.exports = router;
