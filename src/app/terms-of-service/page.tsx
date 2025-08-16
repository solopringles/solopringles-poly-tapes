// src/app/terms-of-service/page.tsx

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-gray-300">
      <div className="prose prose-invert prose-lg max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-sm text-gray-500">Last Updated: August 15, 2025</p>

        <p>
          This Terms of Service ("Terms") is a binding legal agreement between you, the user, and the operators of PolyLeviathan ("we," "us," or "the Service"). These Terms govern your access to and use of the website and any related services. By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h2>1. Description of Service</h2>
        <p>
          PolyLeviathan is an informational platform that aggregates and displays data obtained from the public Polymarket API for analytical purposes. The Service is not a trading platform, a financial institution, or a wallet service. It does not custody funds, execute trades, or provide financial advice. PolyLeviathan is an independent, third-party tool and is not affiliated with Polymarket.
        </p>

        <h2>2. No Financial Advice</h2>
        <p>
          <strong>ALL DATA AND INFORMATION PROVIDED BY POLYLEVIATHAN IS FOR INFORMATIONAL PURPOSES ONLY.</strong> It does not constitute financial advice, investment advice, or trading advice. You are solely responsible for conducting your own due diligence and consulting a qualified financial advisor before making any investment decisions.
        </p>

        <h2>3. Data Accuracy and Availability</h2>
        <p>
          All market data is sourced from third-party APIs. We do not guarantee the accuracy, timeliness, or completeness of any information displayed. Data may be delayed or contain errors. Always verify information on the official Polymarket website before making any financial commitment. The Service is provided on an "as is" and "as available" basis.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL THE OPERATORS OF POLYLEVIATHAN BE LIABLE FOR ANY DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS OR DATA, RESULTING FROM YOUR USE OR INABILITY TO USE THE SERVICE, OR FROM ANY FINANCIAL DECISIONS MADE BASED ON INFORMATION VIEWED ON THE SERVICE.
        </p>

        <h2>5. Prohibited Uses</h2>
        <p>
          You agree not to use the Service to engage in illegal activities, perform automated data collection (scraping) that places an unreasonable load on our infrastructure, or attempt to disrupt or compromise the Service.
        </p>

        <h2>6. Modification of Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. It is your responsibility to review these Terms periodically for changes.
        </p>
        
        <h2>7. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at: contact@polyleviathan.com.
        </p>
      </div>
    </div>
  );
}