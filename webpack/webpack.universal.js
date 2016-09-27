var webpack = require('webpack');
var path = require('path');

var configBrowser = function(config) {
  config.target = 'web';
  config.entry =  './src/client.ts',
    config.output.filename = 'client/index.js';
  config.output.library = 'universal';
  config.output.libraryTarget = 'var';

  config.node = {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    module: false,
  };

  return config;
};

var configServer = function(config) {
  config.target = 'node';
  config.entry =  {
    express: './src/server.ts'
  },
    config.output.filename = 'server/index.js';
  config.output.library = 'universal';
  config.output.libraryTarget = 'commonjs2';

  config.externals = ignoreAlias(config);

  config.node = {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true,
  };


  return config;
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

function ignoreAlias (config, log) {
  if (!config) return;
  var aliass = [];
  if (Array.isArray(config)) {
    aliass = config
  } else if (('resolve' in config) && ('alias' in config.resolve)) {
    aliass = Object.keys(config.resolve.alias);
  }

  return function (context, request, cb) {
    if (aliass.includes(request)) {
      if (log) { console.log('resolve.alias', request); }
      return cb();
    }
    return checkNodeImport(context, request, cb);
  }
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    return cb(null, 'commonjs ' + request);
  }
  return cb();
}


var clone = require('js.clone');

var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var sharedPlugins = [
  //new DedupePlugin(),
  // new UglifyJsPlugin({
  //   // beautify: true, //debug
  //   // mangle: false, //debug
  //   mangle: true, //prod
  //   compress: {
  //     screw_ie8: true,
  //     keep_fnames: true,
  //     // drop_debugger: false,
  //     dead_code: true,
  //     unused: true
  //   },
  //   comments: false,

  // }),
  
  new ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    root('./src')
  ),
  new TsConfigPathsPlugin({
    tsconfig: 'tsconfig.json'
  }),
  new ForkCheckerPlugin()
];

var webpackConfig = setTypeScriptAlias(require('../tsconfig.json'), {
  cache: true,

  devtool: 'source-map',

  output: {
    filename: '[name]-bundle.js',
    path: './dist',
  },

  module: {
    preLoaders: [
      // fix angular2
      {
        test: /(systemjs_component_resolver|system_js_ng_module_factory_loader)\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: '(lang_1(.*[\\n\\r]\\s*\\.|\\.))?(global(.*[\\n\\r]\\s*\\.|\\.))?(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import',
          replace: 'System.import',
          flags: 'g'
        }
      },
      {
        test: /.js$/,
        loader: 'string-replace-loader',
        query: {
          search: '',
          replace: '',
          flags: 'g'
        }
      }
      // end angular2 fix
    ],
    loaders: [
      // .ts files for TypeScript
      { 
        test: /\.(js|ts)$/, 
        loaders: [
          'awesome-typescript-loader', 'angular2-template-loader'], 
        exclude: [/node_modules/] 
      },
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader']
      },

      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { 
        test: /\.(png|jpg)$/,    loader: 'file?name=assets/[name].[ext]' 
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
          replace: 'var sourceMappingUrl = "";',
          flags: 'g'
        }
      }
    ]

  },

  plugins: [
    // don't define plugins here. define them above in shared plugins
  ],

  resolve: {

    // packageMains: ['jsnext:main', 'main', 'jsnext:browser', 'browser', 'jsnext:main'],

    extensions: ['', '.ts', '.js', '.json'],

    alias: {
      // 'rxjs': root('node_modules/rxjs-es'),
      // '@angular/common': root('node_modules/@angular/common/esm'),
      // '@angular/compiler': root('node_modules/@angular/cpmiler/esm'),
      // '@angular/core': root('node_modules/@angular/core/esm'),
      // '@angular/forms': root('node_modules/@angular/forms/esm'),
      // '@angular/http': root('node_modules/@angular/http/esm'),
      // '@angular/platform-browser': root('node_modules/@angular/platform-browser/esm'),
      // '@angular/platform-browser-dynamic': root('node_modules/@angular/platform-browser-dynamic/esm'),
      // '@angular/platform-server': root('node_modules/@angular/platform-server/esm'),

    }

  },

})

module.exports = [
  plugins(sharedPlugins, configBrowser(clone(webpackConfig))),
  plugins(sharedPlugins, configServer(clone(webpackConfig))),
]


function plugins(plugins, config) {
  config.plugins = config.plugins.concat(plugins);
  return config
}


function setTypeScriptAlias(tsConfig, config) {
  var newConfig = clone(config);
  newConfig = newConfig || {};
  newConfig.resolve = newConfig.resolve || {};
  newConfig.resolve.alias = newConfig.resolve.alias || {};
  var tsPaths = tsConfig.compilerOptions.paths;
  for (var prop in tsPaths) {
    newConfig.resolve.alias[prop]  = root(tsPaths[prop][0]);
  }
  return newConfig;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
