const fs = require('fs');

const DOMAIN = 'https://www.reliablelandsurvey.in';
const LOGO_URL = `${DOMAIN}/assets/images/logo.png`;

const pageMetadata = {
  'index.html': {
    title: 'Reliable Land Survey Consultancy | Surveying & Geospatial Solutions Pune',
    description: 'Professional land surveying, DGPS, GNSS, Total Station, RTK Drone, LiDAR, photogrammetry and geospatial solutions for infrastructure projects in Pune, Maharashtra.',
    keywords: 'Land Survey, DGPS, GNSS, Total Station, RTK Drone, LiDAR, Topographical Survey, Infrastructure Survey, Pune, Maharashtra',
    canonical: `${DOMAIN}/`,
    ogUrl: `${DOMAIN}/`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${DOMAIN}/#organization`,
        'name': 'Reliable Land Survey Consultancy',
        'alternateName': 'Reliable Land Survey Pune',
        'url': `${DOMAIN}/`,
        'logo': LOGO_URL,
        'image': LOGO_URL,
        'description': 'Professional land surveying, DGPS, Total Station, RTK Drone mapping, LiDAR scanning and GIS processing across Maharashtra, India.',
        'telephone': '+919604646777',
        'email': 'tanviii6104@gmail.com',
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Pune',
          'addressRegion': 'Maharashtra',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 18.5204,
          'longitude': 73.8567
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '19:00'
        },
        'areaServed': [
          { '@type': 'AdministrativeArea', 'name': 'Maharashtra' },
          { '@type': 'Country', 'name': 'India' }
        ],
        'sameAs': [
          'https://wa.me/919604646777'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        'url': `${DOMAIN}/`,
        'name': 'Reliable Land Survey Consultancy',
        'description': 'Precision surveying and geospatial solutions for modern infrastructure.',
        'publisher': {
          '@id': `${DOMAIN}/#organization`
        }
      }
    ]
  },

  'about.html': {
    title: 'About Us | Reliable Land Survey Consultancy Pune',
    description: 'Learn about Reliable Land Survey Consultancy - our mission, experienced survey crews, state-of-the-art DGPS, Total Station, and drone LiDAR technology in Pune.',
    keywords: 'About Reliable Land Survey, Survey Consultants Pune, Land Surveying Team, Drone Survey Experts Maharashtra',
    canonical: `${DOMAIN}/about.html`,
    ogUrl: `${DOMAIN}/about.html`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${DOMAIN}/about.html#webpage`,
        'url': `${DOMAIN}/about.html`,
        'name': 'About Us | Reliable Land Survey Consultancy Pune',
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': `${DOMAIN}/about.html` }
          ]
        }
      }
    ]
  },

  'services.html': {
    title: 'Our Survey Services | Reliable Land Survey Consultancy Pune',
    description: 'Explore our end-to-end surveying services: Topographical Survey, DGPS Control, Total Station, RTK Drone Mapping, LiDAR 3D Scanning, Road, Rail & GIS processing.',
    keywords: 'Land Survey Services, Topographical Survey, DGPS Control, Drone LiDAR, Total Station Pune',
    canonical: `${DOMAIN}/services.html`,
    ogUrl: `${DOMAIN}/services.html`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${DOMAIN}/services.html#webpage`,
        'url': `${DOMAIN}/services.html`,
        'name': 'Our Survey Services | Reliable Land Survey Consultancy Pune',
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Our Services', 'item': `${DOMAIN}/services.html` }
          ]
        },
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'url': `${DOMAIN}/topographical-survey.html`, 'name': 'Topographical Survey' },
            { '@type': 'ListItem', 'position': 2, 'url': `${DOMAIN}/dgps-gnss-control.html`, 'name': 'DGPS / GNSS Control' },
            { '@type': 'ListItem', 'position': 3, 'url': `${DOMAIN}/total-station-survey.html`, 'name': 'Total Station Survey' },
            { '@type': 'ListItem', 'position': 4, 'url': `${DOMAIN}/rtk-drone-mapping.html`, 'name': 'RTK Drone Mapping' },
            { '@type': 'ListItem', 'position': 5, 'url': `${DOMAIN}/lidar-3d-scanning.html`, 'name': 'Drone LiDAR Scanning' },
            { '@type': 'ListItem', 'position': 6, 'url': `${DOMAIN}/drone-photogrammetry.html`, 'name': 'Drone Photogrammetry' },
            { '@type': 'ListItem', 'position': 7, 'url': `${DOMAIN}/road-highway.html`, 'name': 'Road & Highway Survey' },
            { '@type': 'ListItem', 'position': 8, 'url': `${DOMAIN}/rail-metro.html`, 'name': 'Rail & Metro Survey' },
            { '@type': 'ListItem', 'position': 9, 'url': `${DOMAIN}/cad-gis-processing.html`, 'name': 'CAD & GIS Processing' }
          ]
        }
      }
    ]
  },

  'topographical-survey.html': {
    title: 'Topographical Survey in Pune | Reliable Land Survey Consultancy',
    description: 'High-precision topographical and contour land surveys in Pune, Maharashtra. Comprehensive terrain mapping for infrastructure, commercial & residential land development.',
    keywords: 'Topographical Survey, Contour Survey, Land Mapping Pune, Terrain Modeling Maharashtra',
    canonical: `${DOMAIN}/topographical-survey.html`,
    ogUrl: `${DOMAIN}/topographical-survey.html`,
    serviceName: 'Topographical Survey',
    serviceDescription: 'Comprehensive terrain elevation mapping, contour generation, and natural and man-made feature measurement for civil design.'
  },

  'dgps-gnss-control.html': {
    title: 'DGPS & GNSS Control Survey in Pune | Reliable Land Survey Consultancy',
    description: 'Establish geodetic control networks and boundary baselines with millimeter-precision dual-frequency DGPS & GNSS receivers in Pune, Maharashtra.',
    keywords: 'DGPS Survey, GNSS Control Survey, Geodetic Baseline, Pune Surveyors, Boundary Survey',
    canonical: `${DOMAIN}/dgps-gnss-control.html`,
    ogUrl: `${DOMAIN}/dgps-gnss-control.html`,
    serviceName: 'DGPS / GNSS Control Survey',
    serviceDescription: 'Millimeter-grade geodetic baseline and secondary horizontal/vertical control network establishment for infrastructure projects.'
  },

  'total-station-survey.html': {
    title: 'Total Station Survey in Pune | Reliable Land Survey Consultancy',
    description: 'Millimeter-accurate boundary demarcation, building layout staking, and engineering alignment with modern reflectorless electronic Total Station equipment.',
    keywords: 'Total Station Survey, Electronic Total Station, Building Layout Staking, Boundary Demarcation Pune',
    canonical: `${DOMAIN}/total-station-survey.html`,
    ogUrl: `${DOMAIN}/total-station-survey.html`,
    serviceName: 'Total Station Survey',
    serviceDescription: 'High-accuracy electronic total station measurements for property lines, building foundation grids, and civil engineering alignments.'
  },

  'rtk-drone-mapping.html': {
    title: 'RTK Drone Mapping Services Pune | Reliable Land Survey Consultancy',
    description: 'Centimeter-level aerial drone surveying, orthomosaics, digital surface models (DSM), and volumetric analysis for large-scale land parcels in Maharashtra.',
    keywords: 'RTK Drone Mapping, Aerial Survey Pune, UAV Photogrammetry, DSM DTM Drone Survey Maharashtra',
    canonical: `${DOMAIN}/rtk-drone-mapping.html`,
    ogUrl: `${DOMAIN}/rtk-drone-mapping.html`,
    serviceName: 'RTK Drone Aerial Mapping',
    serviceDescription: 'Centimeter-precision aerial drone surveys producing geo-referenced orthophotos, elevation models, and high-volume land parcel maps.'
  },

  'lidar-3d-scanning.html': {
    title: 'Drone LiDAR & 3D Scanning in Pune | Reliable Land Survey Consultancy',
    description: 'High-density aerial and terrestrial LiDAR 3D scanning that penetrates dense vegetation to deliver accurate ground topography and complex civil point clouds.',
    keywords: 'Drone LiDAR Survey, 3D Laser Scanning, Point Cloud Processing, Vegetation Penetration Survey Pune',
    canonical: `${DOMAIN}/lidar-3d-scanning.html`,
    ogUrl: `${DOMAIN}/lidar-3d-scanning.html`,
    serviceName: 'Drone LiDAR & 3D Scanning',
    serviceDescription: 'Survey-grade aerial LiDAR point cloud scanning for terrain modeling under dense forest canopies, industrial assets, and urban corridors.'
  },

  'drone-photogrammetry.html': {
    title: 'Drone Photogrammetry Services in Pune | Reliable Land Survey Consultancy',
    description: 'High-resolution aerial imaging, photogrammetric triangulation, orthorectified aerial mosaics, and 3D textured mesh models for engineering planning.',
    keywords: 'Drone Photogrammetry, Orthorectified Mosaic, 3D Mesh Modeling, Aerial Photogrammetry Pune',
    canonical: `${DOMAIN}/drone-photogrammetry.html`,
    ogUrl: `${DOMAIN}/drone-photogrammetry.html`,
    serviceName: 'Drone Photogrammetry',
    serviceDescription: 'Photogrammetric image acquisition and processing into dense 3D surface meshes and high-resolution CAD-ready orthomosaics.'
  },

  'road-highway.html': {
    title: 'Road & Highway Alignment Survey | Reliable Land Survey Consultancy',
    description: 'Centerline alignment, longitudinal profiles, cross-sections, right-of-way (ROW) mapping, and earthwork volume calculation for highway & expressway projects.',
    keywords: 'Road Survey, Highway Alignment Survey, Longitudinal Section, Cross Section, Earthwork Calculation Pune',
    canonical: `${DOMAIN}/road-highway.html`,
    ogUrl: `${DOMAIN}/road-highway.html`,
    serviceName: 'Road & Highway Alignment Survey',
    serviceDescription: 'Complete corridor mapping including existing pavement condition, ROW demarcation, cross-sectional geometry, and cut/fill earthwork computations.'
  },

  'rail-metro.html': {
    title: 'Rail & Metro Infrastructure Survey | Reliable Land Survey Consultancy',
    description: 'Specialized track centerline, clearance envelope, corridor monitoring, and station infrastructure surveying for railway and metro rail systems in India.',
    keywords: 'Railway Survey, Metro Alignment Survey, Track Clearance Survey, Corridor Monitoring Pune',
    canonical: `${DOMAIN}/rail-metro.html`,
    ogUrl: `${DOMAIN}/rail-metro.html`,
    serviceName: 'Rail & Metro Infrastructure Survey',
    serviceDescription: 'High-precision track geodetic network, structure clearance envelope verification, and track renewal survey solutions.'
  },

  'cad-gis-processing.html': {
    title: 'CAD Drafting & GIS Processing Services | Reliable Land Survey Consultancy',
    description: 'Expert AutoCAD drafting, GIS georeferencing, spatial attribute database creation, DTM/DEM modeling, and municipal submission drawing preparation.',
    keywords: 'AutoCAD Survey Drafting, GIS Georeferencing, Spatial Mapping, DTM DEM Modeling Pune',
    canonical: `${DOMAIN}/cad-gis-processing.html`,
    ogUrl: `${DOMAIN}/cad-gis-processing.html`,
    serviceName: 'CAD Drafting & GIS Processing',
    serviceDescription: 'Post-processing field survey data into AutoCAD drawings, GIS geodatabases, digital terrain models, and statutory municipal submission layouts.'
  },

  'gallery.html': {
    title: 'Project Gallery | Reliable Land Survey Consultancy Pune',
    description: 'Explore field photos, aerial drone imagery, LiDAR point clouds, and completed survey projects by Reliable Land Survey Consultancy across Maharashtra.',
    keywords: 'Survey Project Photos, Drone Survey Images, LiDAR Point Clouds Pune, Field Survey Gallery',
    canonical: `${DOMAIN}/gallery.html`,
    ogUrl: `${DOMAIN}/gallery.html`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${DOMAIN}/gallery.html#webpage`,
        'url': `${DOMAIN}/gallery.html`,
        'name': 'Project Gallery | Reliable Land Survey Consultancy Pune',
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Project Gallery', 'item': `${DOMAIN}/gallery.html` }
          ]
        }
      }
    ]
  },

  'contact.html': {
    title: 'Contact Us | Reliable Land Survey Consultancy Pune',
    description: 'Get in touch with our survey engineers for project quotations, technical consultation, or office visits in Pune, Maharashtra. Phone: +91 96046 46777.',
    keywords: 'Contact Surveyors Pune, Land Survey Quotation, Survey Office Kokane Chowk, Land Survey Contact Maharashtra',
    canonical: `${DOMAIN}/contact.html`,
    ogUrl: `${DOMAIN}/contact.html`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${DOMAIN}/contact.html#webpage`,
        'url': `${DOMAIN}/contact.html`,
        'name': 'Contact Us | Reliable Land Survey Consultancy Pune',
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Contact Us', 'item': `${DOMAIN}/contact.html` }
          ]
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What kind of surveys do you perform?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We specialize in Topographical Surveys, DGPS/GNSS Control Establishment, LiDAR Drone Scanning, Route Alignments (Highways/Railways), and detailed As-Built structural surveys using state-of-the-art robotic total stations and RTK drones.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How accurate is your Drone LiDAR mapping?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our LiDAR sensors deployed on DJI enterprise drones can achieve absolute precision of down to 2-3 cm (XYZ) depending on flight parameters and ground control points. It easily penetrates dense vegetation to capture true ground models.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the standard turnaround time for a project?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Turnaround time heavily depends on the project scope, terrain, and deliverables. However, our use of modern drone mapping allows us to capture thousands of acres in a single day, reducing traditional field time by up to 70%. We provide a precise timeline along with our quotation.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What formats do you deliver the final data in?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We deliver engineering-ready data compatible with major CAD and GIS software. Common formats include AutoCAD (.DWG, .DXF), point clouds (.LAS, .LAZ), GeoTIFF orthomosaics, shapefiles (.SHP), and standard PDF reports.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do you undertake survey projects outside of Pune and Maharashtra?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, while our headquarters and primary operations hub are based in Pune, we undertake surveying and geospatial consultancy projects across Maharashtra and nationwide throughout India for large-scale infrastructure, highways, industrial corridors, and renewable energy sites.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What information is required to get a detailed project quotation?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To provide an accurate and prompt quotation, we typically need the project site location (Google Maps pin or KMZ boundary), the total land area or route corridor length, the desired survey type (e.g., Topographical, Drone LiDAR, DGPS Control, or Total Station), and your preferred engineering deliverables (CAD .DWG, contours, DTM/DEM, or point clouds).'
            }
          }
        ]
      }
    ]
  },

  'review.html': {
    title: 'Client Reviews & Feedback | Reliable Land Survey Consultancy',
    description: 'Read client reviews or submit your feedback on our surveying accuracy, turnaround speed, and engineering deliverables across Maharashtra projects.',
    keywords: 'Client Reviews, Survey Feedback, Land Survey Testimonials Pune, Reliable Land Survey Rating',
    canonical: `${DOMAIN}/review.html`,
    ogUrl: `${DOMAIN}/review.html`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        '@id': `${DOMAIN}/review.html#webpage`,
        'url': `${DOMAIN}/review.html`,
        'name': 'Client Reviews & Feedback | Reliable Land Survey Consultancy',
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Client Reviews', 'item': `${DOMAIN}/review.html` }
          ]
        },
        'mainEntity': {
          '@type': 'AggregateRating',
          'itemReviewed': {
            '@type': 'ProfessionalService',
            'name': 'Reliable Land Survey Consultancy',
            'telephone': '+919604646777',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Pune',
              'addressRegion': 'Maharashtra',
              'addressCountry': 'IN'
            }
          },
          'ratingValue': '5.0',
          'reviewCount': '98',
          'bestRating': '5',
          'worstRating': '1'
        }
      }
    ]
  }
};

