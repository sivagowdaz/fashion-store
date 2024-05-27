export interface SuggestedItemType {
    url: string;
    title: string
}

export interface productInfo  {
    product_id: string,
    url: string,
    title: string,
    price: number,
    discountedPrice: number,
    ratting: number,
    isFav: boolean,
    totalRatting:number,
    brand:string
}

export interface FilterDrawerState {
    brandFilter: boolean;
    priceFilter: boolean;
    rattingFilter: boolean;
}

export interface PriceRange {
    label: string;
    min: number;
    max: number;
}
