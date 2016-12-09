/*
 * This function removes a particular todo note when its dismiss button is
 * clicked.  This event listener should be delegated to the <main> element.
 */
function removeTodoOnDelegatedDismissClick(event) {

  var clickedElem = event.target;
  var clickedElemParent = event.target.parentNode;

  /*
   * If the clicked element is the dismiss button of a todo note, then remove
   * the todo from its parent.
   */
  if (clickedElem.classList.contains('dismiss-button') && clickedElemParent.classList.contains('post')) {
    var todoNoteElemParent = clickedElemParent.parentNode;
    todoNoteElemParent.removeChild(clickedElemParent);
  }

}

/*
 * This function shows the modal to add a new todo note when the add note
 * button is clicked.
 */
function displayAddPostModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPostModalElem = document.getElementById('add-post-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPostModalElem.classList.remove('hidden');

}

/*
 * This function hides the modal to add a new todo note and clears any
 * existing values from the input fields whenever any of the modal close
 * actions are taken.
 */
function closeAddPostModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPostModalElem = document.getElementById('add-post-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPostModalElem.classList.add('hidden');

  clearTodoInputValues();

}

/*
 * This function clears any value present in any of the todo input elements.
 */
function clearTodoInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * This function inserts a new todo note based on the values specified in the
 * add note modal when the modal accept button is clicked.
 */
function getUserID(){
  var pathComponenets= window.location.pathname.split('/');
  if(pathComponenets[0] !== '' && pathComponenets[1] !== 'post'){
    return null;
  }
  return pathComponenets[2];
}

function insertNewPost() {

  // Grab the values from all the input fields.
  var postInputDate = document.getElementById('post-input-what').value || '';
  var postInputDetails = document.getElementById('post-input-details').value || '';

  // We only add the note if we have a value for "what".
  if (postInputDetails.trim()) {
    var userID = getUserID();
  storePersonPosts(userID, postInputDate, postInputDetails, function(err){
    if(err){
      alert("unable to save post " + err);
    } else{
      var newPostHTML = generatePostHTML(
        postInputDate.trim(),
        postInputDetails.trim()
      );
      var mainElement = document.querySelector('main');
      mainElement.insertAdjacentHTML('beforeend', newPostHTML);

      closeAddPostModal();
    }

  })


  } else {

    // If there's no "what" value specified, throw an alert.
    alert('You must specify a value for the "whats on your mind?" field.');

  }

}


/*
 * This function navigates to a user's notes when a user is selected from
 * the user select list.
 */
function handleUserSelection(event) {

  var userSelection = event.target.value;

  if (userSelection) {
    window.location.href = '/post/' + userSelection;
  }

}

// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  // Delegate an event listener to <main> to handle clicks on dismiss buttons.
  var main = document.querySelector('main');
  if (main) {
    main.addEventListener('click', removeTodoOnDelegatedDismissClick);
  }

  var addPostButton = document.getElementById('add-post-button');
  if (addPostButton) {
    addPostButton.addEventListener('click', displayAddPostModal);
  }

  var modalCloseButton = document.querySelector('#add-post-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeAddPostModal);
  }

  var modalCancalButton = document.querySelector('#add-post-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', closeAddPostModal);
  }

  var modalAcceptButton = document.querySelector('#add-post-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', insertNewPost);
  }

  var userSelect = document.getElementById('user-select');
  if (userSelect) {
    userSelect.addEventListener('change', handleUserSelection);
  }


});
