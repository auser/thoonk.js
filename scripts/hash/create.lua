--name, config
local name = ARGV[1];
local id = ARGV[2];
local config = cjson.decode(ARGV[3]);
 -- hashes.User:<id>
local hash_name = "hashes."..name..":"..id;

if redis.call('SADD', hash_name, name) ~= 0 then
    for key, value in pairs(config) do
        redis.call('HSET', hash_name, key, value);
    end
    return {false};
end
return {"Hash already exists"};
