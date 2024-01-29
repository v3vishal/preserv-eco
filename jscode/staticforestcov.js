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
/*
// JS 
var chart, data; 
var palette = ['#4A7C59', '#8FC0A9']; 
  */
/* Resembles underline Used to highlight selected label. */
/*
var selectedFill = { 
  angle: 90, 
  stops: [ 
    [0, '#ffffff'], 
    [0.94, '#ffffff'], 
    [0.94, '#000000'], 
    [1, '#000000'] 
  ] 
}; 
window.onload = function() {
JSC.fetch( 
  '../res/stcforcov.csv'
) 
  .then(function(response) { 
    return response.text(); 
  }) 
  .then(function(text) { 
    data = JSC.csv2Json(text); 
    chart = renderChart(makeSeries(data, 2020)); 
  }) 
  .catch(function(error) { 
    console.error(error); 
  });

function renderChart(series) { 
  return JSC.chart('chartDiv2', {
    debug: true, 
    title: { 
      label: { 
        text: 
          'Forest cover statistics in Bandipur Tiger Reserve (in percentage %)', 
        margin: [0, 0, 25, 50] 
      } 
    }, 
    animation_duration: 500, 
    palette: palette, 
    defaultSeries: { 
      legendEntry_events_click: function() { 
        return false; 
      }, 
      mouseTracking_enabled: true
    }, 
    defaultPoint: { 
      outline_width: 0, 
      label: { 
        text: '%yValue%', 
        placement: 'outside', 
        autoHide: false
      } 
    }, 
    type: 'horizontal column solid', 
    legend: { 
      position: 'bottom', 
      template: '%icon %name', 
      defaultEntry_cursor: 'default'
    }, 
    xAxis: { 
      staticColumnWidth: 20, 
      // Use the axis ticks as labels for each column stack 
      defaultTick: { 
        gridLine_visible: false, 
        placement: 'inside', 
        label_offset: '50,22'
      } 
    }, 
    yAxis: { 
      visible: false, 
      scale: { 
        type: 'stackedFull', 
        /* Pad the axis range so that outside point labels fit inside the chart */
        /*
        range_padding: 0.1, 
        invert: true
      } 
    }, 
    series: series, 
    toolbar_items: { 
      beforeAfterButtons: { 
        label_text: '', 
        position: 'inside top left', 
        offset: '50,-25', 
        itemsBox: { 
          layout: 'horizontal', 
          visible: true
        }, 
        defaultItem: { 
          type: 'radio', 
          padding: [0, 0, 4, -20], 
          margin: 3, 
          label_style: { 
            fontSize: 14, 
            color: '#9E9E9E'
          }, 
          icon_visible: false, 
          states: { 
            select: { 
              fill: selectedFill, 
              label_style: { color: '#000000' } 
            }, 
            hover_fill: selectedFill 
          } 
        }, 
        events: { change: changeEvent }, 
        value: '2020', 
        items: { 
          '2011': { label_text: '2011' }, 
          '2019': { label_text: '2019' } 
        } 
      } 
    } 
  }); 
} 
}
function changeEvent(val) { 
  chart.options({ 
    series: makeSeries(data, val) 
  }); 
} 
  
function makeSeries(data, year) { 
  return JSC.nest() 
    .key('age') 
    .key('sex') 
    .pointRollup(function(key, val) { 
      var value = val[0], 
        over65 = 
          value.age === '65 years and over'; 
      return { 
        x: key, 
        id: key + ' ' + value.age, 
        y: value['year_' + year], 
        label_align: over65 ? 'left' : 'right'
      }; 
    }) 
    .series(data); 
} */