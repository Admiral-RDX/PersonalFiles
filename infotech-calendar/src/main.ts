import van from 'vanjs-core';
import { Router } from './router.ts';
import './styles/global.scss';

van.add(document.body, Router());
