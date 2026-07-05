/**
 * Seeds the Firestore `products` collection with sample data so you can
 * see the dashboard populated immediately after setup.
 *
 * Usage:
 *   node scripts/seed.mjs
 *
 * Requires a valid .env.local (see .env.local.example) — this script reads
 * the same NEXT_PUBLIC_FIREBASE_* variables via dotenv.
 */
import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleProducts = [
  {
    name: 'Amoxicillin 500mg Capsules',
    category: 'Pharmaceuticals',
    price: 12.5,
    description: 'Broad-spectrum antibiotic capsules, pack of 30, for bacterial infections.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
    manufacturingDate: '2025-01-10',
    expiryDate: '2027-01-10',
    placeOfOrigin: 'Accra, Ghana',
    batchNumber: 'EL-2025-0110',
    stockQuantity: 420,
    availability: 'in-stock',
  },
  {
    name: 'Vitamin C Effervescent Tablets',
    category: 'Wellness',
    price: 8.0,
    description: 'Immune-support effervescent tablets, orange flavor, tube of 20.',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=800',
    manufacturingDate: '2025-03-01',
    expiryDate: '2026-09-01',
    placeOfOrigin: 'Kumasi, Ghana',
    batchNumber: 'EL-2025-0301',
    stockQuantity: 35,
    availability: 'low-stock',
  },
  {
    name: 'Digital Infrared Thermometer',
    category: 'Medical Devices',
    price: 45.0,
    description: 'Non-contact infrared thermometer with fever alert and memory recall.',
    imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800',
    manufacturingDate: '2024-11-15',
    expiryDate: '2029-11-15',
    placeOfOrigin: 'Tema, Ghana',
    batchNumber: 'EL-2024-1115',
    stockQuantity: 60,
    availability: 'in-stock',
  },
];

async function seed() {
  console.log('Seeding products...');
  for (const product of sampleProducts) {
    await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`  ✓ ${product.name}`);
  }
  console.log('Done. Refresh your dashboard to see the sample data.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
