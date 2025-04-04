// components/UserInfoForm.tsx
import React, { useState } from 'react';
import { UserInfo } from '../types';
import Button from './ui/Button';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  initialData?: Partial<UserInfo>;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState<UserInfo>({
    name: initialData.name || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    course: initialData.course || '',
    class: initialData.class || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserInfo, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name as keyof UserInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserInfo, string>> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class/Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-50 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-white mb-4">Your Information</h2>
      <p className="text-gray-400 mb-6">Please provide your details so we can contact you about your order.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1 font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.name ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-1 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="e.g., 0244123456"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1 font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="course" className="block text-gray-300 mb-1 font-medium">
              Course/Program <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.course ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="e.g., Computer Science"
            />
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
          </div>

          <div>
            <label htmlFor="class" className="block text-gray-300 mb-1 font-medium">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.class ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="e.g., CE400 "
            />
            {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" fullWidth>
          Continue to Order Review
        </Button>
      </div>
    </form>
  );
};

export default UserInfoForm;