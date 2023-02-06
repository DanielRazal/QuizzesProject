const db = require("../DAL/db.adminRepository.js");

class AdminLoginController {

  adminLogin(email, password) {
    return db.adminLogin(email, password);
  }
  getUserById(id) {
    return db.getUserById(id);
  }

   getAllUsers() {
    return db.getAllUsers();
  }
}

module.exports = new AdminLoginController();