(function ($) {
  'use strict';
  function drawWarning() {
  // create warning message
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

  // insert element in DOM
     $('textarea').before(warningMessage);
   }

   function cleanTextarea() {
     $('#comment_body').val('');
   }

   function appendComment(commentTextValue) {

  // create empty elements
     var addingCommentDiv = document.createElement('div');
     var comment = document.createElement('p');
     var br = document.createElement('br');

  // add content to comment-message
     comment.textContent = commentTextValue;

  // add inform about time, came from message creating
     var timeAgo = document.createElement('strong');
     timeAgo.innerHTML = ('Posted ' + jQuery.timeago(new Date()));

  // assemble all comment information to div
     addingCommentDiv.appendChild(timeAgo);
     addingCommentDiv.appendChild(br);
     addingCommentDiv.appendChild(comment);

  // insert comment to DOM
     $('#comments').append(addingCommentDiv);
   }

  // callBack, used when ajax succeed
   function onAjaxSuccess(commentTextValue) {
     cleanTextarea();
     appendComment(commentTextValue);
   }

  // function to POST new comment to server
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

  // start point
   $('document').ready(function(){

     var commentForm;
     var commentTextValue;
     var url;

  // hang handler on form
     $('form').on( "submit", function(e){
  // redefine submit behaviour
       e.preventDefault();
  // remove existing warning
    $('.alert').remove();
  // take value from textarea (for drawing elements with js)
       commentTextValue = $('textarea').val();
  // serialize form (to send information by POST)
       commentForm = $(this).serialize();
  // get url from action attribute
       url = $('#new_comment').attr('action');
  // do POST request
       doPost(url, commentForm, commentTextValue, onAjaxSuccess);
     });
   });
})(window.JQuery);
