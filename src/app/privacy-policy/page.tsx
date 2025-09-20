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
                    We operate on a principle of data minimization. We do not require user registration, and therefore we **do not directly collect any personally identifiable information (PII)** such as your name, email address, or wallet address. Our goal is to understand how our Service performs, not who you are.
                </p>
                
                <h3>Anonymous Performance and Usage Data</h3>
                <p>
                    To maintain and improve our Service, we collect anonymous, non-personally identifiable information through the following methods:
                </p>
                <ul>
                    <li><strong>Web Server Logs:</strong> Standard server logs which may include your IP address, browser type, and pages visited. This is used for monitoring the security and health of our infrastructure.</li>
                    <li><strong>Analytics Services:</strong> We use third-party services, such as Vercel Speed Insights, to gather real-world performance data from your browser. This data includes metrics like page load speed and Core Web Vitals. This information is anonymized and aggregated, and is not used to personally identify or track you across different websites.</li>
                </ul>


                <h2>2. How We Use Information</h2>
                <p>
                    The anonymous and aggregated data we collect is used solely for the following purposes:
                </p>
                <ul>
                    <li>To operate, maintain, and improve the performance and user experience of the Service.</li>
                    <li>To monitor for security threats and prevent abuse.</li>
                    <li>To analyze usage trends and identify which features are most popular.</li>
                    <li>To diagnose and fix technical errors.</li>
                </ul>

                <h2>3. Cookies</h2>
                <p>
                    We do not use tracking cookies for advertising or cross-site profiling. Our hosting provider (Vercel) and the Next.js framework may use essential cookies for the basic functioning of the website, such as for caching and performance optimization.
                </p>

                <h2>4. Data Sharing</h2>
                <p>
                    We do not sell, trade, or otherwise transfer your information to outside parties, except as described in this policy. We may share aggregated, anonymous data with the third-party service providers mentioned below for the sole purpose of improving our Service.
                </p>

                <h2>5. Third-Party Services</h2>
                <p>
                    Our Service is hosted on Vercel and utilizes its analytics tools (Speed Insights). Vercel's data collection and use are governed by its own privacy policy. We rely on Vercel's commitment to handle this data in an anonymous and privacy-preserving manner.
                </p>
                <p>
                    Additionally, our Service interacts with the public Polymarket API to display market data. We do not share any user information with Polymarket. Your interactions with the Polymarket website via links from our Service are subject to Polymarket's own Terms of Service and Privacy Policy.
                </p>

                <h2>6. Data Security</h2>
                <p>
                    We implement reasonable security measures to maintain the safety of the anonymous data we collect. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>

                <h2>7. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>

                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at: contact@polyleviathan.com.
                </p>
            </div>
        </div>
    );
}