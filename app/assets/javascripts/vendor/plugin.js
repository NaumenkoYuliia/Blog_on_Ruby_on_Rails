
window.Plugin = (function($) {
  var pluginDataSuffix = '.plugin'

// если данного пагина не существует
  if (typeof $.fn.plugin === 'undefined') {
// то создаём новое свойство-функцию для объекта jQuery, где именем нового свойства будет имя нашего плагина, т.е "plugin":

// я не вижу, откуда мы берем "pluginName".

    $.fn.plugin = function(pluginName) {
      // меняем дата-атрибут данного элемента, но
      // почему элемента $(this).first() я не поняла,
      // this указывает на window, $(this).first() тоже дожен указывать туда же.
      return $(this).first().data(pluginName + pluginDataSuffix)
    }
  }

// собственно, с помощью данной штуки мы инициаизируем наш плагин
// new Plugin('commentForm', CommentForm)
  return function(name, PluginClass) {
    var dataName = name + pluginDataSuffix

    function PluginFactory(option, params) {
      return this.each(function (i, elem) {
        var $element  = $(elem),
            plugin    = $element.data(dataName),
            options   = $.extend({}, PluginClass.DEFAULTS, $element.data(), typeof option == 'object' && option)

        if (!plugin)
          $element.data(dataName, (plugin = new PluginClass($element, options)))

        if (typeof option == 'string')
          plugin[option](params)
      })
    }

    $.fn[name] = PluginFactory
    $.fn[name].Constructor = PluginClass
  }
})(window.JQuery)
