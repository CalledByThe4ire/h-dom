import fs from 'fs';
import path from 'path';
import { html } from 'js-beautify';

import run from '../src/application';

jest.useFakeTimers();

const fixuturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => html(document.body.innerHTML);

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run();
});

test('application', () => {
  expect(getTree()).toMatchSnapshot();

  for (let i = 0; i < 105; i += 1) {
    jest.runOnlyPendingTimers();
    expect(getTree()).toMatchSnapshot();
  }
});
