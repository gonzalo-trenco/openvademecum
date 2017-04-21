/**
 * Excipientes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number',
      required: true,
    },
    codigoedo: {
      type: 'number'
    },
    edo: {
      type:'string'
    },

    prescripciones:{
      collection: 'prescripcion',
      via: 'excipiente',
      through: 'prescripcionexcipientes'
    }
  }
};