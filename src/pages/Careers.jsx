import React from "react";

const Careers = () => (
  <div className="max-w-3xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold text-red-700 mb-6">Careers</h1>
    <p className="text-gray-700 mb-5">
      Join our team and help us deliver the best in security and automation solutions. At NAS Technologies, we believe in empowering our employees, fostering learning, and providing a platform to grow your career.
    </p>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why Work With Us?</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
        <li>Collaborative and friendly work environment</li>
        <li>Opportunities to work with latest technology</li>
        <li>Ongoing training and professional development</li>
        <li>Competitive compensation and perks</li>
        <li>Room for career advancement</li>
      </ul>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Open Positions</h2>
      <ul className="list-disc list-inside space-y-4 text-gray-700 ml-4">
        <li>
          <span className="font-semibold">Installation Technician</span>
          <div className="text-sm text-gray-600">
            <p>- Install and configure CCTV, networking, and security hardware</p>
            <p>- Perform on-site assessments and troubleshooting</p>
            <p>- Experience with cabling and networking required</p>
          </div>
        </li>
        <li>
          <span className="font-semibold">Sales Executive</span>
          <div className="text-sm text-gray-600">
            <p>- Develop new customer relationships</p>
            <p>- Explain product features and advantages to clients</p>
            <p>- Experience in B2B/tech sales preferred</p>
          </div>
        </li>
        <li>
          <span className="font-semibold">Support Engineer</span>
          <div className="text-sm text-gray-600">
            <p>- Provide technical support to clients onsite and remotely</p>
            <p>- Troubleshooting and resolving client issues</p>
            <p>- Networking and system administration skills a plus</p>
          </div>
        </li>
      </ul>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">How To Apply</h2>
      <p className="mb-2 text-gray-700">
        To express your interest or apply, send your resume and a brief cover letter to:
      </p>
      <a
        href="mailto:hr@nastechnologies.com"
        className="text-red-600 font-medium underline"
      >
        hr@nastechnologies.com
      </a>
      <p className="mt-2 text-gray-700">
        Please mention the position you are applying for in the subject line.
      </p>
    </section>
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Internships</h2>
      <p className="text-gray-700 mb-2">
        We also offer internships for students and recent graduates interested in gaining practical exposure in the field of security systems, networking, and automation.
      </p>
      <p className="text-gray-700">
        Email us to learn more about internship opportunities and begin your professional journey with us!
      </p>
    </section>
  </div>
);

export default Careers;