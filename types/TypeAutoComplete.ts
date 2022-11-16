export interface Geometry {
    coordinates: number[];
    type: string;
}

export interface Datasource {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
}

export interface Timezone {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
}

export interface Rank {
    importance: number;
    confidence: number;
    match_type: string;
}

export interface Properties {
    country: string;
    city: string;
    postcode: string;
    county: string;
    street: string;
    name: string;
    state: string;
    datasource: Datasource;
    country_code: string;
    lon: number;
    lat: number;
    state_code: string;
    district: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    timezone: Timezone;
    result_type: string;
    rank: Rank;
    place_id: string;
}

export interface Feature {
    geometry: Geometry;
    type: string;
    properties: Properties;
    bbox: number[];
}

export interface Query {
    text: string;
}

export interface ITypeAutoComplete {
    type: string;
    features: Feature[];
    query: Query;
}
