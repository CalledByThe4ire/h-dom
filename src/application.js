import '@babel/polyfill';

const values = [8, 3, 2, 9, 11, 15, 5, 1, 7, 6, 13, 4, 12, 10, 14];

const generatePlayingField = () => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + j * 4];
      }
    }
  }
  return tableEl;
};

const getDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export default () => {
  let currentPosition = { x: 3, y: 3 };
  const tableEl = generatePlayingField();

  tableEl.addEventListener('click', (e) => {
    const cell = e.target;
    const {
      cellIndex,
      parentElement: { rowIndex }
    } = cell;
    const newPosition = { y: rowIndex, x: cellIndex };
    const distance = getDistance(currentPosition, newPosition);
    if (distance !== 1) {
      return;
    }
    const point = tableEl.rows
      .item(currentPosition.y)
      .cells.item(currentPosition.x);
    point.textContent = cell.textContent;
    point.classList.remove('table-active');
    cell.textContent = '';
    cell.classList.add('table-active');
    currentPosition = { x: cellIndex, y: rowIndex };
  });

  const root = document.querySelector('.gem-puzzle');
  root.append(tableEl);
};
