# Webpack 4 boilerplate

## Notes on using Webpack 4



### node modules to install


npm i -D css-loader<br>
npm i -D file-loader<br>
npm i -D html-loader<br>
npm i -D html-webpack-inline-source-plugin<br>
npm i -D html-webpack-plugin<br>
npm i -D node-sass<br>
npm i -D sass-loader<br>
npm i -D style-loader<br>
npm i -D tumblr-theme-loader<br>
npm i -D webpack<br>
npm i -D webpack-cli<br>



### to bundle and minify js file and place in /dist


create project folder
npm init -y
npm i -D webpack webpack-cli

create index.html
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h2>webpack test 01 A</h2>
      <script src="dist/index.js"></script>
    </body>
  </html>

create /src folder
create /src/index.js
  console.log('from index.js');

in package.json
  "scripts": {
    "build" : "webpack"
  },

npm run build
/dist/main.js is created
it is minified b/c it is in production mode by default.

load index.html in browser

in package.json
  "scripts": {
    "prod" : "webpack -p",
    "dev" : "webpack -d"
  },

npm run dev
/dist/main.js is created
it is NOT minified b/c it is in development mode.



### to bundle and minify 2 js files and place in /dist


create /src/support01.js
  export var name = "Washington";

change /src/index.js
  console.log('from index.js');
  import {name} from './support01.js';
  console.log(name);

npm run build
/dist/main.js is now a bundle of the 2 js files

load index.html in browser



### configure webpack from defaults


The above uses webpack defaults. It can be configured differently using a 'webpack.config.js' file.

create /webpack.config.js
  const path = require('path');

  module.exports = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist02'),
      filename: 'bundle.js'
    }
  };

Adds a path object from nodejs.
Specs the initial JS file to use that then imports other files. We changed it to '/src/main.js'.
Use path object to tell where final bundle goes. We changed it to 'dist02'.
Tell what destination bundle file name should be. We changed it to 'bundle.js'.



### bundle css


'css-loader' helps collect CSS from css files and put into a string,
then 'style-loader' takes output string and puts it in virtual <style> tags in index.html.

npm i -D style-loader css-loader

in webpack.config.js, after output, add
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader:'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  }

even tho css-loader is second, it processes first, then sends to style-loader.

add to src/main.js
  import './src/style.css';

npm run prod
css is bundled into bundle.js. js will create style tag in index.html.
load index.html in browser

create /src/typo.css
  * {
    font-family: Arial, sans-serif;
  }

add to src/main.js
  import './src/typo.css';

font-family will now be included in styles when bundled.
This can add a link tag instead with some changes in settings.



### automatically rebundle on file changes


in package.json add to scripts
  "watch": "webpack --watch"

npm run watch
webpack will now monitor if files are changed and rebundle.


### force production mode */


in webpack.config.js add to module.exports
  mode: 'production',

in package.json add to scripts
  "build": "webpack",

npm run build



### transpiling SASS/SCSS


npm i -D sass-loader node-sass

in webpack.config.js
  rules, test, use, after css-loader (so that sass processes first)
  {loader: 'sass-loader'}
  change /\.css$/ to /.\scss$/

rename /src/style.css to *.scss
  $clr01: #ff0;
  $clr02: #f0f;

  body {
    background-color: $clr01;
    h2 {
      color: $clr02;
    }
  }

in main.js comment out typo.css and change style.css to style.scss

npm run build

in webpack.config.js change test
  test: /\.(css|sass|scss)$/,

in main.js un-comment /src/typo.css
rename /src/style.scss to /src/style.sass (change code to sass style)

npm run build



### creating an index.html file in /dist


npm i -D html-webpack-plugin

add to webpack.config.js
  const HtmlWebpackPlugin = require('html-webpack-plugin');

and

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html'
    })
  ]

npm run build

/dist02/index.html will be created and will have a script link to bundle.js



### template for index.html


create a /src/index.html
in webpack.config.js, in the HtmlWebpackPlgin settings, add
  template: './src/index.html'

npm run build

to include variables in /dist02/index.html
  <h2><%= htmlWebpackPlugin.options.title }%>/h2>
  (note how first letter is lower case

and

in webpack.config.js, in the HtmlWebpackPlgin settings, add
      title: 'Template Title from Config'

npm run build



### bring images over to dist */


npm i -D file-loader

in webpack.config.js add
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
  }

put image 'morena01.jpg' in /src.

in /src/main.js add
  import './morena01.jpg';

npm run build

image is in /dist02, name is hashed

to preserve name

in webpack.config.js change to

  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader:'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
  npm run build

  image is in /dist02/src/morena01.jpg



### bring images over to dist based on index.html <img>


npm i -D html-loader

in /src/main.js comment out
  import './morena01.jpg';

in /src/index.html add
  <img src="morena01.jpg">

html-loader reads html file and does a require for the image, so /src/main.js doesn't need it.
will get images from path, then put them in /dist02 root.
looks like html-loader breaks HtmlWebpackPlugin variables.

to have a /src/images folder, then have one made in /dist02 
(otherwise will just go to /dist02. there is [path], but that works from project root)
move image to /src/images/morena01.jpg, and set img src to 'images/morena01.jpg'

  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader:'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images'
        }
      }
    ]
  }

to minify html change to
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }
    ]
  }



### write js and css into html



npm i -D html-webpack-inline-source-plugin

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin'); <------ add this

in webpack.config.js
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html', 
      inlineSource: 'bundle.js' <------ add this (remove hash)
    }),
    new HtmlWebpackInlineSourcePlugin() <------ add this
  ]

npm run build

/dist02/index.html now has the /dist02/bundle.js code embedded (which has the css)



### use jquery via npm */


npm i -D jquery

in webpack.config.js add 

  const webpack = require('webpack');

  new webpack.ProvidePlugin(
    {
      $ : 'jquery',
      jQuery: 'jquery'
    }
  )

in /src/main.js add 
  $('body').append('<div>hello</div>');

npm run build

hello should now appear in page



### bundling html css and js for tumblr


Looks like webpack.coinfig.js should be kept in development mode, 
minifying causes problems on tumblr even if it works locally.
Don't forget to import css into the js.

there is a 'tumblr-theme-loader'
that allows use of json to locally simulate tumblr data
it raplaces tumblr tags with data in the html
so comment it out before bundling for production
note how object is placed in object

npm i -D tumblr-theme-loader

in webpack.config.js add

  const tumblrData = {"Title": "Reg Blog"};

  {
    test: /\.html$/,
    use: [
      {
        loader: 'tumblr-theme-loader',
        options: {
            tumblrData
        }
      }
    ]
  }
