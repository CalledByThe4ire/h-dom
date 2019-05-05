import '@babel/polyfill';
import { camelCase } from 'lodash';

export default (doc) => {
  for (const element of doc.body.getElementsByTagName('*')) { // eslint-disable-line
    const process = item => element.classList.replace(item, camelCase(item));
    element.classList.forEach(process);
  }
};
