import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';

const TermsOfService = () => {
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
            <FiFileText className="text-4xl text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Terms of Service</h1>
          </div>

          <p className="text-sm text-gray-500 mb-8">Last Updated: July 9, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using QuickMart's website, mobile application, or services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Service Description</h2>
              <p className="mb-3">
                QuickMart provides an online platform for ordering groceries, fresh produce, daily essentials, and household items with doorstep delivery. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browse and purchase products from our catalog.</li>
                <li>Schedule deliveries at your preferred time slots.</li>
                <li>Track orders in real-time.</li>
                <li>Access exclusive deals and promotional offers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">3. User Eligibility</h2>
              <p className="mb-3">
                To use QuickMart, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age or have parental/guardian consent.</li>
                <li>Provide accurate and up-to-date registration information.</li>
                <li>Comply with all applicable local, state, and national laws.</li>
                <li>Not use the platform for fraudulent or illegal activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Account Registration</h2>
              <p className="mb-3">
                When creating an account:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You agree to notify us immediately of any unauthorized account access.</li>
                <li>You are liable for all activities conducted under your account.</li>
                <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Product Information and Availability</h2>
              <p className="mb-3">
                While we strive for accuracy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product descriptions, images, and prices are subject to change without notice.</li>
                <li>We do not guarantee product availability and reserve the right to substitute items with similar alternatives.</li>
                <li>Weights and quantities may vary slightly from listed specifications (e.g., ±5% for fresh produce).</li>
                <li>Promotional prices and discounts are time-limited and subject to stock availability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">6. Pricing and Payment</h2>
              <p className="mb-3">
                All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment can be made via Cash on Delivery (COD), UPI, Debit/Credit Cards, Net Banking, or Digital Wallets.</li>
                <li>Payment processing is handled securely through Razorpay.</li>
                <li>We reserve the right to cancel orders if payment fails or fraud is suspected.</li>
                <li>Delivery charges may apply based on order value and location.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">7. Delivery Policy</h2>
              <p className="mb-3">
                Our delivery services are subject to the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Delivery times are estimated and may vary due to traffic, weather, or high demand.</li>
                <li>You must provide a valid delivery address and be available to receive the order.</li>
                <li>If no one is available, our delivery partner may attempt to contact you or leave the order at a safe location (at your risk).</li>
                <li>We are not liable for delays caused by circumstances beyond our control (force majeure).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Order Cancellation and Modifications</h2>
              <p className="mb-3">
                Cancellations and modifications:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may cancel your order before it is dispatched for a full refund.</li>
                <li>Once an order is out for delivery, it cannot be cancelled.</li>
                <li>Modifications to order details (address, items) must be requested immediately after placing the order.</li>
                <li>Refunds for cancelled orders will be processed as per our Refund Policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">9. Prohibited Uses</h2>
              <p className="mb-3">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the platform for any unlawful purpose or to violate any laws.</li>
                <li>Attempt to hack, reverse-engineer, or disrupt the platform's functionality.</li>
                <li>Upload malicious code, viruses, or spam content.</li>
                <li>Engage in fraudulent transactions or misuse promotional offers.</li>
                <li>Resell products purchased from QuickMart for commercial purposes without authorization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">10. Intellectual Property</h2>
              <p>
                All content on QuickMart (logos, trademarks, images, text, design) is the property of QuickMart or its licensors. You may not copy, reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">11. Limitation of Liability</h2>
              <p className="mb-3">
                QuickMart is not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages arising from the use of our services.</li>
                <li>Losses due to product unavailability, delayed deliveries, or third-party payment gateway issues.</li>
                <li>Any harm caused by improper use, storage, or consumption of products.</li>
                <li>Damages resulting from unauthorized access to your account due to your negligence.</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                Our maximum liability is limited to the total amount paid by you for the specific order in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless QuickMart, its affiliates, employees, and partners from any claims, damages, or expenses arising from your violation of these Terms of Service or misuse of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">13. Privacy and Data Protection</h2>
              <p>
                Your use of QuickMart is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. Please review it carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">14. Third-Party Services</h2>
              <p>
                QuickMart may integrate with third-party services (e.g., payment gateways, delivery partners, analytics tools). We are not responsible for their terms, policies, or service quality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">15. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting on our website. Continued use of our services after such changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">16. Governing Law and Jurisdiction</h2>
              <p>
                These Terms of Service are governed by the laws of India. Any disputes arising from the use of QuickMart shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">17. Contact Information</h2>
              <p className="mb-3">
                For questions, complaints, or support:
              </p>
              <ul className="space-y-2 ml-4">
                <li><strong>Email:</strong> legal@quickmart.in</li>
                <li><strong>Phone:</strong> +91 85438 38313</li>
                <li><strong>Address:</strong> 12, MG Road, Gandhi Nagar, Bangalore - 560001</li>
              </ul>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
            <p className="text-center text-gray-700 font-semibold">
              By using QuickMart, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
