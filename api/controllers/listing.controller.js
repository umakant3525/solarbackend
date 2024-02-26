import ListingData from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js"; 

export const createList = async (req, res, next) => {
  try {
    const newList = new ListingData(req.body);
    const savedList = await newList.save();
    res.status(201).json({ message: "List created successfully", newList: savedList });
  } catch (error) {
    next(error);
  }
};

export const getOneList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await ListingData.findById(id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await ListingData.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const options = { new: true }; 
    const updatedListing = await ListingData.findByIdAndUpdate(id, update, options);
    if (!updatedListing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedListing = await ListingData.findByIdAndDelete(id);
    if (!deletedListing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json({ message: 'Listing deleted successfully', deletedListing });
  } catch (error) {
    next(error);
  }
};
