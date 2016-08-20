var config = {
  "swFile": "web/serviceworker.js",
  "staticFileGlobs": [
    "web/manifest.json",
    "web/**/*.css",
    "web/**/*.{ttf,woff,woff2,eof}",
    "web/**/*.js",
    "web/**/*.html",
    "web/**/*.{png,jpg,gif,svg,mp3}"
  ],
  "runtimeCaching": [
    {
      "urlPattern": /^https:\/\//,
      "handler": "networkFirst"
    }
  ],
  "handleFetch": true,
  "stripPrefix": "web/",
  "cacheId": "web-lightbulb",
  "maximumFileSizeToCacheInBytes": 4194304,
  "ignoreUrlParametersMatching": [/./],
  "verbose": true
};

require('sw-precache').write(config.swFile, config);
