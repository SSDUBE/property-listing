import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH } from '../utils/globals';
import { PasswordBycrpt } from '../utils/passwordBcrypt';
import { UserModel } from '../models/user';

export const signinUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization!;
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString();
  const [username, password] = decodedCredentials.split(':');

  const user = await UserModel.findOne({ username: username });

  if (user) {
    const verify = await PasswordBycrpt.verify(password, user.password);

    if (verify) {
      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        AUTH.secrete
      );

      return res.json({
        accessToken,
      });
    }

    return res.status(401).send({ error: 'Username or password incorrect' });
  } else {
    res.status(401).send({ error: 'Username or password incorrect' });
  }
};
