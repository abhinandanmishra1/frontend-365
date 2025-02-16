interface Image {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface MasonryLayoutProps {
  images: Image[];
  columns?: number;
}

const MasonryLayout = ({ images, columns = 4 }: MasonryLayoutProps) => {
  const distributeImages = () => {
    const distributedColumns: Image[][] = Array.from(
      { length: columns },
      () => []
    );

    images.forEach((image, index) => {
      distributedColumns[index % columns].push(image);
    });

    return distributedColumns;
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
      {distributeImages().map((column, columnIndex) => (
        <div key={columnIndex} className="grid gap-6">
          {column.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              {image.category && (
                <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-transparent to-transparent">
                  <span className="text-white text-lg font-semibold mb-4">
                    {image.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Project16() {
  const images = generateImages(12);
  return (
    <div className="container mx-auto px-4 py-8">
      <MasonryLayout images={images} />
    </div>
  );
}

const generateImages = (count: number) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push({
      id: i + 1,
      src: `https://picsum.photos/id/${i + 107}/600/${
        Math.floor(Math.random() * 700) + 300
      }?random=${i}`,
      alt: `Image ${i + 1}`,
      category: `Category ${i % 3 + 1}` // Adding a category for demonstration
    });
  }
  return images;
};