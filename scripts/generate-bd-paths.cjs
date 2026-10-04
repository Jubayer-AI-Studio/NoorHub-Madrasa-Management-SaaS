const fs = require('fs');

function sqSegDist(p, p1, p2) {
  let x = p1[0], y = p1[1];
  let dx = p2[0] - x, dy = p2[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p[0] - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
}

function simplifyDPStep(points, first, last, sqTol, simplified) {
  let maxSqDist = sqTol;
  let index = 0;
  for (let i = first + 1; i < last; i++) {
    const sqd = sqSegDist(points[i], points[first], points[last]);
    if (sqd > maxSqDist) {
      index = i;
      maxSqDist = sqd;
    }
  }
  if (maxSqDist > sqTol) {
    if (index - first > 1) simplifyDPStep(points, first, index, sqTol, simplified);
    simplified.push(points[index]);
    if (last - index > 1) simplifyDPStep(points, index, last, sqTol, simplified);
  }
}

function simplify(points, tol) {
  if (points.length <= 2) return points;
  const sqTol = tol * tol;
  const simplified = [points[0]];
  simplifyDPStep(points, 0, points.length - 1, sqTol, simplified);
  simplified.push(points[points.length - 1]);
  return simplified;
}

const divs = JSON.parse(fs.readFileSync('public/bd-divisions-official.json', 'utf8'));
const dists = JSON.parse(fs.readFileSync('public/bd-districts-official.json', 'utf8'));

const minLon = 88.00862798600008;
const maxLon = 92.68030687500004;
const minLat = 20.590609348000044;
const maxLat = 26.634513010000035;
const midLat = (minLat + maxLat) / 2 * (Math.PI / 180);
const cosMid = Math.cos(midLat);

const width = 500;
const padding = 15;
const scale = (width - 2 * padding) / ((maxLon - minLon) * cosMid);
const height = Math.round((maxLat - minLat) * scale + 2 * padding);

console.log('Projected dimensions: width =', width, 'height =', height);

function project(lon, lat) {
  const x = padding + (lon - minLon) * cosMid * scale;
  const y = padding + (maxLat - lat) * scale;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

function cleanRing(ring) {
  return ring.filter(pt => Array.isArray(pt) && pt.length >= 2 && typeof pt[0] === 'number' && typeof pt[1] === 'number' && !isNaN(pt[0]) && !isNaN(pt[1]));
}

function ringToPath(ring, tol = 0.005) {
  const cleaned = cleanRing(ring);
  if (cleaned.length < 3) return '';
  const s = simplify(cleaned, tol);
  return s.map((pt, i) => {
    const [x, y] = project(pt[0], pt[1]);
    return (i === 0 ? 'M' : 'L') + x + ' ' + y;
  }).join(' ') + 'Z';
}

function geomToPath(geom, tol = 0.005) {
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(r => ringToPath(r, tol)).filter(Boolean).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map(poly => poly.map(r => ringToPath(r, tol)).filter(Boolean).join(' ')).filter(Boolean).join(' ');
  }
  return '';
}

function getCentroid(geom) {
  let totalX = 0, totalY = 0, count = 0;
  function scan(c) {
    if (Array.isArray(c) && typeof c[0] === 'number') {
      if (typeof c[1] === 'number' && !isNaN(c[0]) && !isNaN(c[1])) {
        const [x, y] = project(c[0], c[1]);
        totalX += x;
        totalY += y;
        count++;
      }
    } else if (Array.isArray(c)) {
      c.forEach(scan);
    }
  }
  scan(geom.coordinates);
  return [Math.round(totalX / (count || 1)), Math.round(totalY / (count || 1))];
}

function getBBox(geom) {
  let minX = 9999, maxX = -9999, minY = 9999, maxY = -9999;
  function scan(c) {
    if (Array.isArray(c) && typeof c[0] === 'number') {
      if (typeof c[1] === 'number' && !isNaN(c[0]) && !isNaN(c[1])) {
        const [x, y] = project(c[0], c[1]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    } else if (Array.isArray(c)) {
      c.forEach(scan);
    }
  }
  scan(geom.coordinates);
  return [Math.round(minX), Math.round(minY), Math.round(maxX - minX), Math.round(maxY - minY)];
}

const divisionIdMap = {
  'barisal': 'barisal',
  'chittagong': 'chittagong',
  'dhaka': 'dhaka',
  'khulna': 'khulna',
  'mymensingh': 'mymensingh',
  'rajshahi': 'rajshahi',
  'rangpur': 'rangpur',
  'sylhet': 'sylhet'
};

const outputDivisions = {};
divs.features.forEach(f => {
  const en = f.properties.ADM1_EN.toLowerCase();
  const id = divisionIdMap[en] || en;
  const path = geomToPath(f.geometry, 0.005);
  const [labelX, labelY] = getCentroid(f.geometry);
  const [bx, by, bw, bh] = getBBox(f.geometry);
  outputDivisions[id] = {
    id,
    nameEn: f.properties.ADM1_EN,
    d: path,
    labelX,
    labelY,
    bbox: [bx, by, bw, bh]
  };
});

// Districts mapping to match existing IDs in geo-data.ts
const districtIdMap = {
  'dhaka': 'dhaka-district',
  'munshiganj': 'munshiganj',
  'narayanganj': 'narayanganj',
  'gazipur': 'gazipur',
  'manikganj': 'manikganj',
  'tangail': 'tangail',
  'narsingdi': 'narsingdi',
  'faridpur': 'faridpur',
  'bhola': 'bhola',
  'barisal': 'barisal-district',
  'patuakhali': 'patuakhali',
  'pirojpur': 'pirojpur',
  'barguna': 'barguna',
  'jhalokati': 'jhalokati',
  'chittagong': 'chittagong-district',
  'cox\'s bazar': 'coxsbazar',
  'comilla': 'comilla',
  'brahmanbaria': 'brahmanbaria',
  'sylhet': 'sylhet-district',
  'moulvibazar': 'moulvibazar',
  'rajshahi': 'rajshahi-district',
  'bogra': 'bogra',
  'rangpur': 'rangpur-district',
  'dinajpur': 'dinajpur',
  'khulna': 'khulna-district',
  'jessore': 'jessore',
  'mymensingh': 'mymensingh-district'
};

const outputDistricts = {};
dists.features.forEach(f => {
  const raw = f.properties.ADM2_EN.toLowerCase();
  const id = districtIdMap[raw] || raw.replace(/[^a-z0-9]/g, '-');
  const path = geomToPath(f.geometry, 0.006);
  const [cx, cy] = getCentroid(f.geometry);
  const [bx, by, bw, bh] = getBBox(f.geometry);
  const divEn = f.properties.ADM1_EN.toLowerCase();
  const divId = divisionIdMap[divEn] || divEn;
  outputDistricts[id] = {
    id,
    divisionId: divId,
    nameEn: f.properties.ADM2_EN,
    d: path,
    labelX: cx,
    labelY: cy,
    bbox: [bx, by, bw, bh]
  };
});

const tsContent = `// Automatically generated authentic Bangladesh SVG paths from official BBS/UN-OCHA GeoJSON
// Projection: Equirectangular with mid-latitude cosine scaling (True Bangladesh Geography)

export interface GeoPathItem {
  id: string;
  nameEn: string;
  d: string;
  labelX: number;
  labelY: number;
  bbox: [number, number, number, number]; // [minX, minY, width, height]
  divisionId?: string;
}

export const OFFICIAL_DIVISION_PATHS: Record<string, GeoPathItem> = ${JSON.stringify(outputDivisions, null, 2)};

export const OFFICIAL_DISTRICT_PATHS: Record<string, GeoPathItem> = ${JSON.stringify(outputDistricts, null, 2)};
`;

fs.writeFileSync('src/lib/bd-geo-paths.ts', tsContent, 'utf8');
console.log('Saved src/lib/bd-geo-paths.ts successfully! Size:', Math.round(tsContent.length / 1024), 'KB');
