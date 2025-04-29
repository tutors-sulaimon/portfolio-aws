import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ContactData } from '../types/Contact';

const API_URL = import.meta.env.VITE_API_BASE_URL;


const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        data: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      };

      const response = await axios.post(`${API_URL}/api/contacts`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        Swal.fire({
          title: 'Success!',
          text: "Thank you for your message! We'll get back to you soon.",
          icon: 'success',
          confirmButtonText: '<span style="padding: 0 20px;">OK</span>',
          confirmButtonColor: '#3b82f6',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error submitting your form. Please try again.',
          icon: 'error',
          confirmButtonText: '<span style="padding: 0 20px;">OK</span>',
          confirmButtonColor: '#3b82f6',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Detailed error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-md text-white font-medium ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;