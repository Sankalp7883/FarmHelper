require('dotenv').config();
const mongoose = require('mongoose');
const Crop = require('./models/Crop');
const Fertilizer = require('./models/Fertilizer');

const fertilizers = [
  {
    name: 'Urea',
    type: 'Chemical',
    description: 'A widely used nitrogen fertilizer that provides a high yield of crops by promoting vegetative growth.',
    nutrients: ['Nitrogen'],
    usageTips: ['Apply before or during planting', 'Ensure soil is moist when applying']
  },
  {
    name: 'DAP',
    type: 'Chemical',
    description: 'Di-ammonium Phosphate is the world’s most widely used phosphorus fertilizer.',
    nutrients: ['Nitrogen', 'Phosphorus'],
    usageTips: ['Apply as a basal dose before sowing', 'Do not mix with calcium fertilizers']
  },
  {
    name: 'MOP',
    type: 'Chemical',
    description: 'Muriate of Potash provides potassium which is essential for plant growth and quality.',
    nutrients: ['Potassium'],
    usageTips: ['Apply during land preparation', 'Can be used as a top dressing']
  },
  {
    name: 'SSP',
    type: 'Chemical',
    description: 'Single Super Phosphate contains phosphorus, calcium, and sulfur.',
    nutrients: ['Phosphorus', 'Calcium', 'Sulfur'],
    usageTips: ['Excellent for oilseed crops', 'Apply as a basal dose']
  },
  {
    name: 'Zinc Sulphate',
    type: 'Chemical',
    description: 'Used to prevent and correct zinc deficiency in crops.',
    nutrients: ['Zinc', 'Sulfur'],
    usageTips: ['Apply as a foliar spray or basal soil application']
  },
  {
    name: 'Vermicompost',
    type: 'Organic',
    description: 'A nutrient-rich organic fertilizer and soil conditioner produced by earthworms.',
    nutrients: ['Nitrogen', 'Phosphorus', 'Potassium', 'Micronutrients'],
    usageTips: ['Mix into the soil before planting', 'Can be used as a top dressing']
  },
  {
    name: 'Cow Dung Manure',
    type: 'Organic',
    description: 'Well-rotted cow dung is an excellent organic fertilizer that improves soil structure.',
    nutrients: ['Nitrogen', 'Phosphorus', 'Potassium'],
    usageTips: ['Apply well-decomposed manure to prevent weed growth', 'Mix thoroughly with soil']
  },
  {
    name: 'Ammonium Sulphate',
    type: 'Chemical',
    description: 'An inorganic salt with a number of commercial uses. The most common use is as a soil fertilizer.',
    nutrients: ['Nitrogen', 'Sulfur'],
    usageTips: ['Excellent for alkaline soils', 'Apply as top dressing']
  },
  {
    name: 'Rock Phosphate',
    type: 'Organic',
    description: 'A slow-release organic source of phosphorus and calcium.',
    nutrients: ['Phosphorus', 'Calcium'],
    usageTips: ['Best used in acidic soils', 'Apply before planting and mix well']
  },
  {
    name: 'Gypsum',
    type: 'Mineral',
    description: 'A sulfate mineral used as a fertilizer to improve soil structure and provide calcium and sulfur.',
    nutrients: ['Calcium', 'Sulfur'],
    usageTips: ['Use to reclaim sodic soils', 'Improves water infiltration']
  },
  {
    name: 'Rhizobium culture',
    type: 'Bio-fertilizer',
    description: 'A bio-fertilizer that fixes atmospheric nitrogen in symbiotic association with leguminous crops.',
    nutrients: ['Nitrogen'],
    usageTips: ['Used for seed treatment before sowing', 'Crucial for legume crops like groundnut and soybean']
  },
  {
    name: 'Calcium Nitrate',
    type: 'Chemical',
    description: 'A water-soluble fertilizer that provides both calcium and nitrogen.',
    nutrients: ['Calcium', 'Nitrogen'],
    usageTips: ['Prevents blossom end rot in tomatoes', 'Apply via fertigation or foliar spray']
  },
  {
    name: 'Boron',
    type: 'Micronutrient',
    description: 'An essential micronutrient for cell wall formation and reproductive growth in plants.',
    nutrients: ['Boron'],
    usageTips: ['Apply as a foliar spray during flowering', 'Crucial for crops like tomatoes and mustard']
  },
  {
    name: 'NPK',
    type: 'Chemical',
    description: 'Complex fertilizers providing primary nutrients in various ratios (e.g., 15-15-15, 20-20-0, 10-26-26, 12-32-16).',
    nutrients: ['Nitrogen', 'Phosphorus', 'Potassium'],
    usageTips: ['Use the specific NPK ratio based on soil test results', 'Generally applied as a basal dose']
  }
];

