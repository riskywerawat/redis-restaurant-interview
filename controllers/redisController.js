const redis = require('redis');

// ! get redis controller ใช้สำหรับ get ค่าจาก redis โดยใช้ key;
exports.getRedis = (req, res) =>{

    try {
        console.log(`#################### request getRedis : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            redisClient.get(req.body.key, (err, v) =>{  

                if ( v ){
                    response = { 
                        "respCode" : "1",
                        "respDesc" : "Success",
                        "namespace" : "REDIS",
                        "data" : JSON.parse(v),
                    }
                }else{
                    response = { 
                        "respCode" : "102",
                        "respDesc" : "key dose not exists.",
                        "namespace" : "REDIS",
                        "data" : {}
                    }
                }
                !res.headersSent ? res.status(200).send(response) : ''
                redisClient.quit()
            })

        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        });

    }catch (err){
        console.log(err);
    }

}
// ! get redis controller ใช้สำหรับ set ค่าจาก redis โดยใช้ key และ value;
exports.setRedis = (req, res) =>{
    
    try{
        console.log(`#################### request setRedis : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            redisClient.set(req.body.key,JSON.stringify(req.body.value));
            response = { 
                "respCode" : "1",
                "respDesc" : "Success",
                "namespace" : "REDIS",
                "data" : "data has been set"
            }
            !res.headersSent ? res.status(200).send(response) : ''
            redisClient.quit()
        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        });
    }catch (err){
        console.log(err);
        
    }
}
// ! get redis controller ใช้สำหรับ set โดยมีการกำหนด expired
// ! ค่าจาก redis โดยใช้ key และ value;
exports.setRedisExpired = (req, res) =>{
    
    try{
        console.log(`#################### request setRedisExpired : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            if ( req.body.expired ){
                redisClient.setex(req.body.key, req.body.expired, JSON.stringify(req.body.value));
                response = { 
                    "respCode" : "1",
                    "respDesc" : "Success",
                    "namespace" : "REDIS",
                    "data" : "data has been set"
                }
                !res.headersSent ? res.status(200).send(response) : ''
                redisClient.quit()
            }else{
                redisClient.set(key, JSON.stringify(value));
                response = { 
                    "respCode" : "1",
                    "respDesc" : "Success",
                    "namespace" : "REDIS",
                    "data" : "data has been set"
                }
                !res.headersSent ? res.status(200).send(response) : ''
                redisClient.quit()
            }
        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        });
    }catch (err){
        console.log(err);
        
    }
}
// ! deleteByKey redis controller ใช้สำหรับ delete
// ! กำหนด ที่จะ delete redis โดยใช้ key
exports.deleteByKey = (req, res) =>{
    
    try{
        console.log(`#################### request deleteByKey : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            redisClient.del(req.body.key, function(err, v) {
                if (v == 1) {
                    response = { 
                        "respCode" : "1",
                        "respDesc" : "Success",
                        "namespace" : "REDIS",
                        "data" : ""+req.body.key+" has been delete."
                    }
                    !res.headersSent ? res.status(200).send(response) : ''
                    redisClient.quit()
                } else{
                    response = { 
                        "respCode" : "102",
                        "respDesc" : "Success",
                        "namespace" : "REDIS",
                        "data" : ""+req.body.key+" dose not exist."
                    }
                    !res.headersSent ? res.status(200).send(response) : ''
                    redisClient.quit()
                }
            })
            
        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        });
    }catch(err){
        console.log(err);
        
    }
}
// ! deleteAll redis controller ใช้สำหรับ deleteAll ทั้งหมด

exports.deleteAll = (req, res) =>{
    
    try{
        console.log(`#################### request deleteAll : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            redisClient.flushall();
            response = { 
                "respCode" : "1",
                "respDesc" : "Success",
                "namespace" : "REDIS",
                "data" : "Delete all keys",
            }
            !res.headersSent ? res.status(200).send(response) : ''
            redisClient.quit()
        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        })
    }catch (err){
        console.log(err);
        
    }
}
// ! exists redis controller ใช้สำหรับ ตรวจสอบ exist ค่า
exports.exists = (req, res) =>{
    
    try {
        console.log(`#################### request exists : ${JSON.stringify(req.body)} #################### `);
        const redisClient = redis.createClient(req.body.port, req.body.host, {disable_resubscribing: true});

        redisClient.on('ready', function() {
            console.log('Redis client connected');
            
            redisClient.exists(req.body.key, (err,v) => {
                if ( v == 1 ){
                    response = { 
                        "respCode" : "1",
                        "respDesc" : "Success",
                        "namespace" : "REDIS",
                        "data" : true
                    }
                }else{
                    response = { 
                        "respCode" : "102",
                        "respDesc" : "key dose not exists.",
                        "namespace" : "REDIS",
                        "data" : false
                    }
                }
                !res.headersSent ? res.status(200).send(response) : ''
                redisClient.quit()
            });
        });
        
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
            redisClient.end(true)
            response = { 
                "respCode" : "101",
                "respDesc" : "Connection fail",
                "namespace" : "REDIS",
                "data" : {},
            }
            !res.headersSent ? res.status(400).send(response) : ''
            redisClient.quit()
        });
    }catch (err){
        console.log(err);
        
    }
}
