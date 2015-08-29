
/*
У нас ест функция пагин, дя этого ей нужно передат 2 аргумента.
1-й имя дата-атрибута, 2-4 конструктор, который инициаизируется в плагине.


создаём новое свойство-функцию для объекта jQuery, где именем нового свойства будет имя нашего плагина:
*/

+function($) {
  var CommentForm = function(form, options) {
    this.$form = $(form)
    this.options = options

    this.$form('submit', $.proxy(this.submit, this))

    $(this.options.template)
  }

  CommentForm.DEFAULTS = {

    template: [
      '<div>',
        '<strong>{timeAgoOfCreation}</strong>',
        '<br/>',
        '{data}',
      '</div>',
    ].join(''),

    warningTemplate: [
      '<div>',
        '{warningError}',
      '</div>',
    ].join(''),

    error: 'something went wrong',

    alertSelector: '.alert'
  }

  CommentForm.prototype = {

    submit: function(e) {
      e.preventDefault()

      var url = this.$form.attr('action')

      $commentForm = this.$form.serialize()

      $.post(url, $commentForm)
        .then(this.renderComment)
        .then(this.cleanTextarea)
        .fail(this.fail)
    },

    renderComment: function() {
      // fill data
      var commentData = $('textarea').val();
      // replace cap in the teplate to apropriate data
      template.replace('{data}', commentData)
      // append to dom
      $('#comments').append(template)
    },

    cleanTextarea: function(){
      $('textarea').val('')
    },

    fail: function() {
      //show error message
      $('textarea').before(warningTemplate);
    }
  }

  new Plugin('commentForm', CommentForm)

  $(function() {
    $('[data-comment-form]').commentForm()
  })()
}(window.jQuery);
