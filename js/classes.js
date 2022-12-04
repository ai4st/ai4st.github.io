const searchbar = document.getElementById('searchbar');
const container = document.getElementById('container');
const children = container.getElementsByClassName('button');
const yearInputs = [...document.getElementsByName('year')];
const semesterInputs = [...document.getElementsByName('semester')];
const tracks = [...document.getElementsByClassName('track')];
const filteredNumber = document.getElementById('filteredNumber');
const clearButton = document.getElementById('clear');

const CLASSES = [
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Mathematics for AI',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Physics for AI',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Statistics for AI',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'AI for Signal and Image Processing',
  },
  {
    id: '1.1 T1 T2 T3 T4',
    name: 'Artificial Intelligence',
  },
  {
    id: '1.2 T3',
    name: 'Advanced Computational Techniques for Big Imaging and Signal Data',
  },
  {
    id: '1.2 T1 T2',
    name: 'Advanced Artificial Intelligence, Machine Learning and Deep Learning',
  },
  {
    id: '1.2 T1 T2',
    name: 'Advanced Data Management and Decision Support Systems',
  },
  {
    id: '1.2 T4',
    name: 'AI Models for Physics',
  },
  {
    id: '1.2 T2',
    name: 'Advanced Human-System Interfaces',
  },
  {
    id: '1.2 T2',
    name: 'Ambient Intelligence and Domotics',
  },
  {
    id: '1.2 T2',
    name: 'Embedded Systems Architectures and Design',
  },
  {
    id: '1.2 T3 T4',
    name: 'Supervised Learning',
  },
  {
    id: '1.2 T3 T4',
    name: 'Unsupervised Learning',
  },
  {
    id: '1.2 T4',
    name: 'Quantum Simulation',
  },
  {
    id: '1.2 T1',
    name: 'Intelligent Sensing and Remote Sensing',
  },
  {
    id: '1.2 T1',
    name: 'Vision for Industry and Environment',
  },
  {
    id: '1.2 T3',
    name: 'Signal and Imaging Acquisition and Modelling in Environment',
  },
  {
    id: '1.2 T3',
    name: 'Signal and Imaging Acquisition and Modelling in Healthcare',
  },
  {
    id: '1.2 T4',
    name: 'Statistical Learning',
  },
  {
    id: '1.2 T1',
    name: 'Systems for Industry 4.0 and Environment (IoT)',
  },
  {
    id: '2.1 T1 T2 T3 T4',
    name: 'Data-Driven Organizations and Management',
  },
  {
    id: '2.1 T1 T2 T3 T4',
    name: 'Advanced Foundations of Law and Regulations in Privacy and Data Protection',
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

  for (let i = 0; i < children.length; i++) {
    const keyword = children[i].innerText.toLowerCase().trim();

    const split = keyword.split(']')[0].slice(1).split(' ');
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
  const tag = document.createElement('a');
  tag.href = '#';
  tag.classList.add('button');
  tag.innerText = `[${classData.id}] ${classData.name}`;

  return tag;
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
