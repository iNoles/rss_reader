var ghpages = require('gh-pages')
var path = require('path')

ghpages.publish('dist'),
  function (err) {
    console.log('Error publishing to gh-pages branch...')
    console.log(err)
  }
