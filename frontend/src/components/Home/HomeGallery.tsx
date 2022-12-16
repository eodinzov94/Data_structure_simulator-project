import DsCard from "./DsCard";
import HomePageData from "./HomePageData";



const HomeGallery = () => {
  return (
      <section className="container mx-auto px-0 md:px- py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 justify-items-center gap-12">
          {HomePageData.map((element, index) => (
            <DsCard
              key={index}
              title={element.title}
              image={element.image}
              gif={element.gif}
              url = {element.url}
              description = {element.description}
            />
          ))}
        </div>
      </section>

  );
};

export default HomeGallery;
