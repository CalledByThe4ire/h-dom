import '@babel/polyfill';

const notebooks = [
  {
    model: 'v1',
    processor: 'intel',
    frequency: 1.7,
    memory: 16,
  },
  {
    model: 'd3',
    processor: 'intel',
    frequency: 3.5,
    memory: 8,
  },
  {
    model: 'd2',
    processor: 'amd',
    frequency: 2.5,
    memory: 16,
  },
];

export default () => {
  const extractModels = (list) => {
    return list.reduce((acc, item) => [...acc, item.model], []);
  };

  const state = {
    params: {
      processor: null,
      memory: null,
      frequency: null,
    },
    products: extractModels(notebooks),
  };

  const isInRange = (val) => {
    const {
      params: {
        frequency: { min, max },
      },
    } = state;

    return val >= min && val <= max;
  };

  const createProductsList = (state) => {
    const chosenParams = Object.keys(state.params).filter(
      parameter => state.params[parameter] !== null,
    );
    let coll = [];

    chosenParams.forEach((param) => {
      const val = state.params[param];

      if (coll.length === 0) {
        coll = [...notebooks];
      }

      if (typeof val === 'object') {
        coll = coll.filter((notebook) => {
          return isInRange(notebook[param]);
        });
      } else {
        coll = coll.filter(notebook => notebook[param] === val);
      }
    });

    return (state.products = extractModels(coll));
  };

  const renderProductsList = (state) => {
    const { products } = state;

    if (products.length !== 0) {
      const ul = document.createElement('ul');
      state.products.forEach((v) => {
        const li = document.createElement('li');
        li.textContent = v;
        ul.append(li);
      });
      document.querySelector('.result').innerHTML = '';
      document.querySelector('.result').append(ul);
    } else {
      document.querySelector('.result').innerHTML = '';
    }
  };

  const eventHandler = (evt) => {
    const {
      target,
      target: { name, value },
    } = evt;
    switch (name) {
      case 'processor_eq':
        state.params.processor = value.toLowerCase();

        if (!state.params.processor) {
          state.params.processor = null;
        }
        createProductsList(state);
        renderProductsList(state);
        break;

      case 'memory_eq':
        state.params.memory = Number(value);

        if (!state.params.memory) {
          state.params.memory = null;
        }
        createProductsList(state);
        renderProductsList(state);
        break;

      case 'frequency_gt':
        if (!state.frequency) {
          state.params.frequency = {
            min: Number(value),
            max: Number(target.max)
          };
        }
        if (Number(value) === 0) {
          state.params.frequency.min = Number(target.min);
        }
        state.params.frequency.min = Number(value);
        createProductsList(state);
        renderProductsList(state);
        break;

      case 'frequency_lt':
        if (!state.frequency) {
          state.params.frequency = {
            min: Number(target.min),
            max: Number(value)
          };
        }
        if (Number(value) === 0) {
          state.params.frequency.max = Number(target.max);
        }
        createProductsList(state);
        renderProductsList(state);
        break;

      default:
        return;
    }
  };

  const form = document.querySelector('form');

  if (form) {
    [...form.querySelectorAll('select')].forEach((select) =>
      select.addEventListener('change', eventHandler)
    );
    [...form.querySelectorAll('input[type="number"]')].forEach((input) =>
      input.addEventListener('input', eventHandler)
    );
  }

  renderProductsList(state);
};
