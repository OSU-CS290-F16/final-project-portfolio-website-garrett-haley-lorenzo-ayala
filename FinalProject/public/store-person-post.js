function storePersonPosts(userID, date, details, callback) {


  var postPost = '/post/' + userID + '/add-post';

  // Start a new request to post our newly added photo as JSON data.
  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postPost);
  postRequest.setRequestHeader('Content-Type', 'application/json');


  postRequest.addEventListener('load', function (event) {
    var error;
    if (event.target.status !== 200) {
      error = event.target.response;
    }
    callback(error);
  });


  postRequest.send(JSON.stringify({
    userID: userID,
    date: date,
    details: details
  }));

}
