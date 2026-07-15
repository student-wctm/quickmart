import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    allowedPincode: {
      type: String,
      default: '', // Empty string means "Open Mode" - no restrictions
      trim: true,
    },
    storeName: {
      type: String,
      default: 'QuickMart',
    },
    storePhone: {
      type: String,
      default: '',
    },
    storeEmail: {
      type: String,
      default: '',
    },
    storeLocation: {
      latitude: {
        type: Number,
        default: 26.8467, // Default: Lucknow, India
      },
      longitude: {
        type: Number,
        default: 80.9462,
      },
      address: {
        type: String,
        default: '',
      },
    },
    deliveryRadius: {
      type: Number,
      default: 10, // Default 10km delivery radius
    },
    deliveryFee: {
      type: Number,
      default: 40,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    // Ensure only one settings document exists
    singleton: {
      type: Boolean,
      default: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to get settings (creates if doesn't exist)
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne({ singleton: true });
  
  if (!settings) {
    settings = await this.create({ singleton: true });
  }
  
  return settings;
};

// Static method to update settings
settingsSchema.statics.updateSettings = async function (updates) {
  let settings = await this.findOne({ singleton: true });
  
  if (!settings) {
    settings = await this.create({ singleton: true, ...updates });
  } else {
    Object.assign(settings, updates);
    await settings.save();
  }
  
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
