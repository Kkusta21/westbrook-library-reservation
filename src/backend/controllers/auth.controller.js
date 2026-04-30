const AuthService = require('../services/auth.service');

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }
}

module.exports = AuthController;
