import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email, password } = req.body;

    const checkEmail = await User.findOne({
      where: { email },
      attributes: ['email'],
    });

    if (!password) {
      return res.status(400).json({ error: 'User does not have password' });
    }

    if (checkEmail) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
