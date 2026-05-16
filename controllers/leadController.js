const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();

    res.json(leads);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.updateLeadStatus = async (req, res) => {
  try {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(lead);

  } catch (error) {

    res.status(500).json(error);

  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};