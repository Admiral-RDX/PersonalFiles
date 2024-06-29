import './styles/global.scss';

import Router from './router.ts';
import van from 'vanjs-core';

van.add(document.body, Router());
