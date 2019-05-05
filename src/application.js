import '@babel/polyfill';
import 'whatwg-fetch';

export default () => {
  // BEGIN (write your solution here)
  const autocompleteElements = document.querySelectorAll('input[data-autocomplete]');
  autocompleteElements.forEach((el) => {
    const route = el.dataset.autocomplete;
    el.addEventListener('input', async (e) => {
      const dataAutocompleteName = el.dataset.autocompleteName;
      const oldList = document.querySelector(`ul[data-autocomplete-name="${dataAutocompleteName}"]`);
      const url = new URL(route, window.location.origin);
      url.searchParams.append('term', e.target.value);
      const response = await fetch(url);
      const countries = await response.json();
      const list = document.createElement('ul');
      list.dataset.autocompleteName = dataAutocompleteName;
      if (countries.length === 0) {
        countries.push('Nothing');
      }
      countries.forEach((country) => {
        const li = document.createElement('li');
        li.textContent = country;
        list.append(li);
      });
      oldList.replaceWith(list);
    });
  });
  // END
};
