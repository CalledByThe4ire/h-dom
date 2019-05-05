import '@babel/polyfill';
import 'whatwg-fetch';

export default () => {
  // BEGIN (write your solution here)
  const makeAJAXRequest = async (target) => {
    const url = new URL(target.dataset.autocomplete, window.location.origin);
    url.searchParams.append('term', target.value);

    const response = await window.fetch(url);
    const json = await response.json();
    return json;
  };

  const fillElementWithData = (data, element) => {
    const el = element;
    if (el) {
      if (data.length !== 0) {
        const mappedData = data.map((value) => {
          const li = document.createElement('li');
          li.textContent = value;
          return li;
        });
        el.innerHTML = '';
        mappedData.forEach(li => el.append(li));
        return el;
      }
      el.innerHTML = '';
      const li = document.createElement('li');
      li.textContent = 'Nothing';
      el.append(li);
      return el;
    }
    return null;
  };

  const makeAutoComplete = async (target, node) => {
    const data = await makeAJAXRequest(target);
    fillElementWithData(data, node);
  };

  const ul = document.querySelector('ul[data-autocomplete-name]');

  document
    .querySelector('form input[data-autocomplete-name]')
    .addEventListener('input', ({ target }) => makeAutoComplete(target, ul));
  // END
};
