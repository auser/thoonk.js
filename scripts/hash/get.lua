local result = redis.call('HGET', "hashes.items");
return {false, result};
