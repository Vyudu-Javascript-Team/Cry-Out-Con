import SectionTitle from "./SectionTitle";

const DiveIn = () => {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container md:max-w-5xl mx-auto px-8 space-y-6">
        <SectionTitle
          title="GET READY TO CRY OUT"
          gradient="from-pink-500 via-purple-500 to-blue-500"
        />
        <p className="text-xl">
          Cry Out is dedicated to fostering a profound practice of surrender and
          submission, leading us on a transformative journey of healing and
          restoration. Through the exercise of faith, courage, and wisdom, and a
          fervent desire to manifest inner strength, we create the atmosphere
          needed for every person to discover and unleash their inherent
          abilities, gifts, and talents.
        </p>
        <p className="text-xl">
          Fostered in a space of intentional action, Cry Out brings each of us
          closer to God in authentic recognition of His Spirit and an unwavering
          desire to shift the seasons of life. Through the act of “Crying Out,”
          we inspire a resolute commitment to embrace a higher calling, overcome
          obstacles, and ascend to a destiny of beautiful purpose and spiritual
          fulfillment.
        </p>
      </div>
    </section>
  );
};

export default DiveIn;
