// src/app/privacy-policy/page.tsx
// IMPORTANT: This is a general template and not legal advice. 
// You should consult with a legal professional to ensure it meets your specific needs.

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 text-gray-300">
            <div className="prose prose-invert prose-lg max-w-none">
                <h1>Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last Updated: September 20, 2025</p>

                <p>
                    PolyLeviathan ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information in connection with your use of our website and services (the "Service").
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We do not require user registration, and therefore we **do not collect any direct personally identifiable information (PII)** such as your name, email address, or wallet address. Our goal is to provide our Service with a strong focus on user privacy.
                </p>
                <p>
                    However, to operate and improve our Service, we utilize analytics tools provided by our hosting platform, Vercel. Through these tools, we may collect certain information about your visit. This information is processed in a way that is not directly tied to your personal identity. The types of data collected include:
                </p>
                <ul>
                    <li><strong>Usage Data:</strong> This includes the pages you visit, the duration of your visit, the links you click on, and the paths you take through our Service.</li>
                    <li><strong>Device and Browser Information:</strong> This includes your device type (e.g., desktop, mobile), operating system, browser type, and screen resolution.</li>
                    <li><strong>Geographic Information:</strong> Your general geographic location (e.g., country and city) is derived from your IP address, but your specific IP address is anonymized.</li>
                    <li><strong>Referral Information:</strong> The source from which you accessed our Service (e.g., a direct link, a search engine, or another website).</li>
                    <li><strong>Performance Metrics (Speed Insights):</strong> We collect data on the performance of our website, such as page load times, to diagnose and fix technical issues. This data is aggregated and does not identify individual users.</li>
                </ul>

                <h2>2. How We Use Information</h2>
                <p>
                    The data collected through Vercel Analytics and Speed Insights is used exclusively for the following purposes:
                </p>
                <ul>
                    <li>To operate, maintain, and improve the performance and user experience of our Service.</li>
                    <li>To understand how users interact with our website so we can make more informed decisions about features and design.</li>
                    <li>To monitor for security threats, prevent abuse, and ensure the stability of our infrastructure.</li>
                    <li>To generate aggregated, anonymous statistical reports about our user base and traffic patterns.</li>
                </ul>

                <h2>3. Cookies and Tracking Technologies</h2>
                <p>
                    Our Service, through Vercel Analytics, uses a small, privacy-focused tracking script. This script **does not use cookies**. It identifies unique user sessions for a 24-hour period based on a hash of the incoming request details, without storing any information on your device. This allows us to count unique visitors without long-term tracking.
                </p>
                <p>
                    The Next.js framework itself may use essential cookies for the basic functioning of the website.
                </p>

                <h2>4. Third-Party Services</h2>
                <p>
                    Our Service is hosted on Vercel, which provides the analytics and speed insights functionality described in this policy. For more information on how Vercel handles data, you can review the <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.
                </p>
                <p>
                    Our Service also interacts with the public Polymarket API to display market data. We do not share any user information with Polymarket. Your interactions with the Polymarket website via links from our Service are subject to Polymarket's own Terms of Service and Privacy Policy.
                </p>

                <h2>5. Data Security</h2>
                <p>
                    We rely on the security measures implemented by our hosting provider, Vercel, to protect the data collected. While reasonable security measures are in place, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>

                <h2>6. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at: contact@polyleviathan.com.
                </p>
            </div>
        </div>
    );
}