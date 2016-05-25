L.mapbox.accessToken = 'pk.eyJ1Ijoia2tzMzIiLCJhIjoiY2lsdXc5a2xwMDA2ZXcxbTZoMm5jZTIwcyJ9.CDYFvqPWF2TzCrJGMjl9sQ';
var map = L.mapbox.map('map', 'mapbox.light', {attributionControl: false,   
    legendControl: {
        // Any of the valid control positions:
        // https://www.mapbox.com/mapbox.js/api/v2.4.0/l-control/#control-positions
        position: 'bottomright'
    }}).setView([15., 65.], 4);

var popup = new L.Popup({ autoPan: false });

// hsvAfrica comes from the 'africa.json' script included above
var baseLayer = L.geoJson(geoMap, {
    style: getBaseStyle,
    onEachFeature: onEachFeature
    }).addTo(map);


var scale = 25;
var ln = 2;
      

        
var assamensis = L.circleMarker([23.0100,97.1900], {        
  radius: 1.0136 * scale,        
  color: '#0000FF',        
  fillColor: '#0000FF',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. assamensis</i></strong><br/>Allometry: 9.2517");
        
var cyclopis = L.rectangle([[23.9100 -ln, 121.0400 -ln],[23.9100 + ln, 121.0400 + ln]], {        
  weight: 1,        
  color: '#00CC33',        
  fillColor: '#00CC33',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. cyclopis</i><strong><br/>Allometry: -2.0938");
        
var fascicularis = L.rectangle([[4.1300 -ln, 111.2400 -ln],[4.1300 + ln, 111.2400 + ln]], {        
  weight: 1,        
  color: '#CC9966',        
  fillColor: '#CC9966',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. fascicularis</i><strong><br/>Allometry: -10.5080");
        
var fuscata = L.circleMarker([35.8800,135.5100], {        
  radius: 1.0826 * scale,        
  color: '#CC0099',        
  fillColor: '#CC0099',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. fuscata</i></strong><br/>Allometry: 10.7634");
        
var maura = L.circleMarker([-4.9800,119.9000], {        
  radius: 0.6314 * scale,        
  color: '#FFFF00',        
  fillColor: '#FFFF00',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. maura</i></strong><br/>Allometry: 0.8786");
        
var mulatta = L.rectangle([[25.0700 -ln, 96.6700 -ln],[25.0700 + ln, 96.6700 + ln]], {        
  weight: 1,        
  color: '#FF0000',        
  fillColor: '#FF0000',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. mulatta</i><strong><br/>Allometry: -9.0087");
        
var nemestrina = L.circleMarker([3.0400,108.0700], {        
  radius: 1.0213 * scale,        
  color: '#00CCFF',        
  fillColor: '#00CCFF',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. nemestrina</i></strong><br/>Allometry: 9.4208");
        
var nigra = L.circleMarker([1.0100,124.2600], {        
  radius: 0.6033 * scale,        
  color: '#000000',        
  fillColor: '#000000',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. nigra</i></strong><br/>Allometry: 0.2635");
        
var radiata = L.rectangle([[14.5900 -ln, 77.0600 -ln],[14.5900 + ln, 77.0600 + ln]], {        
  weight: 1,        
  color: '#009900',        
  fillColor: '#009900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. radiata</i><strong><br/>Allometry: -3.9256");
        
var silenus = L.rectangle([[13.1900 -ln, 76.1200 -ln],[13.1900 + ln, 76.1200 + ln]], {        
  weight: 1,        
  color: '#FF9900',        
  fillColor: '#FF9900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. silenus</i><strong><br/>Allometry: -3.2085");
        
var sinica = L.rectangle([[7.8700 -ln, 80.7800 -ln],[7.8700 + ln, 80.7800 + ln]], {        
  weight: 1,        
  color: '#CC99CC',        
  fillColor: '#CC99CC',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. sinica</i><strong><br/>Allometry: -11.1456");
        
var sylvanus = L.circleMarker([34.2100,-0.6200], {        
  radius: 0.7422 * scale,        
  color: '#006666',        
  fillColor: '#006666',        
  fillOpacity: 0.7        
}).bindPopup("<strong><i>M. sylvanus</i></strong><br/>Allometry: 3.3061");


        
var eco_assamensis = L.circleMarker([23.0100,97.1900], {        
  radius: 0.0663 * scale,        
  color: '#0000FF',        
  fillColor: '#0000FF',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. assamensis</i></strong><br/>Ecological cline: 0.2547");
        
var eco_cyclopis = L.rectangle([[23.9100 -ln, 121.0400 -ln],[23.9100 + ln, 121.0400 + ln]], {        
  weight: 1,        
  color: '#00CC33',        
  fillColor: '#00CC33',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. cyclopis</i><strong><br/>Ecological cline: -1.3928");
        
var eco_fascicularis = L.circleMarker([4.1300,111.2400], {        
  radius: 0.0175 * scale,        
  color: '#CC9966',        
  fillColor: '#CC9966',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. fascicularis</i></strong><br/>Ecological cline: 0.0672");
        
var eco_fuscata = L.rectangle([[35.8800 -ln, 135.5100 -ln],[35.8800 + ln, 135.5100 + ln]], {        
  weight: 1,        
  color: '#CC0099',        
  fillColor: '#CC0099',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. fuscata</i><strong><br/>Ecological cline: -0.8135");
        
var eco_maura = L.rectangle([[-4.9800 -ln, 119.9000 -ln],[-4.9800 + ln, 119.9000 + ln]], {        
  weight: 1,        
  color: '#FFFF00',        
  fillColor: '#FFFF00',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. maura</i><strong><br/>Ecological cline: -0.2961");
        
var eco_mulatta = L.rectangle([[25.0700 -ln, 96.6700 -ln],[25.0700 + ln, 96.6700 + ln]], {        
  weight: 1,        
  color: '#FF0000',        
  fillColor: '#FF0000',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. mulatta</i><strong><br/>Ecological cline: -2.3688");
        
var eco_nemestrina = L.circleMarker([3.0400,108.0700], {        
  radius: 1.0000 * scale,        
  color: '#00CCFF',        
  fillColor: '#00CCFF',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. nemestrina</i></strong><br/>Ecological cline: 3.8446");
        
var eco_nigra = L.circleMarker([1.0100,124.2600], {        
  radius: 0.7385 * scale,        
  color: '#000000',        
  fillColor: '#000000',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. nigra</i></strong><br/>Ecological cline: 2.8392");
        
var eco_radiata = L.rectangle([[14.5900 -ln, 77.0600 -ln],[14.5900 + ln, 77.0600 + ln]], {        
  weight: 1,        
  color: '#009900',        
  fillColor: '#009900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. radiata</i><strong><br/>Ecological cline: -0.9433");
        
var eco_silenus = L.rectangle([[13.1900 -ln, 76.1200 -ln],[13.1900 + ln, 76.1200 + ln]], {        
  weight: 1,        
  color: '#FF9900',        
  fillColor: '#FF9900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. silenus</i><strong><br/>Ecological cline: -0.5633");
        
var eco_sinica = L.rectangle([[7.8700 -ln, 80.7800 -ln],[7.8700 + ln, 80.7800 + ln]], {        
  weight: 1,        
  color: '#CC99CC',        
  fillColor: '#CC99CC',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. sinica</i><strong><br/>Ecological cline: -0.4176");
        
var eco_sylvanus = L.rectangle([[34.2100 -ln, -0.6200 -ln],[34.2100 + ln, -0.6200 + ln]], {        
  weight: 1,        
  color: '#006666',        
  fillColor: '#006666',        
  fillOpacity: 0.7        
}).bindPopup("<strong><i>M. sylvanus</i><strong><br/>Ecological cline: -1.1625");

var allometry_markers = L.layerGroup([assamensis, cyclopis, fascicularis, fuscata, maura, mulatta, nemestrina, nigra, radiata, silenus, sinica, sylvanus]).addTo(map);

var eco_markers = L.layerGroup([eco_assamensis, eco_cyclopis, eco_fascicularis, eco_fuscata, eco_maura, eco_mulatta, eco_nemestrina, eco_nigra, eco_radiata, eco_silenus, eco_sinica, eco_sylvanus]);

var overlayMaps = { "Allometry": allometry_markers, "Ecological cline": eco_markers };

// Base maps
var baseMaps = { "Base map": baseLayer };

// Create a group of map Layers
var mapLayers = L.layerGroup([baseMaps, overlayMaps]);

var control = L.control.activeLayers(overlayMaps); 
control.addTo(map);


// Base Layer
function getBaseStyle(feature) {
  return {
    stroke: true,
    weight: 0,
    opacity: 0.,
    color: '#404040',
    fillOpacity: 0.,
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
    click: zoomToFeature
  });
}

var closeTooltip;


function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

map.legendControl.addLegend(getLegendHTML());

//map.legendControl.position('bottomleft');

function getLegendHTML() {
  var grades = [1, 10, 20, 30, 40, 50, 60, 70, 80],
  labels = [],
  from, to;
  var colours = ['#0000FF', '#AFFF33', '#CC9966', '#CC0099', '#FFFF00', '#FF0000', '#00CCFF', '#000000', '#009900','#FF9900','#CC99CC', '#006666' ];
  var genera = ['M. assamensis', 'M. cyclopis', 'M. fascicularis', 'M. fuscata', 'M. maura', 'M. mulatta', 'M. nemestrina', 'M. nigra', 'M. radiata', 'M. silenus', 'M. sinica', 'M. sylvanus' ];

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

 
  return '<div id="genera-legend"><span><strong>Species</strong></span><ul>' + generaLegend.join('') + '</ul></div>';
}

var credits = L.control.attribution();
credits.addAttribution('<a href="https://github.com/nicolegrunstra/Geomap">CC-BY-NC-SA 4.0</a>').addTo(map);
