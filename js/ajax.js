function myAjax(url, type, data, callback) {
  $.ajax({
    url: url,
    type: type,
    dataType: 'jsonp',
    data: data,
    crossDomain: true,
    success: callback,
    error: function(xhr){
    }
  });
}