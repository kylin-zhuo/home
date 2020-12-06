
function execute(qid) {
  console.log("EXECUTE:", qid); // TODO: add each execution function for all the problems
  var array = JSON.parse(document.querySelector("#input1").value);
  var target = JSON.parse(document.querySelector("#input2").value);
  var map = {};
  SVGArray.clearArrayOnSvg();
  SVGArray.createArrayOnSvg(array);

  // create a field for HashSet
  var svg = d3.select("#svg-container");
  svg.append('text')
   .attr('x', 50)
   .attr('y', 200)
   .attr('id', 'target')
   .text("Target: " + target);
  svg.append('text')
   .attr('x', 50)
   .attr('y', 230)
   .attr('id', 'hashset')
   .text(printMap(map));
  svg.append('text')
  .attr('x', 50)
  .attr('y', 260)
  .attr('id', 'result')
  .text("Result: " + '[-1, -1]');

  // loop
  $(function(){
    loopArray(array, target, map, 0);
  });
}

var loopArray = function(arr, target, map, i) {
    iterateStep(arr, target, map, i, function(){
        i++;
        if(i < arr.length) {
            loopArray(arr, target, map, i);
        }
    });
}

function iterateStep(array, target, map, i, callback) {
  setTimeout(function() {
    SVGArray.activateElement(i);
    SVGArray.deactivateElement(i-1);
    if (map.hasOwnProperty(target-array[i])) {
      document.querySelector("#result").innerHTML = 'Result: [' + map[target-array[i]] + ', ' + i + ']';
      return;
    } else {
      map[array[i]] = i;
      document.querySelector("#hashset").innerHTML = printMap(map);
    }
    callback();
  }, 1000);
}

function printMap(map) {
  if (!map || Object.keys(map).length == 0) {
    return 'Map: {}';
  }
  var string = 'Map: {';
  var key;
  for (key in map) {
    string += key + ':' + map[key] + ', ';
  }
  string = string.substring(0, string.length-2) + '}';
  return string;
}
