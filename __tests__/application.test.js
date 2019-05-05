// import 'js-polyfills/dom';
import fs from 'fs';
import path from 'path';
import { html } from 'js-beautify';

import run from '../src/application';

const pressKey = (key) => {
  const e = new KeyboardEvent('keyup', { key });
  document.dispatchEvent(e);
};

const fixuturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => html(document.body.innerHTML);

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run(ar => ar);
});

test('application', () => {
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowRight');
  pressKey('ArrowLeft');
  pressKey('ArrowLeft');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowRight');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowDown');
  pressKey('ArrowDown');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowUp');
  pressKey('ArrowUp');
  expect(getTree()).toMatchSnapshot();
});
