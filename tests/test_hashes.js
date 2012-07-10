var TestObject = require("./testcore").TestObject,
    Thoonk = require("../thoonk").Thoonk,
    Hash = require("../hash").Hash;


var tests = new TestObject([
], function(config) {
  var thoonk = new Thoonk(config.host, config.port, config.db);
  thoonk.registerType('Hash', Hash, function() {
    tests.on("done", function() {
      thoonk.quit();
    });
    thoonk.redis.flushdb();
    var testobj  = thoonk.objects.Hash('User');
    
    testobj.create({"id":'1', "name": "ari", "password":"123456"}, function(err, obj) {
      console.log("created", arguments);
      
      testobj.get('1', function() {
        console.log("get", arguments);
        
        this.emit('done');
      });
      
    });
    
  });  
});

exports.tests = tests;