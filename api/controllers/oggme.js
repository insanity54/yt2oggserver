'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var ffmpeg = require('fluent-ffmpeg');
var ytdl = require('ytdl-run-ng');


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  oggme: oggme
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function oggme(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}


  var url = req.swagger.params.url.value || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  //const url = 'https://www.youtube.com/watch?v=IgbO5pilG5I';

  const opts = [
    '-f', 'bestaudio', url
  ];

  console.log(`oggdd ${url}`)

  var v = ytdl.stream(opts).stdout

  res.attachment().set('Content-Type', 'audio/ogg');
  ffmpeg(v)
    .noVideo()
    .audioCodec('vorbis')
    .toFormat('ogg')
    .pipe(res, {end: true});


}
