import '@babel/polyfill';

export default () => {
  const makeElementActive = (collection, clsName, href, elementType) => {
    Array.from(collection.querySelectorAll(clsName)).forEach((element) => {
      let attr = '';
      let newHref = '';
      if (elementType === 'link') {
        attr = 'href';
        newHref = href;
      } else if (elementType === 'tab') {
        attr = 'id';
        newHref = href.slice(1);
      }
      const elementAttr = element.getAttribute(attr);
      const predicate = elementAttr === newHref;
      element.classList.toggle(
        'active',
        !element.classList.contains('active') && predicate,
      );
    });
  };

  const clickHandler = (evt) => {
    evt.preventDefault();
    const { target } = evt;
    const navTabs = target.closest('.nav-tabs');
    const linkHref = target.getAttribute('href');
    let tabContent = null;

    if (navTabs) {
      tabContent = navTabs.nextElementSibling;
    }

    makeElementActive(navTabs, '.nav-link', linkHref, 'link');
    makeElementActive(tabContent, '.tab-pane', linkHref, 'tab');
  };

  document
    .querySelectorAll('.nav-link')
    .forEach(link => link.addEventListener('click', clickHandler));
};
