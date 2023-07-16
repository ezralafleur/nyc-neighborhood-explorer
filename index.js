const boroughColors = new Map([
  ["Manhattan", "#526DFF"],
  ["Brooklyn", "#FF7B18"],
  ["Queens", "#2A6D8E"],
  ["Bronx", "#B14B11"],
  ["Staten Island", "#227252"],
]);

var map = L.map("map").setView([40.693, -73.925], 10);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function swapCoords(coordinateList) {
  let swappedCoords = coordinateList.map((coord) => [coord[1], coord[0]]);
  return swappedCoords;
}

let neighborhoodMap = new Map();

allNeighborhoods.features.map((feature) => {
  let neighborhoodName = feature.properties.NTAName;
  let neighborhoodCoords = swapCoords(feature.geometry.coordinates[0]);
  let neighborhoodBorough = feature.properties.BoroName;

  let boroughColor = boroughColors.get(neighborhoodBorough);

  let neighborhoodObject = {
    name: neighborhoodName,
    borough: neighborhoodBorough,
    coordinates: neighborhoodCoords,
    leafletPolygon: L.polygon(neighborhoodCoords, {
      color: boroughColor,
      weight: 1,
      fillColor: boroughColor,
      fillOpacity: 0.5,
    }).addTo(map),
  };

  neighborhoodMap.set(neighborhoodName, neighborhoodObject);
});

function createPopupContents(neighborhood) {
  return `<b>${neighborhood.name}</b>
    <br>${neighborhood.borough}`;
}

Array.from(neighborhoodMap.values()).map((neighborhood) =>
  neighborhood.leafletPolygon.bindPopup(createPopupContents(neighborhood))
);
