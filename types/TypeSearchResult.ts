export interface RoomDistribution {
    adults: string;
    children: number[];
}

export interface MapBoundingBox {
    sw_long: number;
    sw_lat: number;
    ne_long: number;
    ne_lat: number;
}

export interface Sort {
    name: string;
    id: string;
}

export interface MatchingUnitsCommonConfig {
    localized_area: string;
    unit_type_id: number;
}

export interface MatchingUnitsConfiguration {
    matching_units_common_config: MatchingUnitsCommonConfig;
}

export interface Checkout {
    from: string;
    until: string;
}

export interface Badge {
    id: string;
    text: string;
    badge_variant: string;
}

export interface Bwallet {
    hotel_eligibility: number;
}

export interface Distance {
    icon_set?: any;
    icon_name: string;
    text: string;
}

export interface Checkin {
    until: string;
    from: string;
}

export interface StrikethroughAmountPerNight {
    currency: string;
    value: number;
}

export interface IncludedTaxesAndChargesAmount {
    currency: string;
    value: number;
}

export interface DiscountedAmount {
    currency: string;
    value: number;
}

export interface GrossAmountHotelCurrency {
    value: number;
    currency: string;
}

export interface GrossAmountPerNight {
    currency: string;
    value: number;
}

export interface NetAmount {
    currency: string;
    value: number;
}

export interface ExcludedAmount {
    value: number;
    currency: string;
}

export interface StrikethroughAmount {
    currency: string;
    value: number;
}

export interface GrossAmount {
    currency: string;
    value: number;
}

export interface Base {
    kind: string;
    percentage: number;
    base_amount?: number;
}

export interface ItemAmount {
    value: number;
    currency: string;
}

export interface Item {
    kind: string;
    base: Base;
    details: string;
    item_amount: ItemAmount;
    inclusion_type: string;
    name: string;
    identifier: string;
}

export interface Benefit {
    name: string;
    identifier: string;
    details: string;
    kind: string;
    icon?: any;
    badge_variant: string;
}

export interface AllInclusiveAmount {
    currency: string;
    value: number;
}

export interface Base2 {
    percentage: number;
    kind: string;
    base_amount?: number;
}

export interface ItemAmount2 {
    currency: string;
    value: number;
}

export interface Item2 {
    kind: string;
    details: string;
    base: Base2;
    name: string;
    inclusion_type: string;
    item_amount: ItemAmount2;
    identifier: string;
}

export interface AllInclusiveAmount2 {
    currency: string;
    value: number;
}

export interface Benefit2 {
    details: string;
    name: string;
    identifier: string;
    badge_variant: string;
    icon?: any;
    kind: string;
}

export interface ExcludedAmount2 {
    value: number;
    currency: string;
}

export interface NetAmount2 {
    value: number;
    currency: string;
}

export interface GrossAmountPerNight2 {
    value: number;
    currency: string;
}

export interface IncludedTaxesAndChargesAmount2 {
    value: number;
    currency: string;
}

export interface StrikethroughAmountPerNight2 {
    value: number;
    currency: string;
}

export interface DiscountedAmount2 {
    currency: string;
    value: number;
}

export interface GrossAmountHotelCurrency2 {
    currency: string;
    value: number;
}

export interface GrossAmount2 {
    currency: string;
    value: number;
}

export interface StrikethroughAmount2 {
    currency: string;
    value: number;
}

export interface ProductPriceBreakdown {
    items: Item2[];
    all_inclusive_amount: AllInclusiveAmount2;
    benefits: Benefit2[];
    excluded_amount: ExcludedAmount2;
    net_amount: NetAmount2;
    gross_amount_per_night: GrossAmountPerNight2;
    included_taxes_and_charges_amount: IncludedTaxesAndChargesAmount2;
    strikethrough_amount_per_night: StrikethroughAmountPerNight2;
    discounted_amount: DiscountedAmount2;
    gross_amount_hotel_currency: GrossAmountHotelCurrency2;
    gross_amount: GrossAmount2;
    strikethrough_amount: StrikethroughAmount2;
}

