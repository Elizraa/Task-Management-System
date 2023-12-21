const SampleModel = require('../models/sampleModel');

const getAllSamples = async (req, res) => {
  try {
    const samples = await SampleModel.findAll();
    res.json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSample = async (req, res) => {
  const sample = new SampleModel({
    name: req.body.name,
  });

  try {
    const newSample = await sample.save();
    res.status(201).json(newSample);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllSamples, createSample };
