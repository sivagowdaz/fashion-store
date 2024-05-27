import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { useLocation } from "react-router";
import PageLayout from "../components/PageLayout";
import styles from "../styles/products.module.scss";
import ProductsSearchBar from "../components/ProductsSearchBar";
import Logo from "../components/Logo";
import { productInfo } from "../utils/types";
import ProductCard from "../components/ProductCard";
import { generateRandomString } from "../utils/helpers";
import Filters from "../components/Filters";
import { brands } from "../utils/treding_titles";
import { getPhotos } from "../utils/helpers";
import { PriceRange } from "../utils/types";

interface RelatedWordsComponentProps {}

const Products: React.FC<RelatedWordsComponentProps> = () => {
    let { state } = useLocation();
    const [word, setWord] = useState<string>(state.searchKey);
    const productsRef = useRef<productInfo[]>([]);
    const [products, setProducts] = useState<productInfo[]>([]);

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<
        PriceRange[]
    >([]);

    useEffect(() => {
        getRelatedWords(word);
    }, [word]);

    const getRelatedWords = async (
        word: string,
        maxResults = 25
    ): Promise<void> => {
        try {
            const response = await axios.get<{ word: string }[]>(
                `https://api.datamuse.com/words?ml=${word}%20garments&max=${maxResults}`
            );
            const photosRes = await getPhotos(25, word);
            let productsArr = response.data.map((item, index) => {
                const product_id = generateRandomString(10);
                const price = faker.datatype.number({ min: 200, max: 3000 });
                const discoutnPercentage = faker.datatype.number({
                    min: 5,
                    max: 20,
                });
                const discountedPrice =
                    price - Math.floor((discoutnPercentage * price) / 100);
                const ratting = faker.datatype.number({ min: 1, max: 5 });
                const totalRatting = faker.datatype.number({
                    min: 20,
                    max: 1000,
                });
                const randomIndex = Math.floor(Math.random() * brands.length);
                const brand_name = brands[randomIndex];
                const url = photosRes.photos[index]["src"]["original"];
                return {
                    product_id,
                    url,
                    title: item.word,
                    price,
                    discountedPrice,
                    ratting,
                    isFav: false,
                    totalRatting,
                    brand: brand_name,
                };
            });
            productsRef.current = productsArr;
            setProducts(productsArr);
        } catch (error) {
            console.error("Error fetching related words:", error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setWord(e.target.value);
    };

    const addToFav = (product_id: string): void => {
        const productsTmp = products.map((product) => {
            if (product.product_id === product_id) {
                product.isFav = !product.isFav;
                return product;
            }
            return product;
        });
        setProducts(productsTmp);
    };

    const getBrandsList = () => {
        let brands = Array.from(
            new Set(products.map((product) => product.brand))
        );
        return brands;
    };

    const getPriceRange = () => {
        const maxPrice = products.reduce(
            (acc, product) => Math.max(acc, product.discountedPrice),
            0
        );
        const rangeStep = 500;
        const rangeCount = Math.ceil(maxPrice / rangeStep);

        const priceRanges = Array.from(
            { length: rangeCount },
            (_, index) => index * rangeStep
        );

        function processRange(rangeStart: number) {
            const rangeEnd = rangeStart + rangeStep - 1;
            return {
                label: `${rangeStart} to ${rangeEnd}`,
                min: rangeStart,
                max: rangeEnd,
            };
        }

        const processedRanges = priceRanges.map(processRange);

        return processedRanges;
    };

    const handleSearch = (): void => {
        getRelatedWords(word);
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const handleRatingChange = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating]
        );
    };

    const handlePriceRangeChange = (range: PriceRange) => {
        setSelectedPriceRanges((prev) =>
            prev.map((pr) => pr.label).includes(range.label)
                ? prev.filter((r) => r.label !== range.label)
                : [...prev, range]
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchBrand = selectedBrands.length
            ? selectedBrands.includes(product.brand)
            : true;
        const matchRating = selectedRatings.length
            ? selectedRatings.includes(product.ratting)
            : true;
        const matchPrice = selectedPriceRanges.length
            ? selectedPriceRanges.some(
                  (range) =>
                      product.price >= range.min && product.price <= range.max
              )
            : true;
        return matchBrand && matchRating && matchPrice;
    });

    return (
        <PageLayout>
            <div className={styles.products_page}>
                <Logo />

                <div className={styles.search_section}>
                    <ProductsSearchBar
                        onChangeHandler={handleChange}
                        handleSearch={handleSearch}
                    />
                </div>
                <p className={styles.search_results_text}>Search Results</p>
                <div className={styles.products_section}>
                    <div className={styles.filter}>
                        <Filters
                            brands={getBrandsList()}
                            priceRanges={getPriceRange()}
                            handleBrandChange={handleBrandChange}
                            handleRatingChange={handleRatingChange}
                            handlePriceRangeChange={handlePriceRangeChange}
                            selectedBrands={selectedBrands}
                            selectedRatting={selectedRatings}
                            selectedPriceRanges={selectedPriceRanges}
                        />
                    </div>
                    <div className={styles.products}>
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                addToFav={addToFav}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Products;
