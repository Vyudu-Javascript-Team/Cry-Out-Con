import image from "../assets/images/NYE_AD24.png";

const AIsection = () => {
  return (
    <section className="pb-16 relative w-full px-5 flex justify-center items-center">
      <div className="max-w-3xl mx-auto">
        <img
          src={image}
          alt="AI logo"
          className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        />
      </div>
    </section>
  );
};

export default AIsection;
