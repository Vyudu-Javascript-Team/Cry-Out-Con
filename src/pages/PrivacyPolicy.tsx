
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-gray-200"
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Personal Information that We Collect from You</h2>
            <p className="mb-4">
              By registering with, or providing personal information to, the Site, as well as providing permission to receive marketing offers, 
              users allow us and our affiliates to make their personally identifiable information available to third parties in accordance with 
              the terms of this Privacy Policy.
            </p>
            <p>
              While on the Site, we may collect "Personal Information" from you. For the purposes of this Privacy Policy, Personal Information 
              shall mean individually identifiable information from or about an individual including, but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>your full name</li>
              <li>mailing address</li>
              <li>e-mail address</li>
              <li>phone number</li>
              <li>credit card information</li>
              <li>gender</li>
              <li>year of birth</li>
              <li>date of birth</li>
              <li>any other information requested by us on the applicable registration form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Your IP Address</h2>
            <p className="mb-4">
              Each time that you visit the Site, our web server automatically recognizes your IP address and the web page from which you came. 
              Your IP address is used to help identify you and to gather broad demographic information about you.
            </p>
            <p>
              We also use your IP address to help diagnose problems with our servers, to administer the Site, and to better serve you in using 
              the products, services, and other features associated with the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Cookies and Action Tags</h2>
            <h3 className="text-xl font-semibold mb-2 text-white">Cookies:</h3>
            <p className="mb-4">
              The first time that a user provides an e-mail address in connection with his/her activities at the Site, we assign an identification 
              number to that e-mail address and deploy a cookie to the applicable user's PC. Whenever that user comes back to the Site using the 
              same PC, the cookie allows the Site to identify the user and to recall the user's e-mail address.
            </p>
            <p className="mb-4">
              If, at any time, a user provides other information in connection with his/her activities on the Site (such as name, address, birth date, 
              gender, etc.), we may store that information, along with the user's e-mail address, in our user database. We may use the information 
              stored in our database:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
              <li>to effectuate the purpose or transaction for which the information was originally provided by a user</li>
              <li>to pre-populate information fields in the event that user wishes to purchase products and/or services or sign up for and/or subscribe to services, promotions or other offers in the future</li>
              <li>to ensure that a user will not be repeatedly exposed to the same advertisements, offers and/or promotions while visiting the Site</li>
              <li>to, in connection with regular communication with a user, include offers, promotions, or advertisements that were historically, or are likely to be, of interest to that user</li>
            </ul>
            <p>
              We also use cookies to anonymously track and target the interests of our users to further enhance the experience on the Site.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-white">Action Tags, Web Beacons and other Data Collection Methods:</h3>
            <p className="mb-4">
              An action tag or a web-beacon (also known as a clear gif or a pixel tag) is a method used to track responses or actions by visitors 
              who view certain advertisements or other information on the Site. Action tags are 1×1 pixel images embedded in a website page that 
              are used to transparently collect information.
            </p>
            <p className="mb-4">
              We may use action tags to count the number of times that visitors click on a particular banner ad or visit the pages of the Site 
              and to provide information about what products/services are viewed or purchased.
            </p>
            <p>
              We reserve the right to retain this cookie and action tag data indefinitely. At no time will we share cookie-related, 
              action-tag-related and/or generated information and/or data with third parties.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
