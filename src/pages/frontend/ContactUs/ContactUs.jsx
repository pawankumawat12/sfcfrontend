const Contact = () => {
  return (
    <section className="bg-white py-16" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4b2e2b]">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#faf7f5] p-8 rounded-2xl shadow-sm">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]"
              ></textarea>

              <button className="w-full rounded-full bg-[#4b2e2b] py-3 text-white font-semibold hover:bg-[#3a2320] transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg text-[#4b2e2b]">
                Main Shop
              </h3>
              <p className="text-gray-600 mt-2">
        SFC Cafe 
                <br />
                Bajor, Sikar, Rajasthan
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#4b2e2b]">Email</h3>
              <p className="text-gray-600 mt-2">deepak@gmail.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#4b2e2b]">Phone</h3>
              <p className="text-gray-600 mt-2">+91 9001981084</p>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-64">
              <iframe
                title="map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
