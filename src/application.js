import '@babel/polyfill';
import _ from 'lodash';
import $ from 'jquery';

export default () => {
  const carousels = $('[data-ride="carousel"]');
  carousels.each((index, carousel) => {
    const root = $(carousel);
    const slides = root.find('.carousel-item');
    const maxIndex = slides.length - 1;
    let currentIndex = _.findIndex(slides, slide => $(slide).hasClass('active'));
    const handlerGenerator = next => () => {
      const newCurrentIndex = next(currentIndex);
      slides.removeClass('active');
      slides.filter(id => id === newCurrentIndex).addClass('active');
      currentIndex = newCurrentIndex;
    };
    const prev = root.find('[data-slide="prev"]');
    prev.click(handlerGenerator(i => (i === 0 ? maxIndex : i - 1)));
    const next = root.find('[data-slide="next"]');
    next.click(handlerGenerator(i => (maxIndex === i ? 0 : i + 1)));
  });
};
