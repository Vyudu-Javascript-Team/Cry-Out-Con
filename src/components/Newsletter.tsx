const Newsletter = () => {
  return (
    <section className="bg-gray-50 w-full py-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">GET UPDATES</h2>
        <p className="text-lg md:text-2xl text-gray-600 mb-8">
          Subscribe to get Cry Out Con updates and news.
        </p>
        <a
          href="https://church.us21.list-manage.com/subscribe/post?u=2275ae8790aa41fd369c663db&amp;id=0756e57c7f&amp;v_id=317&amp;f_id=004486e6f0"
          target="_blank"
          className="px-6 py-3 md:text-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-colors disabled:bg-purple-300"
        >
          SUBSCRIBE
        </a>
      </div>
    </section>
  );
};

export default Newsletter;
