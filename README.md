# Webpack 4 boilerplate

This was a test webpack.config.js, to see step by step how Webpack works. See the notes for details.

### node modules to install

npm i -D css-loader<br>
npm i -D file-loader<br>
npm i -D html-loader<br>
npm i -D html-webpack-inline-source-plugin<br>
npm i -D html-webpack-plugin<br>
npm i -D node-sass<br>
npm i -D sass-loader<br>
npm i -D style-loader<br>
npm i -D webpack<br>
npm i -D webpack-cli<br>

This relies on a structure like this:

```
/project-folder
---webpack.config.js
--/src/index.js
--/src/index.scss
--/src/index.js

```

This config will:

* set the Webpack mode to 'production'
* Use /src/main.js as the entry point
* Transpile any SCSS, SASS, or CSS that is imported by the index.js
* Pack the CSS with all the JS
* Create a bundle.js in /dist
* Inject the JS from the bundle.js inline into the index.html
* Copy the Index.html to /dist
* Copy any images in the index.html into /src/images



