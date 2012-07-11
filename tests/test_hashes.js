var TestObject = require("./testcore").TestObject,
    Thoonk = require("../thoonk").Thoonk,
    Hash = require("../hash").Hash;


var tests = new TestObject([
], function(config) {
  var thoonk = new Thoonk(config.host, config.port, config.db);
  thoonk.registerType('Hash', Hash, function() {
    thoonk.redis.flushdb();
    
    var testobj  = thoonk.objects.Hash('User');
    
    testobj.create({"id":'1', "name": "ari", "password":"123456"}, function(err, obj) {
      console.log("created", arguments);
      thoonk.quit();
      
      testobj.get('1', function() {
        console.log("get", arguments);
      });
      
    });
    
  });  
});

exports.tests = tests;