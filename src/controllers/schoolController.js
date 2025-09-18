const School = require("../models/School");
const logger = require("../utils/logger");
const { addSchoolSchema,listSchoolsSchema } = require("../utils/validation");



function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


const addSchool = async (req, res) => {
  try {
    logger.info("Adding a new school");
    // Validate request body
    const { error, value } = addSchoolSchema.validate(req.body);
    if (error) {
      logger.error(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    // Insert into DB
    const school = await School.create(value);
    logger.info("School added successfully");
    res.status(201).json({
      message: "School added successfully",
      school
    });
  } catch (err) {
    logger.error("Error adding school:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const listSchools = async (req, res) => {
    logger.info("Listing schools based on proximity");
  try {

    const { error, value } = listSchoolsSchema.validate(req.query);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { latitude, longitude } = value;

    const schools = await School.findAll();
    logger.info(`Found ${schools.length} schools in the database`);

    const schoolsWithDistance = schools.map(school => {
      const distance = getDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school.toJSON(), distance };
    });
    logger.info(`Calculated distances for all schools`)


    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    logger.info(`Sorted schools by distance`);

    res.json(schoolsWithDistance);
  } catch (err) {
    logger.error("Error listing schools:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addSchool, listSchools };