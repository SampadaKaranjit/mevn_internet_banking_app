const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
        },
      },
    },
    resolve: {
      fallback: {
        child_process: false,
        process: false,
        fs: false,
        http: false,
        https: false,
        tls: false,
        net: false,
        crypto: false,
        path: false,
        os: false,
        stream: false,
        zlib: false,
        url: false,
        dns: false,
        timers: false,
        querystring: false,
        util: false,
      },
    },
  },
});
