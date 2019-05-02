import '@babel/polyfill';
import { watch as controller } from 'melanke-watchjs';

// BEGIN (write your solution here)
export default () => {
  const element = document.querySelector('progress');
  let counter = 0;
  const handler = () => {
    counter += 1;
    element.setAttribute('value', counter);
    if (counter !== 100) {
      setTimeout(handler, 1000);
    }
  };
  setTimeout(handler, 1000);
};
// END
