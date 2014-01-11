var RSS = require('rss');
var request = require('request');
var http = require("http");

/* lets create an rss feed */
var feed = new RSS({
    title: 'BlaBla Magazine',
    description: 'Publish world the most worthless news',
    author: 'Hyuntak Joo',
    copyright: 'Copyright (c) 2014 BIGMAMA All rights reserved',
    pubDate: 'January 11, 2014 04:00:00 GMT'
});
var feedxml = feed.xml().replace(/pubDate/gi, 'dc:date').replace(/dc:creator/gi, 'author');
setInterval(function() {
    request('http://hangul.thefron.me/generate.json?&paragraphs=2&length=short', function (error, response, body) {
        var paragraphs = JSON.parse(body).ipsum.split('<br><br>'),
            title = paragraphs[0].split('.')[0],
            author = paragraphs[0].split('.')[1].split(' ')[1];
        feed.item({
            title: title,
            description: paragraphs[1],
            author: author,
            url: 'http://example.com/article4?this&that',
            date: new Date()
        });
        feedxml = feed.xml().replace(/pubDate/gi, 'dc:date').replace(/dc:creator/gi, 'author');
    });
}, 10000);

console.log('BlaBla server started');
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/xml"});
  response.write(feedxml);
  response.end();
}).listen(8888);
