define(['underscore','backbone'],
function(_,Backbone){

Backbone.sync = function (method, model, options) {
  var url;
  if (model instanceof Backbone.Model) url = model.urlRoot;
  else url = model.url;

  if (options.id == true && model && model.id) url += '/' +model.id

  // remove lead / for namespace
  var namespace = url[0] == '/' 
                ? url.slice(1)
                : url;

  var data = options.data || (model && model.toJSON()) || {};

  // If your socket.io connection exists on a different var, change here:
  var io = model.socket || window.socket || Backbone.socket;

  io.emit(namespace + ':' + method, data, function (err, data) {
    if (err) options.error(err);
    else options.success(data);
  });
};

return Backbone;
});