export interface CompositePriceBreakdown {
    strikethrough_amount_per_night: StrikethroughAmountPerNight;
    included_taxes_and_charges_amount: IncludedTaxesAndChargesAmount;
    discounted_amount: DiscountedAmount;
    gross_amount_hotel_currency: GrossAmountHotelCurrency;
    gross_amount_per_night: GrossAmountPerNight;
    net_amount: NetAmount;
    excluded_amount: ExcludedAmount;
    strikethrough_amount: StrikethroughAmount;
    gross_amount: GrossAmount;
    items: Item[];
    benefits: Benefit[];
    all_inclusive_amount: AllInclusiveAmount;
    product_price_breakdowns: ProductPriceBreakdown[];
}

export interface PriceBreakdown {
    has_tax_exceptions: number;
    sum_excluded_raw: string;
    has_incalculable_charges: number;
    has_fine_print_charges: number;
    all_inclusive_price: number;
    gross_price: any;
    currency: string;
}

export interface ExternalReviews {
    num_reviews: number;
    score_word: string;
    score: number;
    should_display: string;
}

export interface BookingHome {
    quality_class: number;
    is_single_unit_property: number;
    segment: number;
    is_booking_home: number;
    group: string;
}

export interface Result {
    accommodation_type_name: string;
    is_city_center: number;
    is_no_prepayment_block: number;
    city_name_en: string;
    min_total_price: number;
    matching_units_configuration: MatchingUnitsConfiguration;
    mobile_discount_percentage: number;
    preferred_plus: number;
    hotel_has_vb_boost: number;
    genius_discount_percentage: number;
    checkout: Checkout;
    native_ad_id: string;
    unit_configuration_label: string;
    badges: Badge[];
    block_ids: string[];
    review_nr?: number;
    is_beach_front: number;
    class_is_estimated: number;
    currency_code: string;
    distance: string;
    main_photo_url: string;
    currencycode: string;
    is_smart_deal: number;
    hotel_id: number;
    has_swimming_pool: number;
    hotel_name: string;
    children_not_allowed: number;
    price_is_final: number;
    review_score?: number;
    distance_to_cc: string;
    bwallet: Bwallet;
    in_best_district: number;
    district: string;
    ufi: number;
    address: string;
    hotel_include_breakfast: number;
    wishlist_count: number;
    hotel_facilities: string;
    type: string;
    native_ads_cpc: number;
    url: string;
    city_in_trans: string;
    is_free_cancellable: number;
    updated_checkin?: any;
    updated_checkout?: any;
    timezone: string;
    accommodation_type: number;
    default_language: string;
    hotel_name_trans: string;
    extended: number;
    is_mobile_deal: number;
    preferred: number;
    zip: string;
    latitude: number;
    class: number;
    distances: Distance[];
    review_score_word: string;
    city_trans: string;
    review_recommendation: string;
    id: string;
    is_geo_rate: any;
    cc1: string;
    checkin: Checkin;
    address_trans: string;
    soldout: number;
    main_photo_id: number;
    selected_review_topic?: any;
    country_trans: string;
    is_genius_deal: number;
    cant_book: number;
    countrycode: string;
    districts: string;
    cc_required: number;
    district_id: number;
    city: string;
    default_wishlist_name: string;
    composite_price_breakdown: CompositePriceBreakdown;
    native_ads_tracking: string;
    price_breakdown: PriceBreakdown;
    longitude: number;
    max_photo_url: string;
    max_1440_photo_url: string;
    external_reviews: ExternalReviews;
    has_free_parking?: number;
    booking_home: BookingHome;
    ribbon_text: string;
}

export interface TypeSearchResult {
    primary_count: number;
    count: number;
    room_distribution: RoomDistribution[];
    map_bounding_box: MapBoundingBox;
    total_count_with_filters: number;
    unfiltered_count: number;
    extended_count: number;
    unfiltered_primary_count: number;
    search_radius: number;
    sort: Sort[];
    result: Result[];
}
