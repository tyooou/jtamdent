export default function AboutSection() {
  return (
    <div className="text-black flex flex-col items-center p-10 gap-10 md:gap-20 md:flex-row">
      <div>
        <img
          src="/jaidyn-tam.jpg"
          alt="Jaidyn Tam"
          className="w-100 h-100 mx-auto"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">about jaidyn tam</h1>
        <p className="mt-4 text-lg max-w-2xl">
          jaidyn tam is a photographer with over seven years of experience and a
          background in dentistry. He specialises in creating high-quality
          dental content designed for marketing and professional branding.
          <br />
          <br /> His work focuses on producing compelling visuals that
          strengthen the online presence of dental practices and highlight their
          clinical expertise. With his combined knowledge of dentistry and
          photography, Jayden brings a precise and creative approach to every
          project. His aim is to support dental professionals in presenting
          their work with clarity and impact, ensuring their practices stand out
          in an increasingly competitive digital environment.
        </p>
        <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-lg">
          contact me
        </button>
      </div>
    </div>
  );
}
