L.mapbox.accessToken = 'pk.eyJ1Ijoia2tzMzIiLCJhIjoiY2lsdXc5a2xwMDA2ZXcxbTZoMm5jZTIwcyJ9.CDYFvqPWF2TzCrJGMjl9sQ';
var map = L.mapbox.map('map', 'mapbox.light', {attributionControl: false,     
    legendControl: {
        // Any of the valid control positions:
        // https://www.mapbox.com/mapbox.js/api/v2.4.0/l-control/#control-positions
        position: 'bottomright'
    }}).setView([2., 17.], 3);

var popup = new L.Popup({ autoPan: false });

// hsvAfrica comes from the 'africa.json' script included above
var baseLayer = L.geoJson(geomap,  {
    style: getBaseStyle
    });


// Base map and overlay maps
var baseMaps = { "Base map": baseLayer};


// Create a group of map Layers
var mapLayers = L.layerGroup([baseLayer])

var control = L.control.activeLayers(baseMaps); 
control.addTo(map);


// Base Layer
function getBaseStyle(feature) {
  return {
    stroke: true,
    weight: 2,
    opacity: 0.2,
    color: '#404040',
    fillOpacity: 0.7,
    fillColor:'#FFFFFF'
  };
}


// Get Color gradient
function getGradientColor(start_color, end_color, percent) {
  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, '');
  end_color = end_color.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(start_color.length == 3){
    start_color = start_color.replace(/(.)/g, '$1$1');
  }
  if(end_color.length == 3){
    end_color = end_color.replace(/(.)/g, '$1$1');
  }

  // get colors
  var start_red = parseInt(start_color.substr(0, 2), 16),
      start_green = parseInt(start_color.substr(2, 2), 16),
      start_blue = parseInt(start_color.substr(4, 2), 16);

  var end_red = parseInt(end_color.substr(0, 2), 16),
      end_green = parseInt(end_color.substr(2, 2), 16),
      end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  var diff_red = end_red - start_red;
  var diff_green = end_green - start_green;
  var diff_blue = end_blue - start_blue;

  diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
  diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
  diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

  // ensure 2 dichimps by color
  if( diff_red.length == 1 )
    diff_red = '0' + diff_red

  if( diff_green.length == 1 )
    diff_green = '0' + diff_green

  if( diff_blue.length == 1 )
    diff_blue = '0' + diff_blue

  return '#' + diff_red + diff_green + diff_blue;
}

// Compute percentage
function computePercent(val, min, max) {
  return ((val - min) / (max - min));
}

// get color depending on population.hsv2 value
function getColor(d) {
  return d > 80 ? '#FF0000' :
    d > 70 ? getGradientColor('#E85C02', '#FF3600', computePercent(d, 70, 80)) :
    d > 50 ? getGradientColor('#FF950A','#E85C02', computePercent(d, 50, 70)) :
    d > 30 ? getGradientColor('#E8B721', '#FF950A', computePercent(d, 30, 50)) :
    d > 10 ? getGradientColor('#FFF238', '#E8B721', computePercent(d, 10, 30)) :
    d > 1  ? getGradientColor('#FFFB13', '#FFF238', computePercent(d, 1, 10)) :
    '#FFFFFF';
}



function onEachFeature(feature, layer) {
  layer.on({
    mousemove: mousemove,
    mouseout: mouseout,
    click: zoomToFeature
  });
}

var closeTooltip;


function mousemove(e) {
  var layer = e.target;
  
  popup.setLatLng(e.latlng);
  if (!popup._map) popup.openOn(map);
  window.clearTimeout(closeTooltip);

  // highlight feature
  layer.setStyle({
    weight: 3,
    opacity: 0.3,
    fillOpacity: 0.9
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}


function mouseout(e) {
  // Get current layer
  closeTooltip = window.setTimeout(function() {
    map.closePopup();
  }, 100);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

map.legendControl.addLegend(getLegendHTML());

map.legendControl.posistion('bottomleft');

function getLegendHTML() {
  var grades = [1, 10, 20, 30, 40, 50, 60, 70, 80],
  labels = [],
  from, to;
  var colours = ['#A23336', '#D63E2A', '#38AADD', '#FF91EA', '#D252B9', '#72B026', '#F78E2D', ];
  var genera = ['Ardipithecus', 'Australopithecus', 'Homo', 'Kenyanthropus', 'Orrorin', 'Paranthropus', 'Sahelanthropus', ];

  var generaLegend = [];
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
      from + (to ? '&ndash;' + to : '+') + '</li>');
  }

  for (var i = 0; i < genera.length; i++) {
    generaLegend.push(
      '<li><span class="swatch" style="background:' + colours[i] + '"></span> ' +
      genera[i] + '</li>');
  }


  return '<div id="genera-legend"><span><strong>Genera</strong></span><ul>' + generaLegend.join('') + '</ul></div>';
}

var credits = L.control.attribution();
credits.addAttribution('<a href="https://chimphub.com/wadhamite/hsv-mapping">CC-BY-NC-SA 4.0</a>').addTo(map);
