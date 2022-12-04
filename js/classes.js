const searchbar = document.getElementById('searchbar');
const children = document.getElementById('container')
        .getElementsByClassName('button');
const yearInputs = [...document.getElementsByName('year')];
const semesterInputs = [...document.getElementsByName('semester')];
const tracks = [...document.getElementsByClassName('track')];
const filteredNumber = document.getElementById('filteredNumber');
const clearButton = document.getElementById('clear');

const logOptions = () => {
    const searchValue = searchbar.value.toLowerCase().trim();
    const selectedTracks = tracks.map(t => t.checked);
    const yearInput = yearInputs.find(e => e.checked);
    const semesterInput = semesterInputs.find(e => e.checked);

    console.log('OPTIONS');
    console.log('keyword', searchValue);
    console.log('year', yearInput.id.split('-')[1]);
    console.log('semster', semesterInput.id.split('-')[1]);
    console.log('tracks', selectedTracks);
}

const filterCourses = () => {
    // logOptions();
    const searchValue = searchbar.value.toLowerCase().trim();
    const selectedTracks = tracks.map(t => t.checked);
    const atLeastOneSelectedTrack = selectedTracks.includes(true);
    const yearInput = yearInputs.find(e => e.checked).id.split('-')[1];
    const semesterInput = semesterInputs.find(e => e.checked).id.split('-')[1];

    for (let i = 0; i < children.length; i++) {
        const keyword = children[i].innerText.toLowerCase().trim();

        const split = keyword.split(']')[0].slice(1).split(' ');
        const courseYear = split[0][0];
        const courseSemester = split[0][2];
        const courseTracks = split.splice(1);

        children[i].style.display = "";

        if (keyword.indexOf(searchValue) === -1)
            children[i].style.display = "none";

        if (yearInput !== 'any' && yearInput !== courseYear) {
            children[i].style.display = "none";
            continue;
        }
        if (semesterInput !== 'any' && semesterInput !== courseSemester) {
            children[i].style.display = "none";
            continue;
        }
        if (!atLeastOneSelectedTrack)
            continue;

        let c = 0;
        for (let j = 0; j < 4; j++) {
            const trackString = `t${j+1}`;
            if (!courseTracks.includes(trackString) && selectedTracks[j]) {
                children[i].style.display = "none";
                break;
            }
            if (courseTracks.includes(trackString) && !selectedTracks[j])
                c++;
        }
        if (c === courseTracks.length)
            children[i].style.display = "none";
    }
}

const resetFilters = () => {
    searchbar.value = '';
    yearInputs[0].checked = true;
    semesterInputs[0].checked = true;
    for (let track of tracks)
        track.checked = false;
    filterCourses();
}

filterCourses();

searchbar.addEventListener('keyup', filterCourses);
yearInputs.forEach(y => y.addEventListener('click', filterCourses));
semesterInputs.forEach(s => s.addEventListener('click', filterCourses));
for (let track of tracks)
    track.addEventListener('change', filterCourses);
clearButton.addEventListener('click', resetFilters);