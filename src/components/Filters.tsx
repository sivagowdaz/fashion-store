import React, { useState } from "react";
import FilterTitle from "./FilterTitle";
import GetStars from "./GetStars";
import styles from "../styles/filter.module.scss";
import { FilterDrawerState } from "../utils/types";
import { PriceRange } from "../utils/types";

interface FilterProps {
    brands: string[];
    priceRanges: PriceRange[];
    handleBrandChange: (brand: string) => void;
    handleRatingChange: (ratting: number) => void;
    handlePriceRangeChange: (priceRange: PriceRange) => void;
    selectedBrands: string[];
    selectedRatting: number[];
    selectedPriceRanges: PriceRange[];
}

function Filters({
    brands,
    priceRanges,
    handleBrandChange,
    handleRatingChange,
    handlePriceRangeChange,
    selectedBrands,
    selectedRatting,
    selectedPriceRanges,
}: FilterProps) {
    const [filterDrawerState, setFilterDrawerStates] = useState({
        brandFilter: true,
        priceFilter: true,
        rattingFilter: true,
    });

    const toogleFilterDrawers = (drawer: keyof FilterDrawerState) => {
        setFilterDrawerStates((prevState) => ({
            ...prevState,
            [drawer]: !prevState[drawer],
        }));
    };

    return (
        <div className={styles.filter_container}>
            <div className={styles.brand_filter}>
                <FilterTitle
                    type="brandFilter"
                    title="brands"
                    toggleDrower={toogleFilterDrawers}
                />
                {
                    filterDrawerState.brandFilter &&
                    <div className={styles.filter_keys}>

                        {brands.map((brand, index) => {
                            return (
                                <div key={index} className={styles.filter_box}>
                                    <input
                                        className={styles.checkbox}
                                        checked={selectedBrands.includes(brand)}
                                        type="checkbox"
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    <p className={styles.value_label}>{brand}</p>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
            <div className={styles.border}></div>
            <div className={styles.price_filter}>
                <FilterTitle
                    type="priceFilter"
                    title="Price"
                    toggleDrower={toogleFilterDrawers}
                />
                {
                    filterDrawerState.priceFilter && 
                    <div className={styles.filter_keys}>

                        {priceRanges.map((priceRange, index) => (
                            <div key={index} className={styles.filter_box}>
                                <input
                                className={styles.checkbox}
                                    checked={selectedPriceRanges.map((pr)=>pr.label).includes(priceRange.label)}
                                    onChange={() => handlePriceRangeChange(priceRange)}
                                    type="checkbox"
                                />
                                <p className={styles.value_label}>
                                    <span>{priceRange.label}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className={styles.border}></div>
            <div className={styles.ratting_filter}>
                <FilterTitle
                    type="rattingFilter"
                    title="Brand"
                    toggleDrower={toogleFilterDrawers}
                />
                {
                    filterDrawerState.rattingFilter && 
                    <div className={styles.filter_keys}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className={styles.filter_box}>
                                <input
                                className={styles.checkbox}
                                    checked={selectedRatting.includes(index + 1)}
                                    onChange={() => handleRatingChange(index + 1)}
                                    type="checkbox"
                                />
                                <GetStars ratting={index + 1} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Filters;
