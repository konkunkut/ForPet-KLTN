const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Sang_oc_cho_haha",
    jwtSecretAddmin:process.env.JWT_SECRET || "Sang_oc_meo_haha",
    jwtSecretEditer:process.env.JWT_SECRET || "Sang_oc_bo_haha",
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/thucungreview'
  }

  module.exports=config;
  