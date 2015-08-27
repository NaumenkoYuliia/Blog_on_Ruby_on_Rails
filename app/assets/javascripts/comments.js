
function cleanTextarea() {
  $('#comment_body').val('');
}

function appendComment(textData) {
  var addingComment = document.createElement('p');
  addingComment.textContent = textData;
  $('#comments').append(addingComment);
}

function doPost(url, textData) {
  $.ajax({
    url: url,
    type: "POST",
    data: textData,
    success: function() { cleanTextarea(); appendComment(textData) },
    error: function(jqXHR, textStatus, errorThrown){console.log('textStatus: ' + textStatus + '. Sorry, POST failed!')}
   //dataType: dataType
  })
}

$('document').ready(function(){

  var commentBody;
  var commentUrl;;

  $('[value="Add comment"]').on( "click", function(e){

    e.preventDefault();
    console.log('commentUrl: ' + commentUrl);

    commentBody = $('#comment_body').val();
    commentUrl = $('#new_comment').attr('action');

    doPost(commentUrl, commentBody);


    cleanTextarea();
    appendComment(commentBody);

  });
});




//);[value="Add comment"]
// $('#foo').on('click', function(){
// alert('Вы нажали на элемент "foo"');
// });


// $('#comment_body')
//  alert($('#comment_body').value);
// );
// console.log($('#comment_body'));
