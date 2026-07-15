import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition"
        >
          <FiArrowLeft />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="text-4xl text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Privacy Policy</h1>
          </div>

          <p className="text-sm text-gray-500 mb-8">Last Updated: July 9, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                QuickMart collects the following information to provide you with seamless grocery delivery services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address.</li>
                <li><strong>Payment Information:</strong> Payment method details processed securely through Razorpay.</li>
                <li><strong>Order History:</strong> Products purchased, order dates, and delivery preferences.</li>
                <li><strong>Device Information:</strong> IP address, browser type, and device details for security purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and deliver your orders efficiently.</li>
                <li>Send order confirmations, delivery updates, and promotional offers.</li>
                <li>Improve our services and personalize your shopping experience.</li>
                <li>Prevent fraud and ensure platform security.</li>
                <li>Comply with legal obligations and regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Data Sharing and Disclosure</h2>
              <p className="mb-3">
                QuickMart does not sell or rent your personal information to third parties. We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Delivery partners, payment processors (Razorpay), and cloud storage providers.</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and user safety.</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no online transmission is 100% secure, and we encourage you to use strong passwords.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
              <p className="mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, update, or delete your personal information.</li>
                <li>Opt-out of marketing communications.</li>
                <li>Request data portability or restriction of processing.</li>
                <li>Lodge a complaint with relevant data protection authorities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies before sharing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Children's Privacy</h2>
              <p>
                QuickMart does not knowingly collect information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The "Last Updated" date will reflect the most recent changes. Continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">10. Contact Us</h2>
              <p className="mb-3">
                For questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-2 ml-4">
                <li><strong>Email:</strong> privacy@quickmart.in</li>
                <li><strong>Phone:</strong> +91 85438 38313</li>
                <li><strong>Address:</strong> 12, MG Road, Gandhi Nagar, Bangalore - 560001</li>
              </ul>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              By using QuickMart, you agree to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
