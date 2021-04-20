/*
	Title: 	            HNotes 
	Description:        This is the notes taking and displaying web base application. In which we can add a note and delete it as well. We can also search using the search bar after add it to our notes.
	Date:		        19/04/2021
	Last Updated:       20/04/2021
*/


console.log("let the game begin");
showHNotes();

// If usesr adds an HNote; Add it to the local storage first
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    let title = document.getElementById('title');
    let description = document.getElementById('description');

    let notes = localStorage.getItem('notes');

    let notesObj = [];
    if(notes != null) {
        notesObj = JSON.parse(notes);
    }

    let thisNoteObj = {noteTitle: title.value, noteDesc: description.value};
    notesObj.push(JSON.stringify(thisNoteObj));
    
    localStorage.setItem('notes', JSON.stringify(notesObj));
    title.value = '';
    description.value = '';
    // console.log(notesObj);

    showHNotes();
});
 

// this is the function to show all the HNotes from the localStorage
function showHNotes(){
    let notes = localStorage.getItem('notes');
    let notesObj = [];
    let notesElem = document.getElementById('notes');

    if(notes != null || notes == '[]'){
        notesObj = JSON.parse(notes);
    }
    else{
        let noNotes = `<p>You do not have any HNote saved now.<p>`;
        notesElem.innerHTML = noNotes;
    }

    let html = '';

    notesObj.forEach(function(elem, i){
        thisNoteObj = JSON.parse(elem);
        title = thisNoteObj.noteTitle;
        description = thisNoteObj.noteDesc;

        html += `
        <div class="noteCard card my-3 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <button id="${i}" onclick="deleteHNote(this.id)" class="btn delBtn btn-primary">Delete HNote</button>
            </div>
        </div>
        `;
    });

    
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
}

// this is the fuction to delete the note
function deleteHNote(i){
    let notes = localStorage.getItem('notes');
    let notesObj = [];

    if(notes != null){
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(i,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    if(notesObj.length == 0){
        localStorage.clear();
    }
    showHNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', (e) => {
    let input = search.value;
    // console.log('input event fired', input);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(elem){
        let cardTitle = elem.getElementsByClassName('card-title')[0].innerText;
        let cardDesc = elem.getElementsByClassName('card-text')[0].innerText;

        if(cardDesc.includes(input) || cardTitle.includes(input)){
            elem.style.display = 'block';
        }
        else{
            elem.style.display = 'none';
        }
    })
});