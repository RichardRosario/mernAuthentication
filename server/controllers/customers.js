import Customer from "../models/customerModel.js";

export const createCustomer = async (req, res) => {
	try {
		// get the name input from form
		const { name } = req.body;
		// assign new customer
		const newCustomer = new Customer({ name });
		// save new customer
		const savedCustomer = await newCustomer.save();

		return res.send(savedCustomer);
	} catch (error) {
		return res.status(401).json({ errMessage: "Unauthorized" });
	}
};

export const getCustomers = async (req, res) => {
	try {
		// find all customers from customer table
		const customers = await Customer.find();

		return res.send(customers);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send();
	}
};
