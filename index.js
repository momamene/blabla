var RSS = require('rss');

/* lets create an rss feed */
var feed = new RSS({
    title: 'BlaBla Magazine',
    description: 'Publish world the most worthless news',
    feed_url: 'http://example.com/rss.xml',
    site_url: 'http://blabla.com',
    image_url: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    author: 'Hyuntak Joo',
    managingEditor: 'Hyuntak Joo',
    webMaster: 'Hyuntak Joo',
    copyright: 'Copyright (c) 2014 BIGMAMA All rights reserved',
    language: 'ko',
    pubDate: 'January 11, 2014 04:00:00 GMT'
});

/* loop over data and add to feed */
feed.item({
    title:  'item title',
    description: 'use this for the content. It can include html.',
    url: 'http://example.com/article4?this&that', // link to the item
    author: 'Guest Author', // optional - defaults to feed author property
    date: 'January 11, 2014' // any format that js Date can parse.
});

// cache the xml to send to clients
var xml = feed.xml().replace(/pubDate/gi, 'dc:date');
console.log(xml);
