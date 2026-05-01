// Mapping of Indian cities/regions to their predominant soil types
// This covers major cities and regions across India

const locationSoilMap = {
  // North India
  delhi: ['Alluvial', 'Sandy', 'Loamy'],
  'new delhi': ['Alluvial', 'Sandy', 'Loamy'],
  noida: ['Alluvial', 'Loamy'],
  gurgaon: ['Alluvial', 'Sandy'],
  gurugram: ['Alluvial', 'Sandy'],
  faridabad: ['Alluvial', 'Sandy'],
  chandigarh: ['Alluvial', 'Loamy'],
  amritsar: ['Alluvial', 'Loamy'],
  ludhiana: ['Alluvial', 'Loamy'],
  jalandhar: ['Alluvial', 'Loamy', 'Clay'],
  patiala: ['Alluvial', 'Loamy'],
  shimla: ['Loamy', 'Laterite'],
  dehradun: ['Alluvial', 'Loamy'],
  haridwar: ['Alluvial', 'Sandy'],
  lucknow: ['Alluvial', 'Loamy', 'Clay'],
  kanpur: ['Alluvial', 'Loamy'],
  agra: ['Alluvial', 'Sandy', 'Loamy'],
  varanasi: ['Alluvial', 'Clay', 'Loamy'],
  prayagraj: ['Alluvial', 'Loamy'],
  allahabad: ['Alluvial', 'Loamy'],
  meerut: ['Alluvial', 'Loamy'],
  bareilly: ['Alluvial', 'Loamy'],
  jaipur: ['Sandy', 'Alluvial', 'Loamy'],
  jodhpur: ['Sandy', 'Alluvial'],
  udaipur: ['Black soil', 'Alluvial', 'Loamy'],
  ajmer: ['Sandy', 'Loamy'],
  bikaner: ['Sandy'],
  kota: ['Black soil', 'Alluvial'],

  // West India
  mumbai: ['Laterite', 'Alluvial', 'Loamy'],
  pune: ['Black soil', 'Laterite', 'Loamy'],
  nagpur: ['Black soil', 'Clay', 'Loamy'],
  nashik: ['Black soil', 'Laterite', 'Loamy'],
  aurangabad: ['Black soil', 'Clay'],
  kolhapur: ['Laterite', 'Black soil', 'Loamy'],
  solapur: ['Black soil', 'Clay'],
  ahmednagar: ['Black soil', 'Loamy'],
  ahmedabad: ['Alluvial', 'Sandy', 'Black soil'],
  surat: ['Alluvial', 'Black soil', 'Loamy'],
  vadodara: ['Alluvial', 'Black soil', 'Loamy'],
  rajkot: ['Black soil', 'Sandy', 'Loamy'],
  gandhinagar: ['Alluvial', 'Sandy'],
  bhuj: ['Sandy', 'Alluvial'],
  goa: ['Laterite', 'Loamy', 'Sandy'],
  panaji: ['Laterite', 'Loamy', 'Sandy'],

  // South India
  bangalore: ['Red soil', 'Laterite', 'Loamy'],
  bengaluru: ['Red soil', 'Laterite', 'Loamy'],
  mysore: ['Red soil', 'Loamy', 'Black soil'],
  mysuru: ['Red soil', 'Loamy', 'Black soil'],
  mangalore: ['Laterite', 'Loamy', 'Red soil'],
  hubli: ['Black soil', 'Red soil', 'Loamy'],
  belgaum: ['Black soil', 'Laterite', 'Loamy'],
  chennai: ['Alluvial', 'Red soil', 'Sandy'],
  coimbatore: ['Red soil', 'Black soil', 'Loamy'],
  madurai: ['Red soil', 'Black soil', 'Alluvial'],
  trichy: ['Alluvial', 'Red soil', 'Loamy'],
  tiruchirappalli: ['Alluvial', 'Red soil', 'Loamy'],
  salem: ['Red soil', 'Loamy'],
  tirunelveli: ['Red soil', 'Alluvial', 'Sandy'],
  kochi: ['Laterite', 'Alluvial', 'Loamy'],
  cochin: ['Laterite', 'Alluvial', 'Loamy'],
  thiruvananthapuram: ['Laterite', 'Red soil', 'Sandy'],
  trivandrum: ['Laterite', 'Red soil', 'Sandy'],
  kozhikode: ['Laterite', 'Loamy'],
  calicut: ['Laterite', 'Loamy'],
  thrissur: ['Laterite', 'Alluvial', 'Loamy'],
  hyderabad: ['Red soil', 'Black soil', 'Loamy'],
  secunderabad: ['Red soil', 'Black soil', 'Loamy'],
  warangal: ['Red soil', 'Black soil'],
  vijayawada: ['Alluvial', 'Black soil', 'Loamy'],
  visakhapatnam: ['Red soil', 'Alluvial', 'Loamy'],
  vizag: ['Red soil', 'Alluvial', 'Loamy'],
  tirupati: ['Red soil', 'Loamy'],
  guntur: ['Alluvial', 'Black soil'],

  // East India
  kolkata: ['Alluvial', 'Clay', 'Loamy'],
  howrah: ['Alluvial', 'Clay'],
  darjeeling: ['Loamy', 'Laterite'],
  siliguri: ['Alluvial', 'Loamy'],
  durgapur: ['Alluvial', 'Laterite', 'Loamy'],
  bhubaneswar: ['Red soil', 'Laterite', 'Alluvial'],
  cuttack: ['Alluvial', 'Red soil', 'Loamy'],
  puri: ['Sandy', 'Alluvial'],
  patna: ['Alluvial', 'Clay', 'Loamy'],
  gaya: ['Alluvial', 'Loamy'],
  muzaffarpur: ['Alluvial', 'Loamy'],
  ranchi: ['Red soil', 'Laterite', 'Loamy'],
  jamshedpur: ['Red soil', 'Laterite'],
  dhanbad: ['Red soil', 'Laterite', 'Loamy'],

  // Northeast India
  guwahati: ['Alluvial', 'Red soil', 'Laterite'],
  shillong: ['Laterite', 'Loamy'],
  imphal: ['Alluvial', 'Red soil', 'Loamy'],
  agartala: ['Alluvial', 'Red soil'],
  aizawl: ['Laterite', 'Loamy'],
  kohima: ['Laterite', 'Loamy'],
  itanagar: ['Alluvial', 'Laterite'],
  gangtok: ['Laterite', 'Loamy'],
  dibrugarh: ['Alluvial', 'Loamy'],
  jorhat: ['Alluvial', 'Loamy'],

  // Central India
  bhopal: ['Black soil', 'Alluvial', 'Loamy'],
  indore: ['Black soil', 'Clay', 'Loamy'],
  jabalpur: ['Black soil', 'Alluvial', 'Loamy'],
  gwalior: ['Alluvial', 'Black soil'],
  ujjain: ['Black soil', 'Alluvial'],
  raipur: ['Red soil', 'Black soil', 'Laterite'],
  bilaspur: ['Red soil', 'Loamy'],

  // State-level fallbacks
  punjab: ['Alluvial', 'Loamy'],
  haryana: ['Alluvial', 'Sandy', 'Loamy'],
  'uttar pradesh': ['Alluvial', 'Loamy', 'Clay'],
  rajasthan: ['Sandy', 'Alluvial', 'Loamy'],
  gujarat: ['Alluvial', 'Black soil', 'Sandy'],
  maharashtra: ['Black soil', 'Laterite', 'Loamy'],
  karnataka: ['Red soil', 'Laterite', 'Black soil'],
  'tamil nadu': ['Red soil', 'Alluvial', 'Black soil'],
  kerala: ['Laterite', 'Alluvial', 'Loamy'],
  'andhra pradesh': ['Red soil', 'Alluvial', 'Black soil'],
  telangana: ['Red soil', 'Black soil', 'Loamy'],
  'west bengal': ['Alluvial', 'Laterite', 'Loamy'],
  odisha: ['Red soil', 'Laterite', 'Alluvial'],
  bihar: ['Alluvial', 'Clay', 'Loamy'],
  jharkhand: ['Red soil', 'Laterite', 'Loamy'],
  'madhya pradesh': ['Black soil', 'Alluvial', 'Loamy'],
  chhattisgarh: ['Red soil', 'Laterite', 'Black soil'],
  assam: ['Alluvial', 'Red soil', 'Laterite'],
  'himachal pradesh': ['Loamy', 'Laterite'],
  uttarakhand: ['Alluvial', 'Loamy'],
  goa: ['Laterite', 'Loamy', 'Sandy'],
};

// Get soil types for a location (case-insensitive fuzzy match)
const getSoilsByLocation = (location) => {
  if (!location) return null;

  const normalized = location.trim().toLowerCase();

  // Exact match
  if (locationSoilMap[normalized]) {
    return locationSoilMap[normalized];
  }

  // Partial match — check if any key is contained in the input or vice versa
  for (const [key, soils] of Object.entries(locationSoilMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return soils;
    }
  }

  return null;
};

module.exports = { locationSoilMap, getSoilsByLocation };
