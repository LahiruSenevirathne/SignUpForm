'use strict';

(function () {

  console.log('It Works!');
})();

(function formjson(keyword) {
  var promise = $.ajax({
    url: 'https://json-data.herokuapp.com/forms',
    dataType: 'json',
    method: 'get',
    success: function success(data) {
      console.log('cb', data);
    }
  });

  promise.then(function (data) {
    var templateString = $('#itemTemplate').text();
    var templateStringSelect = $('#itemSelector').text();
    var renderTemplate = _.template(templateString);
    var renderSelector = _.template(templateStringSelect);

    _.each(data, function (attrib) {

      console.log('attrib', attrib);

      var freshHTML = renderTemplate(attrib);
      var selectHTML = renderSelector(attrib);
      var SelOptions = attrib.options;

      if (SelOptions.length > 0 && attrib.type === 'select') {
        $('.container').append(selectHTML);
        var SelectOption = $('#selectOption').text();
        var renderOption = _.template(SelectOption);
        _.each(SelOptions, function (option) {
          var optionHTML = renderOption(option);
          $('.languages').append(optionHTML);
        });
      } else {
        $('.container').append(freshHTML);
      }

      // _.each(lang,function {
      //     $('<select>').append(renderOption)
      //   });
    });
  });

  return promise;
})();