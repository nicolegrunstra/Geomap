L.mapbox.accessToken = 'pk.eyJ1Ijoia2tzMzIiLCJhIjoiY2lsdXc5a2xwMDA2ZXcxbTZoMm5jZTIwcyJ9.CDYFvqPWF2TzCrJGMjl9sQ';
var map = L.mapbox.map('map', 'mapbox.light', {attributionControl: false,   
    legendControl: {
        // Any of the valid control positions:
        // https://www.mapbox.com/mapbox.js/api/v2.4.0/l-control/#control-positions
        position: 'bottomright'
    }}).setView([12., 50.], 4);

var popup = new L.Popup({ autoPan: false });

// hsvAfrica comes from the 'africa.json' script included above
var baseLayer = L.geoJson(geoMap, {
    style: getBaseStyle,
    onEachFeature: onEachFeature
    }).addTo(map);


// Base map and overlay maps
var baseMaps = { "Base map": baseLayer};

// Create a group of map Layers
var mapLayers = L.layerGroup([baseLayer])

L.Marker.prototype.openPopupBackup = L.Marker.prototype.openPopup;
    L.Marker.prototype.openPopup = function() {
        if (!this._map && this.__parent) {
            this.__parent._group.on('spiderfied', this.doneSpiderfy, this);
            this.__parent.spiderfy();
        }
        else {
            this.openPopupBackup();
        }
    }
    L.Marker.prototype.doneSpiderfy = function() {
        this.__parent._group.off('spiderfied', this.doneSpiderfy, this);
        this.openPopupBackup();
    }


var circ0 = L.circle([23.01,97.19], 84499.5495416, {   
    color: '#0000FF',    
    weight: 0, 
    fillColor: '#0000FF',       
    fillOpacity: 1.0       
});


var circ1 = L.circle([23.91,121.04], 343422.4665801, {   
    color: '#00CC33',    
    weight: 0, 
    fillColor: '#00CC33',       
    fillOpacity: 1.0       
});

var circ2 = L.circle([4.13,111.24], 535448.0067978, {   
    color: '#CC9966',    
    weight: 0, 
    fillColor: '#CC9966',       
    fillOpacity: 1.0       
});

var circ3 = L.circle([35.88,135.51], 50000.0009129, {   
    color: '#CC0099',    
    weight: 0, 
    fillColor: '#CC0099',       
    fillOpacity: 1.0       
});

var circ4 = L.circle([-4.98,119.9], 275587.4942132, {   
    color: '#FFFF00',    
    weight: 0, 
    fillColor: '#FFFF00',       
    fillOpacity: 1.0       
});


var circ5 = L.circle([25.07,96.67], 501231.4954262, {   
    color: '#FF0000',    
    weight: 0, 
    fillColor: '#FF0000',       
    fillOpacity: 1.0       
});

var markers = L.layerGroup([circ0, circ1, circ2, circ3, circ4, circ5]).addTo(map);

var overlayMaps = { "Allometry": markers};

 
var control = L.control.activeLayers(baseMaps, overlayMaps); 
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
  var colours = ['#0000FF', '#00CC33', '#CC9966', '#CC0099', '#FFFF00', '#FF0000', '#00CCFF', '#000000', '#009900','#FF9900','#CC99CC', '#006666' ];
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
