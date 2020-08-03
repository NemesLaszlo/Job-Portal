const express = require('express');
const router = express.Router();
const db = require('../database/database');
const Job = require('../models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET All Job
router.get('/', (req, res) => {
  Job.findAll()
    .then((jobs) => {
      res.render('jobs', {
        jobs,
      });
    })
    .catch((err) => res.render('error', { error: err }));
});

// GET Display add Job form
router.get('/add', (req, res) => {
  res.render('add');
});

// POST Add a Job
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: 'Please add a title!' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies!' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description!' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email!' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lovercase and move space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Job.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((job) => res.redirect('/jobs'))
      .catch((err) => res.render('error', { error: err }));
  }
});

// GET Search for jobs
router.get('/search', (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();

  Job.findAll({
    where: { technologies: { [Op.like]: '%' + term + '%' } },
  })
    .then((jobs) => res.render('jobs', { jobs }))
    .catch((err) => res.render('error', { error: err }));
});

module.exports = router;
