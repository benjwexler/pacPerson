# pacPerson
Pac-Man clone written in Javascript &amp; utilizing D3 (In-Progress)

Run `python -m SimpleHTTPServer [port]`

Currently, `index.html` is serving one script file `bundle.js`, which was created using `rollup.js` to bundle all es6 modules into one file. 

If you'd like to modify the code, I'd suggest commenting out  the script for `bundle.js` and uncommenting the script for `app.js` in `index.html`.
This will enable you to modify the code in seperate files. 

You can then use `rollup` to re-bundle the app by running the following commands

* npm install --global rollup
* rollup app.js --file bundle.js --format iife
