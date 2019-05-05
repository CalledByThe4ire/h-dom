import '@babel/polyfill';

export default () => {
  const model = {
    id: null,
    active: null,
  };

  const updateView = () => {
    const [activeModal] = [...document.querySelectorAll('.modal')].filter(
      modal => modal.id === proxiedModel.id, // eslint-disable-line no-use-before-define
    );

    if (activeModal) {
      if (proxiedModel.active) { // eslint-disable-line no-use-before-define
        activeModal.classList.add('show');
        activeModal.style.display = 'block';
      } else {
        activeModal.classList.remove('show');
        activeModal.style.display = 'none';
      }
    }
  };

  const handler = {
    set: (target, prop, newValue) => {
      if (prop in target) {
        target[prop] = newValue; // eslint-disable-line no-param-reassign
        updateView();
        return true;
      }
      return false;
    },
  };

  const proxiedModel = new Proxy(model, handler);

  const updateModel = ({ target }) => {
    if (target.dataset.toggle) {
      proxiedModel.id = target.dataset.target.slice(1);
      proxiedModel.active = true;
    } else {
      proxiedModel.id = target.closest('.modal').id;
      proxiedModel.active = false;
    }
  };

  [
    ...document.querySelectorAll(
      'button[data-toggle="modal"], button[data-dismiss="modal"]',
    ),
  ].forEach(btn => btn.addEventListener('click', updateModel));
};
