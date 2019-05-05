import '@babel/polyfill';

const search = (doc, tag) => {
  const coll = [...doc.children];
  const initAcc = coll.filter(e => e.tagName.toLowerCase() === tag);
  return coll.reduce((acc, child) => {
    return [...acc, ...search(child, tag)];
  }, initAcc);
};

export default search;
