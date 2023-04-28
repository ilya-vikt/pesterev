export function scrollBarWidth() {
  const t_div = document.createElement('div');
  t_div.style.overflowY = 'scroll';
  t_div.style.width = '50px';
  t_div.style.height = '50px';
  document.body.append(t_div);
  const scrollWidth = t_div.offsetWidth - t_div.clientWidth;
  document.body.style.setProperty('--scrollbar-width', `${scrollWidth}px`);
  t_div.remove();
}
