// JS 
var seriesPalette = ['#c9c9c9', '#9E9E9E']; 
var differencePalette = ['#C8E6C9', '#FFAB91']; 
  
var datar = [ 
  { 
    category: 'Bandipur Tigers',
    prediction: 270, 
    current: 150,
  },
]; 
  
function colorText(text, color) { 
  return ( 
    '<span color=' + 
    color + 
    '><b>' + 
    text + 
    '</b></span>'
  ); 
} 
  
var series = makeSeriess(datar); 
series.push( 
  makeDifferenceSeries(series, differencePalette) 
); 
  
var chartu = JSC.chart('chartDiv3', { 
  debug: true,
  type: 'horizontal column solid', 
  palette: seriesPalette, 
  title_label_text: 
    'Tiger amount in Bandipur Tiger Reserve, ' + 
    colorText('prediction', seriesPalette[0]) + 
    ' vs ' + 
    colorText('current presence', seriesPalette[1]) + 
    ' comparison (in integers)', 
  legend_visible: false, 
  yAxis: { 
    scale_range_padding: 0.15, 
    formatString: 'n2'
  }, 
  defaultPoint: { 
    tooltip: '%icon %seriesName: <b>%value</b>', 
    radius: 0, 
    outline_width: 0 
  }, 
  series: series 
}); 
  
function makeSeriess(datar) { 
  var myNest = JSC.nest().key('category'); 
  return [ { 
      name: 'Prediction', 
      points: myNest 
        .rollup('prediction') 
        .points(datar) 
    } ,
    { 
      name: 'Current', 
      points: myNest 
        .rollup('current') 
        .points(datar) 
    }, 
    
  ]; 
} 
  
/** 
 * Dynamically creates a difference series for the given array of two series. 
 * @param series - array of two series 
 * @param diffColors - array of two colors used for points depending on whether they are positive or negative. 
 */
function makeDifferenceSeries( 
  series, 
  diffColors 
) { 
  var ser1 = series[1], 
    ser2 = series[0]; 
  return { 
    name: ser1.name + ' vs. ' + ser2.name, 
    defaultPoint: { 
      label: { 
        text: '{%value:n0}', 
        align: 'right'
      }, 
      tooltip: 
        '%icon %seriesName: <b>{%yvalue-%ystart}</b>'
    }, 
    points: makeDifferencePoints( 
      ser1.points, 
      ser2.points 
    ) 
  }; 
  
  function makeDifferencePoints( 
    points1, 
    points2 
  ) { 
    return points1.map(function(p1, i) { 
      var p2 = points2[i], 
        y1 = p1.y, 
        y2 = p2.y; 
      return { 
        x: p1.x, 
        y: [y1, y2], 
        color: 
          y1 < y2 ? diffColors[0] : diffColors[1], 
        attributes_percent: 100 - (y1 / y2) * 100 
      }; 
    }); 
  } 
} 