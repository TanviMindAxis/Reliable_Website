const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');

const serviceConfigs = [
  {
    file: 'rtk-drone-mapping.html',
    titleMain: 'RTK Drone',
    titleAccent: 'Mapping',
    bcText: 'RTK DRONE MAPPING',
    cardTitle: 'RTK Drone Mapping',
    serviceType: 'RTK Drone Mapping'
  },
  {
    file: 'dgps-gnss-control.html',
    titleMain: 'DGPS & GNSS',
    titleAccent: 'Control Survey',
    bcText: 'DGPS / GNSS CONTROL',
    cardTitle: 'DGPS / GNSS Control',
    serviceType: 'DGPS & GNSS Control Survey'
  },
  {
    file: 'total-station-survey.html',
    titleMain: 'Total Station',
    titleAccent: 'Survey',
    bcText: 'TOTAL STATION SURVEY',
    cardTitle: 'Total Station Survey',
    serviceType: 'Total Station Survey'
  },
  {
    file: 'lidar-3d-scanning.html',
    titleMain: 'Drone LiDAR &',
    titleAccent: '3D Scanning',
    bcText: 'DRONE LIDAR & 3D SCANNING',
    cardTitle: 'Drone LiDAR & 3D Scanning',
    serviceType: 'Drone LiDAR & 3D Scanning'
  },
  {
    file: 'drone-photogrammetry.html',
    titleMain: 'Drone',
    titleAccent: 'Photogrammetry',
    bcText: 'DRONE PHOTOGRAMMETRY',
    cardTitle: 'Drone Photogrammetry',
    serviceType: 'Drone Photogrammetry'
  },
  {
    file: 'road-highway.html',
    titleMain: 'Road & Highway',
    titleAccent: 'Survey',
    bcText: 'ROAD & HIGHWAY SURVEY',
    cardTitle: 'Road & Highway Survey',
    serviceType: 'Road & Highway Survey'
  },
  {
    file: 'rail-metro.html',
    titleMain: 'Rail & Metro',
    titleAccent: 'Survey',
    bcText: 'RAIL & METRO SURVEY',
    cardTitle: 'Rail & Metro Survey',
    serviceType: 'Rail & Metro Survey'
  },
  {
    file: 'cad-gis-processing.html',
    titleMain: 'CAD & GIS',
    titleAccent: 'Processing',
    bcText: 'CAD & GIS PROCESSING',
    cardTitle: 'CAD & GIS Processing',
    serviceType: 'CAD & GIS Processing'
  }
];

const overlayHtml = `        <!-- Soft readability gradient overlay for mobile & tablet -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(234, 244, 252, 0.92) 0%, rgba(234, 244, 252, 0.78) 55%, rgba(234, 244, 252, 0.35) 100%); z-index: 1; pointer-events: none;"></div>\n\n`;

serviceConfigs.forEach(cfg => {
  const filePath = path.join(dir, cfg.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add gradient overlay if missing
  if (!content.includes('Soft readability gradient overlay')) {
    const bgImgRegex = /(<img src="assets\/images\/about-hero-clean\.jpg"[^>]*class="bg-pan-anim"[^>]*>\s*)/;
    if (bgImgRegex.test(content)) {
      content = content.replace(bgImgRegex, `$1${overlayHtml}`);
    }
  }

  // 2. Standardize breadcrumb
  const bcRegex = /<div style="font-size: 12px; font-weight: 800; color: var\(--primary-navy\); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">([\s\S]*?)<\/div>/;
  const newBc = `<div class="service-breadcrumb" style="font-size: 11.5px; font-weight: 800; color: var(--primary-navy); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <a href="index.html" style="color: #4b5563; text-decoration: none;">HOME</a>
                    <span style="color: var(--accent-orange);">&raquo;</span>
                    <a href="services.html" style="color: #4b5563; text-decoration: none;">SERVICES</a>
                    <span style="color: var(--accent-orange);">&raquo;</span>
                    <span style="color: var(--accent-orange); font-weight: 800; white-space: nowrap;">${cfg.bcText}</span>
                </div>`;
  if (bcRegex.test(content)) {
    content = content.replace(bcRegex, newBc);
  }

  // 3. Standardize H1
  const h1Regex = /<h1[\s\S]*?style="[^"]*font-size:\s*clamp\([^"]*"[^>]*>[\s\S]*?<\/h1>/;
  const newH1 = `<h1 class="service-hero-title"
                    style="font-size: clamp(1.85rem, 5vw, 3.2rem); color: var(--dark-navy); line-height: 1.2; margin-bottom: 18px; font-weight: 800; text-shadow: 0 0 15px rgba(255,255,255,0.85);">
                    <span class="hero-title-main">${cfg.titleMain}</span> <span class="hero-title-accent" style="color: var(--accent-orange); white-space: nowrap;">${cfg.titleAccent}</span>
                </h1>`;
  if (h1Regex.test(content)) {
    content = content.replace(h1Regex, newH1);
  }

  // 4. Update image card service name
  const imgTitleRegex = new RegExp(`<div style="font-size: 18px; font-weight: 800; font-family: var\\(--font-heading\\);">${cfg.cardTitle}</div>`);
  const newImgTitle = `<div style="font-size: 18px; font-weight: 800; font-family: var(--font-heading); color: #ffffff; text-shadow: 0 1px 4px rgba(0,0,0,0.7);">${cfg.cardTitle}</div>`;
  if (imgTitleRegex.test(content)) {
    content = content.replace(imgTitleRegex, newImgTitle);
  }

  // 5. Update Specs section and grid styling to match topographical-survey.html
  content = content.replace(
    /<section class="section" style="padding: 70px 0; background: #f8fafc;">/g,
    `<section class="section service-spec-section engineering-survey-section" style="padding: 75px 0; position: relative; overflow: hidden; background: #f0f7fd url('assets/images/engineering-survey-bg.png') no-repeat center center; background-size: cover;">`
  );
  content = content.replace(
    /<div class="service-spec-grid" style="display: grid; grid-template-columns: 1fr 1\.15fr; gap: 40px; align-items: stretch; background: #ffffff; border-radius: 16px; box-shadow: 0 12px 35px rgba\(8, 43, 76, 0\.06\); border: 1px solid #e2e8f0; padding: clamp\(25px, 4vw, 45px\); box-sizing: border-box;">/g,
    `<div class="service-spec-grid" style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px; align-items: stretch; background: linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.88) 100%); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 16px; box-shadow: 0 20px 45px rgba(8, 43, 76, 0.12); border: 1px solid rgba(255, 255, 255, 0.95); padding: clamp(25px, 4vw, 45px); box-sizing: border-box;">`
  );

  // 6. Update Table service type to clean standardized name
  const tableServiceTypeRegex = /(SERVICE TYPE<\/td>\s*<td style="[^"]*">)([\s\S]*?)(<\/td>)/;
  if (tableServiceTypeRegex.test(content)) {
    content = content.replace(tableServiceTypeRegex, `$1${cfg.serviceType}$3`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully standardized ${cfg.file}`);
});
