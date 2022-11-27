const titles = [...document.getElementsByClassName('track-title')];
const contents = [...document.getElementsByClassName('track-content')];

for (let section_index = 0; section_index < titles.length; section_index++) {
  const title = titles[section_index];
  title.addEventListener('click', () => {
    contents[section_index].classList.toggle('hide');
    title.childNodes[1].classList.toggle('flip');
  });
}
