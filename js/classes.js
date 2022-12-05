const searchbar = document.getElementById('searchbar');
const container = document.getElementById('container');
const yearInputs = [...document.getElementsByName('year')];
const semesterInputs = [...document.getElementsByName('semester')];
const tracks = [...document.getElementsByClassName('track')];
const filteredNumber = document.getElementById('filteredNumber');
const clearButton = document.getElementById('clear');

const CLASSES = [
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Mathematics for AI',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45579',
    files:
      'https://drive.google.com/drive/folders/1yjrETyzaeGBaYod3w-z8wYYVIqWYwJQB',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Physics for AI',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45581',
    files:
      'https://drive.google.com/drive/folders/1oGsMheRX6n5xwMitFSfNh4Vh62uZvu67',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Statistics for AI',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45580',
    files:
      'https://drive.google.com/drive/folders/1AmOzft4coWwMaBNoOAjRC5qE7GweLDL8',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'AI for Signal and Image Processing',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45602',
    files:
      'https://drive.google.com/drive/folders/1_egeHr_yjB32MMGMpJmNbC73fIlcrYBq',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Artificial Intelligence',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45601',
    files:
      'https://drive.google.com/drive/folders/1_PyeO22QYh_QdkPU7rg61Q0cFunCSkpE',
  },
  {
    id: '1.2 T3',
    name: 'Advanced Computational Techniques for Big Imaging and Signal Data',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45585',
  },
  {
    id: '1.2 T1 T2',
    name: 'Advanced Artificial Intelligence, Machine Learning and Deep Learning',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45583',
  },
  {
    id: '1.2 T1 T2',
    name: 'Advanced Data Management and Decision Support Systems',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45582',
  },
  {
    id: '1.2 T4',
    name: 'AI Models for Physics',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45586',
  },
  {
    id: '1.2 T2',
    name: 'Advanced Human-System Interfaces',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45588',
  },
  {
    id: '1.2 T2',
    name: 'Ambient Intelligence and Domotics',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45589',
  },
  {
    id: '1.2 T2',
    name: 'Embedded Systems Architectures and Design',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45584',
  },
  {
    id: '1.2 T3 T4',
    name: 'Supervised Learning',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45591',
  },
  {
    id: '1.2 T3 T4',
    name: 'Unsupervised Learning',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45592',
  },
  {
    id: '1.2 T4',
    name: 'Quantum Simulation',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45596',
  },
  {
    id: '1.2 T1',
    name: 'Intelligent Sensing and Remote Sensing',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45598',
  },
  {
    id: '1.2 T1',
    name: 'Vision for Industry and Environment',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45599',
  },
  {
    id: '1.2 T3',
    name: 'Signal and Imaging Acquisition and Modelling in Environment',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45595',
  },
  {
    id: '1.2 T3',
    name: 'Signal and Imaging Acquisition and Modelling in Healthcare',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45594',
  },
  {
    id: '1.2 T4',
    name: 'Statistical Learning',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45603',
  },
  {
    id: '1.2 T1',
    name: 'Systems for Industry 4.0 and Environment (IoT)',
    syllabus: 'https://elearning.unimib.it/course/info.php?id=45593',
  },
  {
    id: '2.1 T1 T2 T3 T4',
    name: 'Data-Driven Organizations and Management',
    syllabus: '',
  },
  {
    id: '2.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Law and Regulations in Privacy and Data Protection',
    syllabus: '',
  },
];
// sort the classes array
CLASSES.sort((a, b) => `${a.id} ${a.name}`.localeCompare(`${b.id} ${b.name}`));

const logOptions = () => {
  const searchValue = searchbar.value.toLowerCase().trim();
  const selectedTracks = tracks.map((t) => t.checked);
  const yearInput = yearInputs.find((e) => e.checked);
  const semesterInput = semesterInputs.find((e) => e.checked);

  console.log('OPTIONS');
  console.log('keyword', searchValue);
  console.log('year', yearInput.id.split('-')[1]);
  console.log('semster', semesterInput.id.split('-')[1]);
  console.log('tracks', selectedTracks);
};

const filterCourses = () => {
  // logOptions();
  const searchValue = searchbar.value.toLowerCase().trim();
  const selectedTracks = tracks.map((t) => t.checked);
  const atLeastOneSelectedTrack = selectedTracks.includes(true);
  const yearInput = yearInputs.find((e) => e.checked).id.split('-')[1];
  const semesterInput = semesterInputs.find((e) => e.checked).id.split('-')[1];

  const children = [...container.childNodes];
  for (let i = 1; i < children.length; i++) {
    const keyword = children[i].childNodes[0].innerText.toLowerCase().trim();

    const split = keyword.split(' ');
    const courseYear = split[0][0];
    const courseSemester = split[0][2];
    const courseTracks = split.splice(1);

    children[i].style.display = '';

    if (keyword.indexOf(searchValue) === -1) children[i].style.display = 'none';

    if (yearInput !== 'any' && yearInput !== courseYear) {
      children[i].style.display = 'none';
      continue;
    }
    if (semesterInput !== 'any' && semesterInput !== courseSemester) {
      children[i].style.display = 'none';
      continue;
    }
    if (!atLeastOneSelectedTrack) continue;

    let c = 0;
    for (let j = 0; j < 4; j++) {
      const trackString = `t${j + 1}`;
      if (!courseTracks.includes(trackString) && selectedTracks[j]) {
        children[i].style.display = 'none';
        break;
      }
      if (courseTracks.includes(trackString) && !selectedTracks[j]) c++;
    }
    if (c === courseTracks.length) children[i].style.display = 'none';
  }
};

const resetFilters = () => {
  searchbar.value = '';
  yearInputs[0].checked = true;
  semesterInputs[0].checked = true;
  for (let track of tracks) track.checked = false;
  filterCourses();
};

const buildClassHTML = (classData) => {
  const cont = document.createElement('div');
  cont.id = classData.id;

  const titleButton = document.createElement('a');
  titleButton.classList.add('button');
  titleButton.innerText = `[${classData.id}] ${classData.name}`;
  cont.appendChild(titleButton);

  const content = document.createElement('div');
  if (classData.syllabus)
    content.innerHTML += `
    <a href='${classData.syllabus}' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <polyline points="11 12 12 12 12 16 13 16"></polyline>
    </svg>
    syllabus
    </a>`;
  if (classData.files)
    content.innerHTML += `
    <a href='${classData.files}' target='_blank'>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
        <line x1="9" y1="9" x2="10" y2="9"></line>
        <line x1="9" y1="13" x2="15" y2="13"></line>
        <line x1="9" y1="17" x2="15" y2="17"></line>
    </svg>
    books and material
    </a>
  `;
  if (classData.extra) content.innerHTML += classData.extra;

  content.classList.add('hide');
  content.classList.add('class-content');
  cont.appendChild(content);

  titleButton.addEventListener('click', () => {
    content.classList.toggle('hide');
  });

  return cont;
};

const buildPageHTML = () => {
  container.replaceChildren([]);

  for (const classData of CLASSES) {
    const newClassTag = buildClassHTML(classData);
    container.appendChild(newClassTag);
  }
};

buildPageHTML();
filterCourses();

searchbar.addEventListener('keyup', filterCourses);
yearInputs.forEach((y) => y.addEventListener('click', filterCourses));
semesterInputs.forEach((s) => s.addEventListener('click', filterCourses));
for (let track of tracks) track.addEventListener('change', filterCourses);
clearButton.addEventListener('click', resetFilters);
