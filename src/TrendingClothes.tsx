import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import axios from 'axios';

interface Clothing {
  type: string;
  image: string;
}

const TrendingClothes: React.FC = () => {
  const [clothes, setClothes] = useState<Clothing[]>([]);

  useEffect(() => {
    const generateClothes = async () => {
      const clothesTypes: string[] = [
        'Buggy Pants',
        'White Formal Suit',
        'Pattern Dresses',
        'Casual T-Shirts',
        'Denim Jackets',
        'Leather Boots',
        'Sweatshirts',
        'Sports Jerseys',
        'Floral Skirts',
        'Bomber Jackets',
        'Slim Fit Jeans',
        'Cropped Hoodies',
        'Polo Shirts',
        'Plaid Shirts',
        'Chino Shorts',
        'Maxi Dresses',
        'Blazers',
        'Ankle Boots',
        'Graphic Tees',
        'Ripped Jeans',
        'Blouses',
        'Leather Jackets',
        'Sneakers',
        'Track Pants',
        'Shift Dresses',
        'Cargo Pants',
        'Cardigans',
        'Loafers',
        'Wrap Dresses',
        'Khaki Pants',
        'Peacoats'
      ];

      const getRandomClothes = (): Clothing[] => {
        return Array.from({ length: 15 }).map(() => {
          const type = clothesTypes[Math.floor(Math.random() * clothesTypes.length)];
          return {
            type,
            image: `https://source.unsplash.com/featured/?${type.replace(/\s+/g, '-')}`
          };
        });
      };

      const generatedClothes = getRandomClothes();
      setClothes(generatedClothes);
    };

    generateClothes();
  }, []);

  return (
    <div>
      <h1>Trending Clothes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {clothes.map((clothing, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img
              src={clothing.image}
              alt={clothing.type}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <p>{clothing.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingClothes;
