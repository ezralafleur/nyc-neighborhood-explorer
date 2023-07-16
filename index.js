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

  let neighborhoodObject = {
    name: neighborhoodName,
    coordinates: neighborhoodCoords,
    leafletPolygon: L.polygon(neighborhoodCoords).addTo(map),
  };

  neighborhoodMap.set(neighborhoodName, neighborhoodObject);
});

Array.from(neighborhoodMap.values()).map((neighborhood) =>
  neighborhood.leafletPolygon.bindPopup(`<b>${neighborhood.name}</b>`)
);
