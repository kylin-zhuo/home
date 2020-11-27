function clearSVG() {
  d3.select("#svg-container").selectAll("*").remove();
  d3.select("#svg-container").append('rect').attr('id', 'svg-border');
  console.log("SVG cleared.");
}
