var clusterfck = require("../../../lib/hcluster.js");

var colors = [
   { color: [255, 255, 255], freq: 300 },
   { color: [253, 253, 253], freq: 500 },
   { color: [120, 130, 255], freq: 700 },
   { color: [120, 130, 40], freq: 70 },
   { color: [23, 30, 10], freq: 9 },
   { color: [250, 255, 246], freq: 90 },
   { color: [255, 255, 245], freq: 100 },
   { color: [31, 30, 12], freq: 13 },
   { color: [14, 20, 1], freq: 23 },
];

var distance = function(c1, c2) {
   return Math.sqrt(Math.pow(c2.color[0] - c1.color[0], 2)
     + Math.pow(c2.color[1] - c1.color[1], 2)
     + Math.pow(c2.color[2] - c1.color[2], 2));
}

var merge = function(c1, c2) {
   var rgb1 = c1.color, rgb2 = c2.color;
   var r = (rgb1[0] + rgb2[0]) / 2;
   var g = (rgb1[1] + rgb2[1]) / 2;
   var b = (rgb1[2] + rgb2[2]) / 2;
   return {
      color: [r, g, b],
      freq: c1.freq + c2.freq
   };
}

exports.testCallback = function(test) {
   var clusters = clusterfck.hcluster(colors, distance, merge);
   var expected = [{"canonical":{"color":[128.4375,134.875,137.6875],"freq":1805},"left":{"canonical":{"color":[186.625,192.25,252.375],"freq":1690},"left":{"canonical":{"color":[253.25,254.5,249.75],"freq":990},"left":{"canonical":{"color":[254,254,254],"freq":800},"left":{"canonical":{"color":[253,253,253],"freq":500},"size":1},"right":{"canonical":{"color":[255,255,255],"freq":300},"size":1},"size":2},"right":{"canonical":{"color":[252.5,255,245.5],"freq":190},"left":{"canonical":{"color":[250,255,246],"freq":90},"size":1},"right":{"canonical":{"color":[255,255,245],"freq":100},"size":1},"size":2},"size":4},"right":{"canonical":{"color":[120,130,255],"freq":700},"size":1},"size":5},"right":{"canonical":{"color":[70.25,77.5,23],"freq":115},"left":{"canonical":{"color":[20.5,25,6],"freq":45},"left":{"canonical":{"color":[27,30,11],"freq":22},"left":{"canonical":{"color":[31,30,12],"freq":13},"size":1},"right":{"canonical":{"color":[23,30,10],"freq":9},"size":1},"size":2},"right":{"canonical":{"color":[14,20,1],"freq":23},"size":1},"size":3},"right":{"canonical":{"color":[120,130,40],"freq":70},"size":1},"size":4},"size":9}]
   test.deepEqual(clusters, expected, "final clusters do not match expected");
   
   test.done();
}
