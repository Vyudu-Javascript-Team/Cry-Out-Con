import { motion } from "framer-motion";
import React, { useState } from "react";
import SectionTitle from "./SectionTitle";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/contact@cryoutcon.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  if (isSubmitted) {
    return (
      <motion.section
        className="pt-16 bg-primary/30 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 max-w-lg mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4 text-green-400">
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-green-200">
              Thank you for reaching out. We'll get back to you soon.
            </p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="pt-16 bg-primary/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
      <SectionTitle 
            title="Contact Us"
            subtitle=""
            gradient="from-purple-400 to-purple-600"
          />
        <motion.form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <motion.div className="mb-4" variants={itemVariants}>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white h-32"
              required
            />
          </motion.div>
          <motion.button
            type="submit"
            variants={itemVariants}
            whileHover={isFormValid ? { scale: 1.05 } : {}}
            whileTap={isFormValid ? { scale: 0.95 } : {}}
            className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center
              ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-blue-600/50 text-white/50 cursor-not-allowed"
              }`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactForm;
