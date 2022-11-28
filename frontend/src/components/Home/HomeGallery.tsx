import DS_Card from "./DS_Card";
import HomePageData from "./HomePageData";



const HomeGallery = () => {
  return (
      <section className="container mx-auto px-0 md:px- py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
          {HomePageData.map((element, index) => (
            <DS_Card
              key={index}
              title={element.title}
              image={element.image}
              url = {element.url}
            />
          ))}
        </div>
      </section>

  );
};

export default HomeGallery;
