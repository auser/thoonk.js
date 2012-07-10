/**
  * Written by Ari Lerner.
  */

var thoonkmodule = require('./thoonk.js'),
uuid = require('node-uuid'),
redis = require('redis'),
fs = require('fs');

/**
 * A Thoonk Hash is a serialized hash which takes in an object
 * and serializes it into a redis object
 */

function Hash(name, thoonk, config) {
    thoonkmodule.ThoonkBaseObject.call(this, name, thoonk);
    
    this.bredis = this.thoonk._get_blocking_redis(name);
    this.lredis = this.thoonk.lredis;
    
    // These are class methods
    // So you can call things like
    // Hash.load, Hash.find..
    this.methods = ['load', 'find', 'save', 'subscribe', 'unsubscribe'];
    this.methods.forEach(function(val) {
      this[val] = function() {
        var instance = new this();
        instance[val].apply(instance, Array.prototype.slice.call(arguments, 0));
      }
    });
    
    this.remove = function(id) {
      var instance = new this();
      instance.id = id;
      instance.remove(id);
    }
};

/*
 * Create a new object
 *
 * Arguments
 *    objectProperties      - the properties of the object
 *                            If this includes an id, then it will use that as the id
 *                            for the object, otherwise it will generate one
 */
function objCreate(objProps, callback) {
  var id = objProps['id'],
      self = this;
  
  if(id === undefined || id === null) {
      var id = uuid();
  }
  
  var args = [id, JSON.stringify(objProps)];
  this.runscript('create', args, callback);
}

function objGet(id, callback) {
  this.runscript('get', [id], callback);
}


Hash.prototype = thoonkmodule.ThoonkBaseObject.prototype;
Hash.prototype.constructor = Hash;
Hash.prototype.objtype = 'hash';
Hash.prototype.scriptdir = __dirname + '/scripts/hash';

Hash.prototype.create = objCreate;
Hash.prototype.get = objGet;

exports.Hash = Hash;
