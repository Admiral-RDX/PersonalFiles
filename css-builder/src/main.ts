import van from 'vanjs-core';
import { Header } from './components/header/header.ts';
import './components/header/header.ts';
import '@fontsource/inter';
import './global.scss';
import { Home } from './router/home.ts';

// TODO: Add router
van.add(document.body, [Header(), Home()]);
