function drawWarning() {
  var warningMessage = document.createElement('div');

  warningMessage.style.backgroundColor = 'IndianRed';
  warningMessage.style.borderRadius = '5px';

  warningMessage.className = 'alert';
  warningMessage.textContent = 'Sorry, but you\'ve written is too short message. Please try again. ';

  var closeLink = document.createElement('a');
  closeLink.className = 'close';
  closeLink.setAttribute('data-dismiss', 'alert');
  closeLink.setAttribute('aria-label', 'close');
  closeLink.textContent = 'Close message';
  warningMessage.appendChild(closeLink);

  $('form').append(warningMessage);
}

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
    error: function(jqXHR, textStatus, errorThrown){
      if (jqXHR.status === 422) {drawWarning()}
    }
  })
}

$('document').ready(function(){

 $('.close').alert();

  var commentForm;
  var commentTextValue;
  var url;

  $('form').on( "submit", function(e){

    e.preventDefault();

    commentTextValue = $('textarea').val();

    commentForm = $(this).serialize();

    url = $('#new_comment').attr('action');

    doPost(url, commentForm, commentTextValue, onAjaxSuccess);

  });
});
