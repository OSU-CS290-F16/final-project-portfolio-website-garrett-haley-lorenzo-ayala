var postTemplate = Handlebars.templates.post;

/*
 * This function should create an HTML string representing a new todo note
 * given the information that could be in the note.
 *
 * Note that where, when, who, and details can be an empty string.  If this
 * is the case, the corresponding portion of the todo note should not be
 * included in the HTML string.
 */
function generatePostHTML(date, details) {
  var newPost= {
    "date": date,
      "details": details
  }
  return postTemplate(newPost);

}
