import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const RefundPolicy = () => {
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
            <FiRefreshCw className="text-4xl text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Refund & Return Policy</h1>
          </div>

          <p className="text-sm text-gray-500 mb-8">Last Updated: July 9, 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Return Eligibility</h2>
              <p className="mb-3">
                At QuickMart, we are committed to delivering fresh and quality products. You may be eligible for a return or refund if:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The product is damaged, expired, or defective upon delivery.</li>
                <li>You received the wrong product or incorrect quantity.</li>
                <li>The product quality does not meet expected standards (e.g., rotten fruits/vegetables).</li>
                <li>The product was missing from your order despite being charged.</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>Note:</strong> Perishable items (dairy, meat, fruits, vegetables) must be reported within 2 hours of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Non-Returnable Items</h2>
              <p className="mb-3">
                The following items cannot be returned or refunded:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products that have been used, opened, or tampered with.</li>
                <li>Personal care items for hygiene reasons (unless defective or damaged).</li>
                <li>Change of mind or dissatisfaction with taste (unless product is spoiled).</li>
                <li>Orders placed more than 48 hours ago (non-perishables).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">3. How to Request a Refund</h2>
              <p className="mb-3">
                To request a refund or return:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact our customer support team within the eligibility period.</li>
                <li>Provide your order ID, product details, and photographic evidence of the issue.</li>
                <li>Our team will review your request within 24 hours.</li>
                <li>If approved, we will arrange for product pickup (if required) and process your refund.</li>
              </ol>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-semibold text-blue-800">Contact Support:</p>
                <p className="text-blue-700">📧 Email: support@quickmart.in</p>
                <p className="text-blue-700">📞 Phone: +91 85438 38313</p>
                <p className="text-blue-700">⏰ Hours: 6:00 AM - 11:00 PM (Daily)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">4. Refund Processing Time</h2>
              <p className="mb-3">
                Once your refund request is approved:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cash on Delivery (COD):</strong> Refund will be credited to your bank account or as QuickMart wallet credits within 5-7 business days.</li>
                <li><strong>Online Payments (UPI, Card, Razorpay):</strong> Refund will be processed to the original payment method within 5-10 business days.</li>
                <li><strong>Wallet Credits:</strong> Instant credit to your QuickMart wallet for future purchases.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">5. Replacement Policy</h2>
              <p>
                If a product is defective or damaged, you may choose a replacement instead of a refund (subject to availability). Replacements are typically delivered within 24-48 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">6. Partial Refunds</h2>
              <p>
                In cases where only a portion of your order is affected (e.g., one item is damaged), we will refund only the amount corresponding to the affected item(s) plus proportional delivery charges if applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">7. Cancellation Policy</h2>
              <p className="mb-3">
                You may cancel your order:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Before Dispatch:</strong> Full refund within 2-3 business days.</li>
                <li><strong>After Dispatch:</strong> Order cannot be cancelled. You may refuse delivery for a full refund (minus delivery fee).</li>
                <li><strong>Prepaid Orders:</strong> Refund will be processed to the original payment method or as wallet credits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">8. Quality Assurance</h2>
              <p>
                QuickMart partners with trusted suppliers and follows strict quality checks. However, if you're consistently dissatisfied with product quality, please reach out to our team so we can improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">9. Exceptions and Force Majeure</h2>
              <p>
                QuickMart reserves the right to modify this refund policy. In cases of natural disasters, government restrictions, or supply chain disruptions, refund timelines may be extended, and we will notify you accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">10. Dispute Resolution</h2>
              <p>
                If you're not satisfied with our refund decision, you may escalate the matter by emailing escalations@quickmart.in. We aim to resolve all disputes within 7 business days.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Thank you for shopping with QuickMart. Your satisfaction is our priority!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
