const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const cardData = {
  'topographical-survey.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Direct mobilization from Pune headquarters for urgent infrastructure & topographical requirements.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Survey of India (SOI) Datum Compliance',
      desc: 'Tied to national permanent GTS control pillars with closed-loop traverse mathematical closure.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Multi-Layered CAD & 3D Deliverables',
      desc: 'Handover includes 2D/3D AutoCAD .DWG, LandXML, DTM surface meshes, and stamped survey drawings.'
    }
  ],
  'total-station-survey.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Direct mobilization from Pune headquarters for high-precision robotic total station surveys.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Sub-Millimeter Angular Accuracy',
      desc: '1" and 2" high-precision Leica total stations ensuring zero error across complex structural layouts.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Certified Traverse Closure & QA Handover',
      desc: 'Comprehensive boundary demarcation, column grid marking, and multi-layered CAD drawings.'
    }
  ],
  'dgps-gnss-control.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Fast deployment of dual-frequency multi-constellation GNSS base and rover receivers.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Geodetic Grid & Benchmark Pillars',
      desc: 'Permanent monumentation and static GNSS observation tied to national SOI reference frames.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Real-Time Kinematic (RTK) Precision',
      desc: 'Centimeter-level real-time coordinate logging for large-scale infrastructure and highway corridors.'
    }
  ],
  'rtk-drone-mapping.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Licensed DGCA remote pilots with survey-grade RTK/PPK unmanned aerial vehicles.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Sub-Centimeter Ground Resolution (GSD)',
      desc: 'High-resolution aerial orthomosaics and digital surface models with minimal ground control points.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Volumetric & Earthwork Analytics',
      desc: 'Precise cut-fill calculations, stockpile volume monitoring, and 3D terrain elevation models.'
    }
  ],
  'lidar-3d-scanning.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'State-of-the-art aerial and mobile LiDAR scanners deployed on tight project schedules.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Penetrates Dense Forest & Vegetation',
      desc: 'Multi-return laser pulses capture true bare-earth topography beneath heavy forest foliage.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Dense 3D Classified Point Clouds',
      desc: 'Millions of geo-referenced 3D points per second for civil engineering and corridor modeling.'
    }
  ],
  'drone-photogrammetry.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Turnkey drone aerial mapping teams mobilizing from Pune for rapid site capture.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Survey-Grade Photogrammetric Processing',
      desc: 'Calibrated optical sensors, high-accuracy GCP control, and distortion-free orthorectification.'
    },
    {
      accent: 'var(--accent-orange)',
      title: '3D Reality Models & Contour Mapping',
      desc: 'Complete textured 3D mesh exports, DSM/DTM surfaces, and stamped CAD site layouts.'
    }
  ],
  'road-highway.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Dedicated highway survey crews equipped for fast-paced linear infrastructure projects.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Centerline Alignment & Cross-Sections',
      desc: 'Detailed longitudinal profiles, cross-sectional elevations, and Right-of-Way (RoW) mapping.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Earthwork Volume & Pavement Surveys',
      desc: 'Cut and fill quantities, culvert inventory, drainage slope analysis, and MoRTH compliance.'
    }
  ],
  'rail-metro.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'Experienced railway surveying crews adhering strictly to Indian Railways & Metro safety norms.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Track Centerline & Gauge Verification',
      desc: 'High-precision alignment checks, clearance gauge envelopes, and turnout geometry logging.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Structure Gauge & As-Built Audits',
      desc: 'Platform screen door clearance, overhead catenary (OHE) mapping, and track monitoring.'
    }
  ],
  'cad-gis-processing.html': [
    {
      accent: 'var(--accent-orange)',
      title: 'Rapid Field Dispatch Across Maharashtra',
      desc: 'In-house senior CAD & GIS engineers delivering standardized drawings within 24-48 hours.'
    },
    {
      accent: 'var(--primary-navy)',
      title: 'Topologically Clean Multi-Layer Data',
      desc: 'Zero geometry errors, standardized layer naming, contour intervals, and symbology.'
    },
    {
      accent: 'var(--accent-orange)',
      title: 'Comprehensive Spatial File Formats',
      desc: 'AutoCAD .DWG/.DXF, ESRI Shapefiles (.SHP), GeoTIFF, KMZ/KML, and stamped PDF prints.'
    }
  ]
};

function generateCardsHtml(cards) {
  let html = '                        <div style="display: flex; flex-direction: column; gap: 10px;">\n';
  cards.forEach(c => {
    html += `                            <div style="background: #f1f5f9; border-left: 4px solid ${c.accent}; border-radius: 0 8px 8px 0; padding: 14px 16px;">\n`;
    html += `                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 2px;">${c.title}</div>\n`;
    html += `                                <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${c.desc}</div>\n`;
    html += '                            </div>\n';
  });
  html += '                        </div>';
  return html;
}

const targetRegex = /<div style="background: #f1f5f9; border-left: 4px solid var\(--accent-orange\); border-radius: 0 8px 8px 0; padding: 18px 20px;">[\s\S]*?<\/div>\s*<\/div>/;

let success = 0;

for (const [file, cards] of Object.entries(cardData)) {
  const fp = path.join(baseDir, file);
  if (!fs.existsSync(fp)) {
    console.error(`Not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(fp, 'utf8');
  if (!targetRegex.test(content)) {
    console.warn(`Target not found in: ${file}`);
    continue;
  }
  const replacement = generateCardsHtml(cards);
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(fp, content, 'utf8');
  console.log(`[SUCCESS] ${file}`);
  success++;
}

console.log(`\nUpdated ${success}/${Object.keys(cardData).length} files.`);
