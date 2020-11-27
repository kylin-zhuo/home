
function execute(qid) {
  console.log("EXECUTE:", qid); // TODO: add each execution function for all the problems
  var array = JSON.parse(document.querySelector("#input1").value);
  var target = JSON.parse(document.querySelector("#input2").value);
  var set = new Set();
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
   .text(printSet(set));
  svg.append('text')
  .attr('x', 50)
  .attr('y', 260)
  .attr('id', 'result')
  .text("Result: " + 'false');

  // algorithm
  $(function(){
    loopArray(array, target, set, 0);
  });

}

var loopArray = function(arr, target, set, i) {
    iterateStep(arr, target, set, i, function(){
        i++;
        if(i < arr.length) {
            loopArray(arr, target, set, i);
        }
    });
}

function iterateStep(array, target, set, i, callback) {
  setTimeout(function() {
    SVGArray.activateElement(i);
    SVGArray.deactivateElement(i-1);
    if (set.has(target-array[i])) {
      document.querySelector("#result").innerHTML = "Result: true";
      return;
    } else {
      set.add(array[i]);
      document.querySelector("#hashset").innerHTML = printSet(set);
    }
    callback();
  }, 1000);
}

function printSet(set) {
  var val = 'HashSet: [';
  for (item of set.values())
    val += (item + ',');
  val = val.substring(0, val.length-1) + ']';
  return val;
}
