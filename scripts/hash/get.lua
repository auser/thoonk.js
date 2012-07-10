local result = redis.call('HGET', ARGV[1]..':'..ARGV[2], ARGV[3]);
return {false, result};
