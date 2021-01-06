var SVGArray = {

  svg: document.querySelector("#svg-container"),
  x0: 50, // pivot point x
  y0: 50, // pivot point y
  data: [],
  size: 0,
  width: 50,
  height: 50,
  rx: 10,
  ry: 10,
  activatedColor: '#f00',
  deactivatedColor: '#aaa',

  init: function (data) {
    this.data = data;
    this.size = data.length;
  },

  createArrayOnSvg: function (array) {

    console.log(d3.select("#svg-container"), array);
    var svg = d3.select("#svg-container");
    for (var i in array) {
      var val = array[i];
      var g = svg.append('g');

      g.append('rect')
       .attr('x', this.x0)
       .attr('y', this.y0)
       .attr('width', this.width)
       .attr('height', this.height)
       .attr('transform', 'translate(' + this.width * i + ',0)')
       .attr('stroke', '#700')
       .attr('stroke-width', 2)
       .attr('opacity', 0.62)
       .attr('fill', this.deactivatedColor)
       .attr('rx', this.rx)
       .attr('ry', this.ry);

      g.append('text')
       .attr('x', this.x0)
       .attr('y', this.y0)
       .attr('transform', 'translate(' + (this.width * i + this.width * 0.4) + ',' + this.height * 0.6 + ')')
       .text(val);

      g.append('text')
       .attr('x', this.x0)
       .attr('y', this.y0)
       .attr('transform', 'translate(' + (this.width * i + this.width * 0.4) + ',' + this.height * 1.35 + ')')
       .text(i)
       .attr('style', 'opacity: 0.5; font-size:10px;');

    }
    this.size = array.length;
  },

  clearArrayOnSvg: function () {
    // d3.select("#svg-container").selectAll("*").remove();
    // d3.select("#svg-container").append('rect').attr('id', 'svg-border');
    clearSVG();
  },

  activateElement: function (idx) {
    var rect = document.querySelectorAll("rect")[parseInt(idx)+1];
    if (!!rect) {
      rect.setAttribute('fill', this.activatedColor);
      console.log("activate element - success -", idx);
    } else {
      console.log("activate element - failed -", idx);
    }
  },

  deactivateElement: function (idx) {
    var rect = document.querySelectorAll("rect")[parseInt(idx)+1];
    if (!!rect) {
      rect.setAttribute('fill', this.deactivatedColor);
      console.log("deactivate element - success -", idx);
    } else {
      console.log("deactivate element - failed -", idx);
    }
  },

  changeValueOfElement: function (idx, newValue) {
    var rect = document.querySelectorAll("rect")[parseInt(idx)+1];
    if (!!rect && !!rect.nextElementSibling) {
      rect.nextElementSibling.innerHTML = newValue;
    }
  }
};
