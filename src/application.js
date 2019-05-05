import '@babel/polyfill';
import { watch } from 'melanke-watchjs';

// BEGIN (write your solution here)
export default () => {
  const [activeElement] = [...document.querySelectorAll('.tab-pane')].filter(
    item => item.classList.contains('active'),
  );

  const model = {
    active: activeElement.id,
  };

  const setActiveClass = (cls, ending = '-list') => {
    Array.from(document.querySelectorAll(cls)).forEach((item) => {
      const isActive = val => val.classList.contains('active');
      const id = item.id.endsWith(ending)
        ? `${model.active}${ending}`
        : model.active;
      item.classList.toggle('active', item.id === id && !isActive(item));
      item.classList.toggle(
        'show',
        item.classList.contains('tab-pane') && isActive(item),
      );
    });
  };

  const updateView = () => {
    setActiveClass('.list-group-item');
    setActiveClass('.tab-pane');
  };

  const updateModel = ({ target }) => {
    const { id } = target;
    model.active = id.slice(0, id.indexOf('-list'));
  };

  watch(model, 'active', updateView);

  Array.from(document.querySelectorAll('.list-group-item')).forEach((item) => {
    item.addEventListener('click', updateModel);
  });
};
// END
