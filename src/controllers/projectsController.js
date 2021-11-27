import { Router } from 'express';

import Project from '../models/Project';
import ProjectsService from '../service/projectsService';
import ProjectsRepository from '../repository/projectsRepository';

import User from '../models/User';
import UsersService from '../service/userService';
import UsersRepository from '../repository/usersRepository';

const usersRepository = new UsersRepository(User);
const usersService = new UsersService(usersRepository);
const router = Router();

// Injeção de Dependências
const projectsRepository = new ProjectsRepository(Project);
const projectsService = new ProjectsService(projectsRepository);

// Inserir rotas de projects

// RECEBER O REQUEST, PEGAR DELE O QUE É UTIL, E MANDAR A RESPOSTA
router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;

    console.log('REQ.USER - ROTA PROJECTS', req.user);

    const allProjects = await projectsService.getAllByFilter(title, req.user.id);
    const user = await usersService.getOne(req.user.id);
    console.log(user);
    res.json({ projects: allProjects, theuser: user });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log('REQ.USER NA ROTA DE DETALHE', req.user);

    const project = await projectsService.getOne(id);

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const newProject = await projectsService.create(body, req.user.id);

    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

export default router;
