import React from 'react';

const AddressForm = ({ formData, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange('name')}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange('email')}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange('phone')}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        placeholder="Delivery Address"
        value={formData.address}
        onChange={handleChange('address')}
        required
        rows="3"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange('pincode')}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default AddressForm;