const crops = [
  {
    cropName: 'Rice',
    soilType: ['Clay', 'Loamy', 'Black soil'],
    season: ['Kharif', 'Summer'],
    temperatureRange: { min: 22, max: 32 },
    fertilizers: ['Urea', 'NPK 15-15-15', 'Zinc Sulphate'],
    waterRequirement: 'High',
    growingPeriod: '120-150 days',
    description: 'A major staple food crop, requiring high temperature and high humidity. Grown extensively in monsoon season.',
  },
  {
    cropName: 'Wheat',
    soilType: ['Loamy', 'Clay', 'Alluvial'],
    season: ['Rabi', 'Winter'],
    temperatureRange: { min: 10, max: 25 },
    fertilizers: ['Urea', 'DAP', 'MOP'],
    waterRequirement: 'Medium',
    growingPeriod: '120-150 days',
    description: 'A global staple cereal grain, grows best in cool, moist weather during Winter months.',
  },
  {
    cropName: 'Cotton',
    soilType: ['Black soil', 'Alluvial'],
    season: ['Kharif'],
    temperatureRange: { min: 21, max: 30 },
    fertilizers: ['NPK 20-20-0', 'Urea', 'Potash'],
    waterRequirement: 'Medium',
    growingPeriod: '150-180 days',
    description: 'A soft, fluffy staple fiber mostly grown in regions with long frost-free periods.',
  },
  {
    cropName: 'Maize',
    soilType: ['Loamy', 'Alluvial', 'Red soil'],
    season: ['Kharif', 'Rabi', 'Zaid'],
    temperatureRange: { min: 21, max: 27 },
    fertilizers: ['Urea', 'DAP', 'Zinc Sulphate'],
    waterRequirement: 'Medium',
    growingPeriod: '80-110 days',
    description: 'Also known as corn, a versatile crop cultivated globally for food, fodder, and industrial use.',
  },
  {
    cropName: 'Sugarcane',
    soilType: ['Clay', 'Loamy', 'Black soil'],
    season: ['Kharif', 'All'],
    temperatureRange: { min: 21, max: 35 },
    fertilizers: ['Urea', 'NPK 10-26-26', 'Sulphur'],
    waterRequirement: 'High',
    growingPeriod: '270-365 days',
    description: 'A tall perennial grass species used for sugar production. Requires tropical climate.',
  },
  {
    cropName: 'Millets',
    soilType: ['Sandy', 'Loamy', 'Red soil'],
    season: ['Kharif', 'Zaid'],
    temperatureRange: { min: 26, max: 33 },
    fertilizers: ['Urea', 'SSP'],
    waterRequirement: 'Low',
    growingPeriod: '60-90 days',
    description: 'Drought-resistant small-seeded grains, gaining popularity as a superfood.',
  },
  {
    cropName: 'Tea',
    soilType: ['Laterite', 'Loamy'],
    season: ['All'],
    temperatureRange: { min: 20, max: 30 },
    fertilizers: ['Ammonium Sulphate', 'Rock Phosphate'],
    waterRequirement: 'High',
    growingPeriod: 'Perennial',
    description: 'An evergreen shrub grown in terraced hillsides, requires well-distributed rainfall.',
  },
  {
    cropName: 'Coffee',
    soilType: ['Laterite', 'Loamy'],
    season: ['All'],
    temperatureRange: { min: 15, max: 28 },
    fertilizers: ['Urea', 'DAP', 'MOP'],
    waterRequirement: 'Medium',
    growingPeriod: 'Perennial',
    description: 'Grown in tropical highlands, coffee plants thrive in shade and moderate temperatures.',
  },
  {
    cropName: 'Mustard',
    soilType: ['Loamy', 'Sandy', 'Alluvial'],
    season: ['Rabi', 'Winter'],
    temperatureRange: { min: 10, max: 25 },
    fertilizers: ['Urea', 'SSP', 'Sulphur'],
    waterRequirement: 'Low',
    growingPeriod: '110-140 days',
    description: 'A winter flowering plant primarily cultivated for oil extraction.',
  },
  {
    cropName: 'Groundnut',
    soilType: ['Sandy', 'Loamy', 'Red soil'],
    season: ['Kharif', 'Zaid'],
    temperatureRange: { min: 25, max: 30 },
    fertilizers: ['SSP', 'Gypsum', 'Rhizobium culture'],
    waterRequirement: 'Low',
    growingPeriod: '100-130 days',
    description: 'Also known as peanut, a legume crop grown for its edible seeds and oil.',
  },
  {
    cropName: 'Soybean',
    soilType: ['Loamy', 'Clay', 'Black soil'],
    season: ['Kharif'],
    temperatureRange: { min: 20, max: 30 },
    fertilizers: ['Urea', 'DAP', 'SSP'],
    waterRequirement: 'Medium',
    growingPeriod: '80-120 days',
    description: 'A protein-rich legume widely grown for its edible bean and oil production.',
  },
  {
    cropName: 'Potato',
    soilType: ['Sandy', 'Loamy', 'Alluvial'],
    season: ['Rabi', 'Winter'],
    temperatureRange: { min: 15, max: 20 },
    fertilizers: ['NPK 12-32-16', 'Urea', 'MOP'],
    waterRequirement: 'Medium',
    growingPeriod: '75-120 days',
    description: 'A starchy root vegetable, one of the most important food crops globally.',
  },
  {
    cropName: 'Tomato',
    soilType: ['Loamy', 'Sandy', 'Alluvial'],
    season: ['Rabi', 'Zaid', 'Summer', 'Kharif'],
    temperatureRange: { min: 18, max: 27 },
    fertilizers: ['NPK', 'Calcium Nitrate', 'Boron'],
    waterRequirement: 'Medium',
    growingPeriod: '60-90 days',
    description: 'A versatile vegetable fruit grown across multiple seasons.',
  },
  {
    cropName: 'Onion',
    soilType: ['Loamy', 'Sandy', 'Alluvial'],
    season: ['Rabi', 'Zaid', 'Kharif'],
    temperatureRange: { min: 13, max: 24 },
    fertilizers: ['Urea', 'SSP', 'MOP', 'Sulphur'],
    waterRequirement: 'Medium',
    growingPeriod: '90-120 days',
    description: 'A widely cultivated bulb vegetable used in cuisines worldwide.',
  },
  {
    cropName: 'Gram (Chickpea)',
    soilType: ['Loamy', 'Clay', 'Black soil'],
    season: ['Rabi', 'Winter'],
    temperatureRange: { min: 20, max: 25 },
    fertilizers: ['DAP', 'SSP'],
    waterRequirement: 'Low',
    growingPeriod: '90-120 days',
    description: 'A protein-rich pulse crop grown in winter, important for food security.',
  },
  {
    cropName: 'Tur (Pigeon Pea)',
    soilType: ['Loamy', 'Black soil', 'Alluvial'],
    season: ['Kharif'],
    temperatureRange: { min: 26, max: 30 },
    fertilizers: ['DAP', 'Urea'],
    waterRequirement: 'Low',
    growingPeriod: '120-180 days',
    description: 'A perennial legume, one of the most important pulse crops in tropical regions.',
  },
  {
    cropName: 'Jute',
    soilType: ['Alluvial', 'Loamy'],
    season: ['Kharif', 'Zaid'],
    temperatureRange: { min: 24, max: 37 },
    fertilizers: ['Urea', 'NPK'],
    waterRequirement: 'High',
    growingPeriod: '120-150 days',
    description: 'A natural fiber crop called the "Golden Fiber", used for making burlap and hessian.',
  },
  {
    cropName: 'Rubber',
    soilType: ['Laterite', 'Loamy'],
    season: ['All'],
    temperatureRange: { min: 25, max: 35 },
    fertilizers: ['Urea', 'Rock Phosphate', 'MOP'],
    waterRequirement: 'High',
    growingPeriod: 'Perennial (tapping starts after 7 years)',
    description: 'Extracted from the Para rubber tree, requires hot and humid tropical climate.',
  },
  {
    cropName: 'Barley',
    soilType: ['Loamy', 'Sandy', 'Alluvial'],
    season: ['Rabi', 'Winter'],
    temperatureRange: { min: 12, max: 25 },
    fertilizers: ['Urea', 'DAP'],
    waterRequirement: 'Low',
    growingPeriod: '90-120 days',
    description: 'A hardy cereal grain used for animal feed, brewing, and health foods.',
  },
  {
    cropName: 'Sunflower',
    soilType: ['Loamy', 'Sandy', 'Black soil'],
    season: ['Zaid', 'Rabi', 'Kharif'],
    temperatureRange: { min: 20, max: 25 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    waterRequirement: 'Medium',
    growingPeriod: '80-100 days',
    description: 'An oilseed crop known for its bright flowers, grown for cooking oil production.',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing crops
    await Crop.deleteMany({});
    console.log('🗑️  Cleared existing crops');

    // Insert crops
    const inserted = await Crop.insertMany(crops);
    console.log(`🌱 Successfully seeded ${inserted.length} crops`);

    // Clear existing fertilizers
    await Fertilizer.deleteMany({});
    console.log('🗑️  Cleared existing fertilizers');

    // Insert fertilizers
    const insertedFertilizers = await Fertilizer.insertMany(fertilizers);
    console.log(`🌿 Successfully seeded ${insertedFertilizers.length} fertilizers`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
