const regionalAbundanceMap = {
  // North India
  punjab: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Mustard', 'Barley'],
  haryana: ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Mustard'],
  'uttar pradesh': ['Sugarcane', 'Wheat', 'Rice', 'Potato', 'Mustard'],
  uttarakhand: ['Wheat', 'Rice', 'Sugarcane'],
  'himachal pradesh': ['Wheat', 'Maize', 'Rice', 'Barley', 'Potato'],
  
  // West India
  rajasthan: ['Mustard', 'Wheat', 'Cotton', 'Millets', 'Barley'],
  gujarat: ['Cotton', 'Groundnut', 'Wheat', 'Mustard', 'Millets'],
  maharashtra: ['Sugarcane', 'Cotton', 'Soybean', 'Onion', 'Rice', 'Millets'],
  goa: ['Rice', 'Coconut'],
  
  // South India
  karnataka: ['Coffee', 'Rice', 'Millets', 'Sugarcane', 'Cotton', 'Maize'],
  'tamil nadu': ['Rice', 'Sugarcane', 'Cotton', 'Groundnut', 'Tea'],
  kerala: ['Rubber', 'Tea', 'Coffee', 'Rice', 'Coconut', 'Spices'],
  'andhra pradesh': ['Rice', 'Tobacco', 'Cotton', 'Sugarcane', 'Groundnut', 'Tomato'],
  telangana: ['Rice', 'Cotton', 'Maize', 'Groundnut'],
  
  // East India
  'west bengal': ['Rice', 'Jute', 'Potato', 'Tea'],
  odisha: ['Rice', 'Jute', 'Mustard'],
  bihar: ['Rice', 'Wheat', 'Maize', 'Sugarcane', 'Jute'],
  jharkhand: ['Rice', 'Maize', 'Wheat'],
  
  // Northeast India
  assam: ['Tea', 'Rice', 'Jute'],
  meghalaya: ['Rice', 'Potato', 'Maize'],
  tripura: ['Rice', 'Rubber', 'Tea'],
  nagaland: ['Rice', 'Maize'],
  manipur: ['Rice', 'Maize'],
  mizoram: ['Rice', 'Maize'],
  'arunachal pradesh': ['Rice', 'Maize', 'Millets'],
  sikkim: ['Maize', 'Rice', 'Wheat'],
  
  // Central India
  'madhya pradesh': ['Soybean', 'Wheat', 'Gram (Chickpea)', 'Mustard', 'Cotton', 'Maize'],
  chhattisgarh: ['Rice', 'Maize', 'Soybean', 'Groundnut'],

  // Major Cities Fallback (using states' top crops)
  delhi: ['Wheat', 'Mustard'],
  mumbai: ['Rice', 'Sugarcane', 'Cotton'],
  pune: ['Sugarcane', 'Onion', 'Soybean'],
  bangalore: ['Millets', 'Coffee', 'Maize'],
  bengaluru: ['Millets', 'Coffee', 'Maize'],
  chennai: ['Rice', 'Groundnut'],
  kolkata: ['Rice', 'Jute'],
  hyderabad: ['Rice', 'Cotton'],
  ahmedabad: ['Cotton', 'Groundnut'],
  jaipur: ['Mustard', 'Wheat', 'Millets'],
  lucknow: ['Wheat', 'Sugarcane', 'Potato'],
  chandigarh: ['Wheat', 'Rice'],
  bhopal: ['Soybean', 'Wheat'],
  patna: ['Rice', 'Wheat', 'Maize'],
  guwahati: ['Tea', 'Rice'],
  nagpur: ['Cotton', 'Soybean'],
  indore: ['Soybean', 'Wheat'],
  kochi: ['Rubber', 'Tea', 'Coffee'],
  trivandrum: ['Rubber', 'Tea'],
  coimbatore: ['Cotton', 'Sugarcane']
};

const getAbundantCropsForLocation = (location) => {
  if (!location) return [];

  const normalized = location.trim().toLowerCase();

  // Exact match
  if (regionalAbundanceMap[normalized]) {
    return regionalAbundanceMap[normalized];
  }

  // Partial match
  for (const [key, crops] of Object.entries(regionalAbundanceMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return crops;
    }
  }

  return [];
};

module.exports = { getAbundantCropsForLocation };
