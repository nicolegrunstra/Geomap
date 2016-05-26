L.mapbox.accessToken = 'pk.eyJ1Ijoia2tzMzIiLCJhIjoiY2lsdXc5a2xwMDA2ZXcxbTZoMm5jZTIwcyJ9.CDYFvqPWF2TzCrJGMjl9sQ';
var map = L.mapbox.map('map', 'mapbox.light', {attributionControl: false,   
    legendControl: {
        // Any of the valid control positions:
        // https://www.mapbox.com/mapbox.js/api/v2.4.0/l-control/#control-positions
        position: 'bottomright'
    }}).setView([15., 65.], 4);

var popup = new L.Popup({ autoPan: false });

// Allometry
var scale = 50;

// load the above GeoJSON into the featureLayer and use pointToLayer
// to pass in the features properties and geometry
var allometry_markers =
  L.mapbox.featureLayer(
    geojson,
      {
        pointToLayer : function(feature) {
          return L.circleMarker(
            feature.geometry.coordinates,
              {
                radius : feature.properties.allometry_scaled * scale,
                fillColor : feature.properties.colour,
                color : feature.properties.colour,
                fillOpacity : 0.9
              })
                .bindPopup("<strong><i>" + feature.properties.species +
                           "</i></strong><br/>Allometry: " +
                           feature.properties.allometry);
        }
      });


// Ecological cline
var scale = 50;
        
var eco_circmarkers =
  L.mapbox.featureLayer(
    ecoCircle,
      {
        pointToLayer : function(feature) {
          return L.circleMarker(
            feature.geometry.coordinates,
              {
                radius : feature.properties.eco_scaled * scale,
                fillColor : feature.properties.colour,
                color : feature.properties.colour,
                fillOpacity : 0.9
              })
                .bindPopup("<strong><i>" + feature.properties.species +
                           "</i></strong><br/>Ecological cline: " +
                           feature.properties.cline);
        }
      });

// Ecological cline - negative values
var ln = -5;
        
var eco_cyclopis = L.rectangle([[23.9100 - ln * -0.3623, 121.0400 -ln * -0.3623],[23.9100 + ln * -0.3623, 121.0400 + ln  * -0.3623]], {        
  weight: 1,        
  color: '#AFFF33',        
  fillColor: '#AFFF33',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. cyclopis</i></strong><br/>Ecological cline: -1.3928");
        
var eco_fuscata = L.rectangle([[35.8800 - ln * -0.2116, 135.5100 -ln * -0.2116],[35.8800 + ln * -0.2116, 135.5100 + ln  * -0.2116]], {        
  weight: 1,        
  color: '#CC0099',        
  fillColor: '#CC0099',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. fuscata</i></strong><br/>Ecological cline: -0.8135");
        
var eco_maura = L.rectangle([[-4.9800 - ln * -0.0770, 119.9000 -ln * -0.0770],[-4.9800 + ln * -0.0770, 119.9000 + ln  * -0.0770]], {        
  weight: 1,        
  color: '#FFFF00',        
  fillColor: '#FFFF00',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. maura</i></strong><br/>Ecological cline: -0.2961");
        
var eco_mulatta = L.rectangle([[25.0700 - ln * -0.6161, 96.6700 -ln * -0.6161],[25.0700 + ln * -0.6161, 96.6700 + ln  * -0.6161]], {        
  weight: 1,        
  color: '#FF0000',        
  fillColor: '#FF0000',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. mulatta</i></strong><br/>Ecological cline: -2.3688");
        
var eco_radiata = L.rectangle([[14.5900 - ln * -0.2454, 77.0600 -ln * -0.2454],[14.5900 + ln * -0.2454, 77.0600 + ln  * -0.2454]], {        
  weight: 1,        
  color: '#009900',        
  fillColor: '#009900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. radiata</i></strong><br/>Ecological cline: -0.9433");
        
var eco_silenus = L.rectangle([[13.1900 - ln * -0.1465, 76.1200 -ln * -0.1465],[13.1900 + ln * -0.1465, 76.1200 + ln  * -0.1465]], {        
  weight: 1,        
  color: '#FF9900',        
  fillColor: '#FF9900',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. silenus</i></strong><br/>Ecological cline: -0.5633");
        
var eco_sinica = L.rectangle([[7.8700 - ln * -0.1086, 80.7800 -ln * -0.1086],[7.8700 + ln * -0.1086, 80.7800 + ln  * -0.1086]], {        
  weight: 1,        
  color: '#CC99CC',        
  fillColor: '#CC99CC',        
  fillOpacity: 0.7        
  }).bindPopup("<strong><i>M. sinica</i></strong><br/>Ecological cline: -0.4176");
        
var eco_sylvanus = L.rectangle([[34.2100 - ln * -0.3024, -0.6200 -ln * -0.3024],[34.2100 + ln * -0.3024, -0.6200 + ln  * -0.3024]], {        
  weight: 1,        
  color: '#006666',        
  fillColor: '#006666',        
  fillOpacity: 0.7        
}).bindPopup("<strong><i>M. sylvanus</i></strong><br/>Ecological cline: -1.1625");





var allometry_layer = L.layerGroup([allometry_markers]).addTo(map);

var eco_layer = L.layerGroup([eco_cyclopis, eco_fuscata, eco_maura, eco_mulatta, eco_radiata, eco_silenus, eco_sinica, eco_sylvanus, eco_circmarkers]);

var overlayMaps = { "Allometry": allometry_layer, "Ecological cline": eco_layer };

L.control.layers(overlayMaps).addTo(map);

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
