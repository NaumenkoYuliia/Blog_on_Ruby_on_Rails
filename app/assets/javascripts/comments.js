function cleanTextarea() {
  $('#comment_body').val('');
}

function appendComment(commentTextValue) {
  var addingCommentDiv = document.createElement('div');
  var comment = document.createElement('p');
  var br = document.createElement('br');
  comment.textContent = commentTextValue;

  var timeAgo = document.createElement('strong');
  timeAgo.innerHTML = ('Posted ' + jQuery.timeago(new Date()));

  addingCommentDiv.appendChild(timeAgo);
  addingCommentDiv.appendChild(br);
  addingCommentDiv.appendChild(comment);

  $('#comments').append(addingCommentDiv);
}

function onAjaxSuccess(commentTextValue) {
  cleanTextarea();
  appendComment(commentTextValue);
}

function doPost(url, data, commentTextValue, onAjaxSuccess) {
  $.ajax({
    url: url,
    type: "POST",
    data: data,
    success: function() { onAjaxSuccess(commentTextValue) },
    error: function(jqXHR, textStatus, errorThrown){console.log('textStatus: ' + textStatus + '. Sorry, POST failed!')}
  })
}

$('document').ready(function(){

  var commentForm;
  var commentTextValue;
  var url;

  $('form').on( "submit", function(e){

    e.preventDefault();

    commentTextValue = $('textarea').val();
    commentForm = $(this).serialize();

    console.log(commentForm);
    console.log(commentTextValue);

    url = $('#new_comment').attr('action');

    doPost(url, commentForm, commentTextValue, onAjaxSuccess);

  });
});
