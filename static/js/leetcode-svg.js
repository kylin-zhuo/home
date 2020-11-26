var SVGArray = {

  svg: document.querySelector("#svg-container"),
  // svg: d3.select("#svg-container"),
  x0: 50, // pivot point x
  y0: 50, // pivot point y
  data: [],
  size: 0,
  width: 50,
  height: 50,
  rx: 10,
  ry: 10,

  init: function (data) {
    this.data = data;
    this.size = data.length;
  },

  createArrayOnSvg: function (array) {
/**
    <g>
      <rect x="50" y="50" rx="10" ry="10" width="50" height="50"
       style="fill:#456789;stroke:black;stroke-width:2;opacity:0.65" />
      <text x="50" y="50" transform="translate(22 28)">1</text>
    </g>
    <g>
      <rect x="100" y="50" rx="10" ry="10" width="50" height="50"
       style="fill:#456789;stroke:black;stroke-width:2;opacity:0.65" />
      <text x="100" y="50" transform="translate(22 28)">2</text>
    </g>
    <g>
      <rect x="150" y="50" rx="10" ry="10" width="50" height="50"
       style="fill:#456789;stroke:black;stroke-width:2;opacity:0.65" />
      <text x="150" y="50" transform="translate(22 28)">3</text>
    </g>
    <g>
      <rect x="200" y="50" rx="10" ry="10" width="50" height="50"
       style="fill:#456789;stroke:black;stroke-width:2;opacity:0.65" />
      <text x="200" y="50" transform="translate(22 28)">4</text>
    </g>
    <g>
      <rect x="250" y="50" rx="10" ry="10" width="50" height="50"
       style="fill:#456789;stroke:black;stroke-width:2;opacity:0.65" />
      <text x="250" y="50" transform="translate(22 28)">5</text>
    </g>
    **/

    // console.log("create an array on svg. Data: ", this.data, d3);
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
       .attr('stroke', 'black')
       .attr('stroke-width', 2)
       .attr('opacity', 0.65)
       .attr('fill', '#456789')
       .attr('rx', this.rx)
       .attr('ry', this.ry);

      g.append('text')
       .attr('x', this.x0)
       .attr('y', this.y0)
       .attr('transform', 'translate(' + (this.width * i + this.width * 0.4) + ',' + this.height * 0.6 + ')')
       .text(val);
    }


  }
};
