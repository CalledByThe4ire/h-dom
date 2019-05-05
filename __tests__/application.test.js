import 'js-polyfills/html';
import 'js-polyfills/dom';
import fs from 'fs';
import path from 'path';
import { html } from 'js-beautify';

import run from '../src/application';

const htmlOptions = {
  preserve_newlines: true,
  unformatted: [],
};

const fixuturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => html(document.body.innerHTML, htmlOptions);

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run();
});

test('application', () => {
  const [button1, button2] = document.querySelectorAll('[data-toggle="modal"]');
  const [closeButton1, closeButton2] = document.querySelectorAll('[data-dismiss="modal"]');

  expect(getTree()).toMatchSnapshot();

  button1.click();
  expect(getTree()).toMatchSnapshot();

  closeButton1.click();
  expect(getTree()).toMatchSnapshot();

  button2.click();
  expect(getTree()).toMatchSnapshot();

  closeButton2.click();
  expect(getTree()).toMatchSnapshot();
});
