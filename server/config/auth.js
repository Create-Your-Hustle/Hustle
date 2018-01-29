var authConfigs = {
    googleAuth: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackUrl: process.env.CALLBACK_URL,
    },

    sessionVars: {
      secret: process.env.SECRET,
    },
  };

module.exports = authConfigs;