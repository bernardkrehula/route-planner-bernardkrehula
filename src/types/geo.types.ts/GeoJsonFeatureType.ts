export type GeoJsonFeature = {
  type: "Feature";
  geometry: {
    type: "Point" | string;
    coordinates: [number, number] | [];
  };
  properties: {
    id: string;
    gid: string;
    layer: string;
    source: string;
    source_id: string;
    name: string;
    confidence: number | null;
    match_type: string;
    accuracy: string;
    country: string;
    country_gid: string;
    country_a: string;
    region: string;
    region_gid: string;
    region_a: string;
    county: string;
    county_gid: string;
    county_a: string;
    continent: string;
    continent_gid: string;
    label: string;
  };
  bbox: [number, number, number, number] | [];
};
