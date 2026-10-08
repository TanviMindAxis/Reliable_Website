const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const newFaqs = {
  'topographical-survey.html': [
    {
      q: 'How do you accurately survey heavily vegetated or wooded land?',
      a: 'For dense tree canopy or jungle areas, we employ a hybrid methodology combining penetration ground-strike LiDAR with electronic total stations and traverse clearing lines, ensuring true bare-earth terrain capture beneath foliage.'
    },
    {
      q: 'How are site boundary markers and natural drainage features identified?',
      a: 'We map all physical boundary markers (fences, compound walls, stones), natural streams, nallas, water bodies, and catchment flow directions with spot level elevations, clearly flagged on CAD layers for hydrology and site planning.'
    },
    {
      q: 'Can the topographical survey be tied into Mean Sea Level (MSL) benchmarks?',
      a: 'Yes. We tie all ground elevation levels to the nearest Survey of India (SOI) Mean Sea Level (MSL) benchmark or established geodetic vertical datum using high-precision digital levels and dual-frequency GNSS.'
    }
  ],

  'total-station-survey.html': [
    {
      q: 'What is the maximum working range and reflectorless capability of your instruments?',
      a: 'Our robotic and electronic total stations feature reflectorless EDM ranges up to 1,000 meters, allowing accurate measurement of inaccessible points such as overhead high-tension lines, bridge soffits, and building facades.'
    },
    {
      q: 'How do you establish closed traverse control to eliminate cumulative errors?',
      a: 'We execute rigorous closed loop polygon traverses with angular and linear closure tolerances meeting 1:20,000 or better, with mathematical least-squares adjustment before picking up internal physical features.'
    },
    {
      q: 'Can total stations perform real-time structural monitoring for deflections?',
      a: 'Yes. We install fixed monitoring prisms on retaining walls, deep excavation pits, and structural columns to detect sub-millimeter settlement or lateral movement over defined construction monitoring intervals.'
    }
  ],

  'rtk-drone-mapping.html': [
    {
      q: 'What is the role of Ground Control Points (GCPs) and Check Points in RTK drone flights?',
      a: 'Even with onboard RTK / PPK GNSS, we distribute surveyed physical ground control and independent check points across the perimeter and interior of the site to mathematically validate absolute vertical and horizontal spatial accuracy.'
    },
    {
      q: 'What volume calculation outputs do you deliver for earthwork cut-and-fill?',
      a: 'We deliver comprehensive cut-and-fill volumetric reports with color-coded elevation difference heatmaps, stockpile volume spreadsheets, and cross-section profiles compared against baseline design levels.'
    },
    {
      q: 'How does weather (wind, rain, sunlight) affect RTK drone survey schedules?',
      a: 'Flights require clear visibility, rain-free conditions, and wind speeds under 28 km/h. To prevent harsh shadow distortion, our pilots plan flights around optimal solar zenith angles for uniform radiometric clarity.'
    }
  ],

  'drone-photogrammetry.html': [
    {
      q: 'How do you prevent image blur and rolling shutter distortion during mapping flights?',
      a: 'We deploy enterprise drones with global mechanical shutter cameras that eliminate rolling shutter distortion at high flight velocities, paired with calibrated prime lenses for sharp pixel-level photogrammetric correlation.'
    },
    {
      q: 'What digital elevation products (DEM, DTM, DSM) are delivered?',
      a: 'We deliver Digital Surface Models (DSM) showing all structures and vegetation, as well as filtered Digital Terrain Models (DTM) representing true bare ground relief, formatted as GeoTIFF rasters and CAD contours.'
    },
    {
      q: 'What overlap parameters do you maintain during automated flight missions?',
      a: 'We maintain a minimum of 75% to 85% frontal overlap and 65% to 75% side overlap, ensuring redundant multi-ray intersection angles for flawless Structure-from-Motion (SfM) 3D dense cloud reconstruction.'
    }
  ],

  'lidar-3d-scanning.html': [
    {
      q: 'How many laser returns do your LiDAR sensors capture per pulse?',
      a: 'Our high-end LiDAR sensors record up to 5 discrete laser returns per pulse (multi-echo capability), allowing the laser to pierce tree leaves, twigs, and underbrush to record the true ground surface underneath.'
    },
    {
      q: 'Can terrestrial laser scanning (TLS) be used for heritage conservation and plant piping?',
      a: 'Yes. Our terrestrial 3D laser scanners achieve millimeter-grade point spacing, creating exact digital twins of heritage monuments, complex MEP piping, bridge girders, and industrial factory interiors.'
    },
    {
      q: 'What colorization and classification do you apply to raw point clouds?',
      a: 'We integrate high-resolution RGB calibrated cameras to colorize point clouds in true natural color, followed by automated and manual point classification into ground, low vegetation, medium/high vegetation, buildings, and noise.'
    }
  ],

  'dgps-gnss-control.html': [
    {
      q: 'What observation duration is required for geodetic-grade static GNSS baselines?',
      a: 'Depending on baseline distance, our static GNSS observation windows range from 1 to 4+ hours per station, collecting multi-constellation satellite data (GPS, GLONASS, Galileo, NavIC) for sub-centimeter post-processed accuracy.'
    },
    {
      q: 'How are physical DGPS control pillars constructed and protected on site?',
      a: 'We cast reinforced concrete control monuments (Pillars with central brass center marks) anchored firmly into stable ground or bedrock, numbered and referenced with site description cards for lifetime project recoverability.'
    },
    {
      q: 'Which coordinate systems and map projections do you support?',
      a: 'We support WGS84, UTM Projection zones (Zone 43N / 44N), national geodetic datums, and custom local transverse mercator or ground-to-grid scale factor coordinates tailored to your engineering project.'
    }
  ],

  'road-highway.html': [
    {
      q: 'At what chainage intervals are longitudinal sections (L-Sections) and cross-sections captured?',
      a: 'Standard cross-sections are captured at 10m to 20m intervals on straight reaches and 5m to 10m intervals on horizontal curves and bridge approaches, fully compliant with IRC standards for detailed project reports (DPR).'
    },
    {
      q: 'Do you map existing utility lines and structures within the Right of Way (RoW)?',
      a: 'Yes. We comprehensively document all roadside assets within the RoW corridor, including electric poles, transformers, streetlights, culverts, median barriers, hoardings, optical fiber markers, and water pipelines.'
    },
    {
      q: 'Can you deliver horizontal and vertical curve alignment design files?',
      a: 'Yes. We deliver AutoCAD Civil 3D alignment sheets with tangent points, circular curve radii, transition spiral data, super-elevation tables, and formation levels ready for contractor earthwork execution.'
    }
  ],

  'rail-metro.html': [
    {
      q: 'How do you establish track centerlines and cant (super-elevation) measurements?',
      a: 'Using calibrated electronic track gauges and precision total stations, we measure gauge width, cross-level (cant), and true centerline coordinates at defined sleeper intervals to evaluate track geometry against RDSO specifications.'
    },
    {
      q: 'What methodology is used for underground metro tunnel alignment control?',
      a: 'We execute surface geodetic primary control networks, optical plumbing or gyro-theodolite transfer down access shafts, and subterranean traverse networks to ensure zero-error breakout tolerance for Tunnel Boring Machines (TBMs).'
    },
    {
      q: 'Do you provide Structure Gauge and Infringement Clearance (SOD) surveys?',
      a: 'Yes. We perform Structure Gauge Clearance (Schedule of Dimensions) surveys around overhead contact systems (OHE), platform edges, bridge girders, and tunnel walls to certify zero kinematic envelope infringements.'
    }
  ],

  'cad-gis-processing.html': [
    {
      q: 'How do you handle coordinate georeferencing for revenue village / 7/12 land records?',
      a: 'We apply affine and polynomial transformation algorithms to georeference scanned village gut maps onto live geodetic DGPS coordinates, resolving scale distortions and aligning physical boundary features with legal cadastral limits.'
    },
    {
      q: 'Can you convert LiDAR or drone point clouds into building 3D BIM models?',
      a: 'Yes. We process high-density scan-to-BIM point cloud datasets into parametric Autodesk Revit models (LOD 200 to LOD 400), creating accurate architectural, structural, and MEP as-built BIM geometry.'
    },
    {
      q: 'What quality control checks do you perform on digital CAD deliverables before handover?',
      a: 'Our deliverables pass multi-stage QA/QC, including 100% layer standard conformity, topological closure validation (zero overshoot/undershoot line errors), contour elevation continuity checks, and scale accuracy verification against ground benchmarks.'
    }
  ]
};

function formatFaqCard(faq) {
  return `            <div class="faq-card fade-up">
                <div class="faq-card-header">
                    <span class="faq-question">${faq.q}</span>
                </div>
                <div class="faq-card-body">
                    <div class="faq-card-content">
                        ${faq.a}
                    </div>
                </div>
            </div>`;
}

Object.keys(newFaqs).forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the closing </div> of faq-list
  // Pattern: <div class="faq-list">[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)
  const faqListMatch = content.match(/(<div class="faq-list">[\s\S]*?)(\s*<\/div>\s*<\/div>\s*<\/section>)/);

  if (!faqListMatch) {
    console.error('ERROR: Could not find faq-list in ' + file);
    return;
  }

  const existingCards = faqListMatch[1];
  const closingTags = faqListMatch[2];

  const addedCards = newFaqs[file].map(formatFaqCard).join('\n');
  const updatedFaqList = existingCards + '\n' + addedCards + closingTags;

  content = content.replace(faqListMatch[0], updatedFaqList);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}: added ${newFaqs[file].length} technical FAQs`);
});

console.log('=== ALL SERVICE FAQS UPDATED SUCCESSFULLY ===');