// Generate schemas for service pages
Object.keys(pageMetadata).forEach(file => {
  const meta = pageMetadata[file];
  if (meta.serviceName && !meta.schemas) {
    meta.schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${meta.canonical}#service`,
        'name': meta.serviceName,
        'serviceType': meta.serviceName,
        'description': meta.serviceDescription,
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Reliable Land Survey Consultancy',
          'telephone': '+919604646777',
          'url': `${DOMAIN}/`
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': 'Maharashtra, India'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${DOMAIN}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': `${DOMAIN}/services.html` },
          { '@type': 'ListItem', 'position': 3, 'name': meta.serviceName, 'item': meta.canonical }
        ]
      }
    ];
  }
});

console.log('Applying SEO and Structured Data to all 15 HTML files...');

Object.keys(pageMetadata).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const meta = pageMetadata[file];

  // 1. Update <title>
  if (content.includes('<title>')) {
    content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  }

  // 2. Update <meta name="description">
  if (/name=["']description["']/i.test(content)) {
    content = content.replace(/<meta[^>]*name=["']description["'][^>]*>/i, `<meta name="description" content="${meta.description}">`);
  }

  // 3. Update <meta name="keywords">
  if (/name=["']keywords["']/i.test(content)) {
    content = content.replace(/<meta[^>]*name=["']keywords["'][^>]*>/i, `<meta name="keywords" content="${meta.keywords}">`);
  }

  // 4. Update or inject canonical
  if (/rel=["']canonical["']/i.test(content)) {
    content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${meta.canonical}">`);
  }

  // 5. Replace existing Open Graph block with comprehensive OG & Twitter tags
  const ogAndTwitterTags = `
    <!-- Standard Meta Tags -->
    <meta name="author" content="Reliable Land Survey Consultancy">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#082B4C">

    <!-- Open Graph (Facebook / LinkedIn) -->
    <meta property="og:site_name" content="Reliable Land Survey Consultancy">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:url" content="${meta.ogUrl}">
    <meta property="og:image" content="${LOGO_URL}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Reliable Land Survey Consultancy Logo">
    <meta property="og:locale" content="en_IN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${LOGO_URL}">`;

  // Remove existing OG tags block
  content = content.replace(/<!--\s*Open Graph tags\s*-->[\s\S]*?(?=<link rel="canonical"|<link rel="shortcut icon"|<link rel="preconnect"|<link rel="stylesheet")/i, '');
  content = content.replace(/<!--\s*Open Graph tags\s*-->/gi, '');
  content = content.replace(/<meta\s+property=["']og:[^>]*>/gi, '');

  // Inject fresh OG & Twitter tags right before <link rel="canonical"
  if (content.includes(`<link rel="canonical" href="${meta.canonical}">`)) {
    content = content.replace(
      `<link rel="canonical" href="${meta.canonical}">`,
      `${ogAndTwitterTags}\n\n    <link rel="canonical" href="${meta.canonical}">`
    );
  }

  // 6. Inject Schema.org JSON-LD structured data (remove old ones if any)
  content = content.replace(/<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>\s*/gi, '');
  
  const schemaTags = meta.schemas.map(s => {
    return `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`;
  }).join('\n');

  // Insert schemas right before </head>
  content = content.replace('</head>', `${schemaTags}\n</head>`);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated SEO & Schema in ${file}`);
});

console.log('\nAll 15 files successfully structured for SEO and Testing!');
