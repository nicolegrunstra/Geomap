import csv, sys, os, subprocess, re
import operator, getopt, decimal

reload(sys)
sys.setdefaultencoding('utf8')

nheaderlines = 1

Species = [] # List of species


# Process input and output arguments
inputfile = ''
outputfile = ''
argv = sys.argv[1:]
try:
  opts, args = getopt.getopt(argv,"hi:o:",["ifile=","ofile="])
  if opts == []:
    print("csv2json.py -i <inputfile> -o <outputfile>")
    sys.exit(2)
except getopt.GetoptError:
    print("csv2json.py -i <inputfile> -o <outputfile>")
    sys.exit(2)
for opt, arg in opts:
  if opt == '-h':
    print("csv2json.py -i <inputfile> -o <outputfile>")
    sys.exit()
  elif opt in ("-i", "--ifile"):
    inputfile = arg
  elif opt in ("-o", "--ofile"):
    outputfile = arg
  else:
    print("csv2json.py -i <inputfile> -o <outputfile>")
    sys.exit()


# Read file and extract variables
file = open(inputfile, 'rt')

#Write file
wfile = open(outputfile, 'w')
nheaders = 0
id = 0
scale = 50
ln = 5

wfile.write('var geojson = {\
  \n"type" : "FeatureCollection",\
  \n"features" : [')

try:
  reader = csv.reader(file, delimiter=",")
  for line in reader:
    # Process headers
    if nheaders < nheaderlines:
      nheaders = nheaders + 1
      print(line)
    # 
    else:
      lat = float(line[1])
      lon = float(line[2])
      allometry = float(line[3])
      allometry_scaled = float(line[5])
      eco = float(line[4])
      eco_scaled = float(line[6])
      species = line[0]
      colour = line[7]
      id = id + 1
      case = eco
      wfile.write('\n{\
      \n\"type\" : \"Feature\",\
      \n\"geometry\" : {\"type\" : \"Point\", \"coordinates\" : [ %.4f, %.4f ]},\
      \n\"properties\" : {\
      \n  "species" : "%s",\
      \n  "allometry" : %.6f,\
      \n  "cline" : %.6f,\
      \n  "allometry_scaled" : %.6f,\
      \n  "eco_scaled" : %.6f,\
      \n  "colour" : \"%s\"\
      \n}\
      \n},' % (lat, lon, species, allometry, eco, allometry_scaled, eco_scaled, colour))
      
finally:
  wfile.write('\n]\n};')

  file.close()
  wfile.close()
