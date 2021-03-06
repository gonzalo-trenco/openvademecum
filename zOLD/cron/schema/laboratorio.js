const Waterline = require('waterline');
var Laboratorio = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'laboratorio',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigolaboratorio: {
      type:'integer',
      unique: true
    },
    laboratorio: {
      type:'string'
    },
    direccion: {
      type:'string'
    },
    codigopostal: {
      type:'integer'
    },
    localidad: {
      type:'string'
    }
  },
  updateOrCreate: function(criteria, values, cb){
    var self = this; // reference for use by callbacks
    // If no values were specified, use criteria
    if (!values) values = criteria.where ? criteria.where : criteria;
    self.findOne(criteria, function (err, result){
      if(err) return cb(err);
      if(result){
        self.update(criteria, values).exec(function (err, res){
          if (err) return cb(err);
          cb(null, res);
        });
      }else{
        self.create(values).exec(function (err, res){
          if (err) return cb(err);
          cb(null, res);
        });
      }
    });
  }
});

module.exports = Laboratorio;
