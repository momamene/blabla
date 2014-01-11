var RSS = require('rss');
var request = require('request');
var http = require("http");

var UpdateFrequency = 10000,
    MaxNumOfItem = 30,
    feedinfo = {
        title: 'BlaBla Magazine',
        description: 'Publish world the most worthless news',
        author: 'Hyuntak Joo',
        copyright: 'Copyright (c) 2014 BIGMAMA All rights reserved',
        pubDate: 'January 11, 2014 04:00:00 GMT'
    };
var iteminfo = [];
var feedxml = 'Ready...';
setInterval(function() {
    request('http://hangul.thefron.me/generate.json?&paragraphs=2&length=short', function (error, response, body) {
        var paragraphs = JSON.parse(body).ipsum.split('<br><br>'),
            title = paragraphs[0].split('.')[0],
            author = paragraphs[0].split('.')[1].split(' ')[1];
        if (iteminfo.length >= MaxNumOfItem) {
            iteminfo.shift();
        }
        iteminfo.push({
            title: title,
            description: paragraphs[1],
            author: author,
            url: 'http://example.com/article4?this&that',
            date: new Date()
        });
        //Generate Feed XML
        var feed = new RSS(feedinfo);
        for (var i in iteminfo) {
            feed.item(iteminfo[iteminfo.length - 1 - i]);
        }
        feedxml = feed.xml().replace(/pubDate/gi, 'dc:date').replace(/dc:creator/gi, 'author');
    });
}, UpdateFrequency);

console.log('BlaBla server started');
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/xml"});
    response.write(feedxml);
    response.end();
}).listen(8888);
