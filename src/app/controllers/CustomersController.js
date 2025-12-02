class CustomersController {
  index(req, res) {
    return res.status(200).json({ message: "ok" })
  }
} export default new CustomersController();