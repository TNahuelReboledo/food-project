const { getAllDiets } = require("../controllers/getAllDiets");
const routerDiets = require("express").Router();

routerDiets.get("/", getAllDiets)

module.exports = routerDiets;