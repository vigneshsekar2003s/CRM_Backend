const express = require("express");

const router = express.Router();

const {
  createCustomer,
  getCustomers,
  deleteCustomer,
} = require("../controllers/customerController");

router.post("/", createCustomer);

router.get("/", getCustomers);

router.delete("/:id", deleteCustomer);

module.exports = router;