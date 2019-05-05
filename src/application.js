import '@babel/polyfill';
import _ from 'lodash';
import $ from 'jquery';

export default () => {
  const clickHandler = function() {
    const $this = $(this);
    const $itemsContainer = $this
      .closest('[data-ride="carousel"]')
      .find('.carousel-inner');
    const $items = $('.carousel-item', $itemsContainer);
    const $activeItem = $items.filter((index, item) =>
      $(item).hasClass('active')
    );

    switch ($this.attr('data-slide')) {
      case 'prev':
        const $prevItem =
          $activeItem.prev().length === 0 ? $items.last() : $activeItem.prev();
        $activeItem.removeClass('active');
        $prevItem.addClass('active');
        break;
      case 'next':
        const $nextItem =
          $activeItem.next().length === 0 ? $items.first() : $activeItem.next();
        $activeItem.removeClass('active');
        $nextItem.addClass('active');
        break;
    }
  };

  const $controls = $('[data-slide]');
  $controls.each((index, control) => {
    $(control).on('click', clickHandler);
  });
};
