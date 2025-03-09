import { Store, SKU } from '../types';

// Example store data with City and State
export const sampleStores: Store[] = [
  { id: 'ST035', name: 'San Francisco Bay Trends', city: 'San Francisco', state: 'CA' },
  { id: 'ST046', name: 'Phoenix Sunwear', city: 'Phoenix', state: 'AZ' },
  { id: 'ST064', name: 'Dallas Ranch Supply', city: 'Dallas', state: 'TX' },
  { id: 'ST066', name: 'Atlanta Outfitters', city: 'Atlanta', state: 'GA' },
  { id: 'ST073', name: 'Nashville Melody Music Store', city: 'Nashville', state: 'TN' },
  { id: 'ST074', name: 'New York Empire Eats', city: 'New York', state: 'NY' },
  { id: 'ST091', name: 'Denver Peaks Outdoor', city: 'Denver', state: 'CO' },
  { id: 'ST094', name: 'Philadelphia Liberty Market', city: 'Philadelphia', state: 'PA' },
  { id: 'ST097', name: 'Boston Harbor Books', city: 'Boston', state: 'MA' },
  { id: 'ST101', name: 'Austin Vibe Co.', city: 'Austin', state: 'TX' },
  { id: 'ST131', name: 'Los Angeles Luxe', city: 'Los Angeles', state: 'CA' },
  { id: 'ST150', name: 'Houston Harvest Market', city: 'Houston', state: 'TX' },
  { id: 'ST151', name: 'Portland Evergreen Goods', city: 'Portland', state: 'OR' },
  { id: 'ST156', name: 'Chicago Charm Boutique', city: 'Chicago', state: 'IL' },
  { id: 'ST163', name: 'Las Vegas Neon Treasures', city: 'Las Vegas', state: 'NV' },
  { id: 'ST175', name: 'Seattle Skyline Goods', city: 'Seattle', state: 'WA' },
  { id: 'ST176', name: 'Miami Breeze Apparel', city: 'Miami', state: 'FL' },
  { id: 'ST177', name: 'San Diego Wave Surf Shop', city: 'San Diego', state: 'CA' },
  { id: 'ST193', name: "Charlotte Queen's Closet", city: 'Charlotte', state: 'NC' },
  { id: 'ST208', name: 'Detroit Motor Gear', city: 'Detroit', state: 'MI' },
];

export const sampleSKUs: SKU[] = [
  { id: 'sku1', name: 'Cotton Polo Shirt', price: 19.99, cost: 12.79 },
  { id: 'sku2', name: 'Tassel Fringe Handbag', price: 134.99, cost: 82.79 },
  { id: 'sku3', name: 'Minimalist Leather Watch', price: 99.49, cost: 66.19 },
  { id: 'sku4', name: 'Foldable Travel Hat', price: 24.99, cost: 9.66 },
  { id: 'sku5', name: 'Striped Cotton Socks', price: 9.49, cost: 3.56 },
  { id: 'sku6', name: 'Sequin Lined Hooded Coat', price: 149.99, cost: 86.99 },
  { id: 'sku7', name: 'Fleece-Lined Parka', price: 89.49, cost: 52.79 },
  { id: 'sku8', name: 'Perforated Leather Belt', price: 19.99, cost: 10.49 },
  { id: 'sku9', name: 'Yoga Leggings', price: 39.99, cost: 18.99 },
  { id: 'sku10', name: 'Graphic Print T-Shirt', price: 12.49, cost: 6.79 },
  { id: 'sku11', name: 'Luxury Silk Tie', price: 24.99, cost: 11.49 },
  { id: 'sku12', name: 'Satin Embroidered Kimono', price: 79.99, cost: 39.99 },
  { id: 'sku13', name: 'Felt Wide-Brimmed Hat', price: 31.99, cost: 14.99 }
];

export const sampleWeeks: string[] = [
  'Wk 01',
  'Wk 02',
  'Wk 03',
  'Wk 04',
  'Wk 05',
  'Wk 06',
  'Wk 07',
  'Wk 08'
];
