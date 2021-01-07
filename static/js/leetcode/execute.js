

function execute(qid) {
  if (qid === 1) twoSum();
  else if (qid === 448) findDisappearedNumbers();
}

function findDisappearedNumbers() {
  var array = JSON.parse(document.querySelector("#input1").value);
  SVGArray.clearArrayOnSvg();
  SVGArray.createArrayOnSvg(array);

  // create the field for Parameters
  var svg = d3.select("#svg-container");
  svg.append('text')
     .attr('x', 50)
     .attr('y', 200)
     .attr('id', 'currentElement')
     .text('Current Element:');
  svg.append('text')
     .attr('x', 50)
     .attr('y', 230)
     .attr('id', 'index')
     .text('Go to index:');
  svg.append('text')
     .attr('x', 50)
     .attr('y', 260)
     .attr('id', '')
     .text('And make the element negative');
  svg.append('text')
     .attr('x', 50)
     .attr('y', 290)
     .attr('id', 'result')
     .text('Result:');

  $(function(){
    loopArray448(array, 0);
    document.addEventListener('loopComplete', function() {
      SVGArray.deactivateElement(array.length - 1);
      console.log('array:', array);
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i] > 0) {
          result.push(i+1);
          SVGArray.activateElement(i);
        }
      }
      console.log('result:', result);
      document.querySelector('#result').innerHTML = 'Result: [' + result + ']';

    });
  });
}

function twoSum(qid) {
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
    loopArray1(array, target, map, 0);
  });
}

var loopArray448 = function(arr, i) {
  interateStep448(arr, i, function(){
    i++;
    if (i < arr.length) {
      loopArray448(arr, i);
    } else {
      var event = document.createEvent("Event");
      event.initEvent("loopComplete", true, true);
      document.dispatchEvent(event);
    }
  });
}

function interateStep448(array, i, callback) {
  setTimeout(function() {
    SVGArray.activateElement(i);
    SVGArray.deactivateElement(i-1);
    var val = array[i];
    var index = Math.abs(val) - 1;
    if (array[index] > 0) {
      array[index] = - array[index];
      SVGArray.changeValueOfElement(index, array[index]);
    }
    document.querySelector('#currentElement').innerHTML = "Current Element: " + val;
    document.querySelector('#index').innerHTML = "Go to index: " + index;
    // if (i == array.length - 1) {
    //
    // }
    callback();
  }, 1000);

}

var loopArray1 = function(arr, target, map, i) {
    iterateStep1(arr, target, map, i, function(){
        i++;
        if(i < arr.length) {
            loopArray1(arr, target, map, i);
        }
    });
}

function iterateStep1(array, target, map, i, callback) {
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
