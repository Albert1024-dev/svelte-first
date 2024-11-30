import './css/tailwind.css';

import { mount } from 'svelte'
import Login from './lib/Login.svelte';
import Template from './lib/Template.svelte';


let start, login;

const target1 = document.getElementById('start');
const target2 = document.getElementById('login');

if (target1) {
  const start = mount(Template, {
    target: target1,
    hydrate: true
  })

}

if (target2) {
  const login = mount(Login, {
    target: target2,
    hydrate: true
  })

}

export { login, start };
