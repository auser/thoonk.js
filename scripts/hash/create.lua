--name, config
local name = ARGV[1];
local id = ARGV[2];
local config = cjson.decode(ARGV[3]);

if redis.call('SADD', 'hashes', name) ~= 0 then
    for key, value in pairs(config) do
        redis.call('HSET', '.items'name..':'..id, key, value);
    end
    return {false};
end
return {"Hash already exists"};
