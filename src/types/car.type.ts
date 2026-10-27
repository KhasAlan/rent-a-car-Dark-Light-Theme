export type Car =  {
    id: string;
    brand: string;
    brandSlug: string;
    model: string;
    year: number;
    type: string;
    seats: number;
    transmission: string;
    fuelType: string;
    pricePerDay: number;
    image: string;
    features: string[];

    rating?: number;
    topSpeed?: number;
    doors?: number;
    wifi?: boolean;
    sensor?: boolean;
    bluetooth?: string;
  }

  export type CarBrand = {
    name: string;
    slug: string;
    image: {
      source: string;
      thumb: string;
      optimized: string;
      original: string;
      localThumb: string;
      localOptimized: string;
      localOriginal: string;
    };
  }