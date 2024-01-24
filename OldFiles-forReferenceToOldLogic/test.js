// JS 
var seriesPalette = ['#c9c9c9', '#9E9E9E']; 
var differencePalette = ['#C8E6C9', '#FFAB91']; 
  
var datae = [ 
  { 
    category: 'Bandipur Forest', 
    value2019: 49.67,
    value2020: 53.13,
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
  
var seriess = makeSeries(datae); 
seriess.push( 
  makeDifferenceSeries(seriess, differencePalette) 
); 
var e = seriess[2].points
e[0].attributes_percent = (datae[0].value2020)-(datae[0].value2019)
  
var charte = JSC.chart('chartDiv2', { 
  type: 'horizontal column solid', 
  palette: seriesPalette, 
  title_label_text: 
    'Forest cover statistics in Bandipur Tiger Reserve, ' + 
    colorText('2011', seriesPalette[0]) + 
    ' and ' + 
    colorText('2019', seriesPalette[1]) + 
    ' comparison (in percentage %)', 
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
  series: seriess 
}); 
  
function makeSeries(datae) { 
  var myNest = JSC.nest().key('category'); 
  return [ { 
      name: '2011', 
      points: myNest 
        .rollup('value2020') 
        .points(datae) 
    } ,
    { 
      name: '2019', 
      points: myNest 
        .rollup('value2019') 
        .points(datae) 
    }, 
    
  ]; 
} 
  
/** 
 * Dynamically creates a difference series for the given array of two series. 
 * @param seriess - array of two series 
 * @param diffColors - array of two colors used for points depending on whether they are positive or negative. 
 */
function makeDifferenceSeries( 
  seriess, 
  diffColors 
) { 
  var ser1 = seriess[1], 
    ser2 = seriess[0]; 
  return { 
    name: ser1.name + ' vs. ' + ser2.name, 
    defaultPoint: { 
      label: { 
        text: '{%percent:n2}%', 
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