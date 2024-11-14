const Car = require('../models/Car');

exports.addCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const car = new Car({ user: req.user.id, title, description, tags, images });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error adding car' });
  }
};

exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car details' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const { title, description, tags, images } = req.body;
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;
    car.images = images || car.images;
    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error updating car' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Car not found' });
    }
    await car.remove();
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car' });
  }
};
