import '@babel/polyfill';
import { camelCase } from 'lodash';

export default () => {
  const tagsList = document.body.getElementsByTagName('*');
  [...tagsList].forEach((tag) => {
    const classList = tag.getAttribute('class');
    const camelizedClassList = classList
      .split(' ')
      .map(cls => camelCase(cls))
      .join(' ');

    tag.className = camelizedClassList;
  });
};
