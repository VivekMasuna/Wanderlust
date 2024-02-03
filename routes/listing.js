const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js"); //
const { listingSchema, reviewSchema } = require("../schema.js"); //
const Listing = require("../models/listing.js"); //
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require('../controllers/listings.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

router.route('/')
.get(wrapAsync(listingController.index)) // Index Route (READ)
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)) // Create Route

// New Route (CREATE)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route('/:id')
.get(wrapAsync(listingController.showListing)) // Show Route (READ)
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) // Update Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)) // Delete Route

// Edit Route (UPDATE)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
