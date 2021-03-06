import { Router } from 'express';
import jwt from 'jsonwebtoken';

import authController from './controllers/authController';
import travelsController from './controllers/travelsController';
import daysController from './controllers/daysController';
import usersController from './controllers/usersController';

import NotAuthenticatedException from './exceptions/NotAuthenticatedException';

const router = Router();

// Rotas Públicas
router.use('/auth', authController); // /api/auth

// Criar AQUI um middleware que verifica as credenciais do nosso user
router.use((req, res, next) => {
  // AQUI VAMOS RECEBER O ACCESS TOKEN E VALIDA-LO PARA AUTORIZAR O CLIENT A VER OS SEUS PROJETOS
  const bearerToken = req.get('Authorization');

  // Se foi passado este header
  if (!bearerToken) {
    return next(new NotAuthenticatedException('Missing Token'));
  }

  // validar o token
  const token = bearerToken.slice(7);

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: tokenPayload.id, role: tokenPayload.role };

    return next();
  } catch (error) {
    return next(new NotAuthenticatedException('Token invalid or expired'));
  }
});

// Rotas Privadas
router.use('/travels', travelsController);
router.use('/days', daysController);
router.use('/users', usersController);

export default router;
