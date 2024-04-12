import "dotenv/config";
import mongoose from 'mongoose';
import Category from './models/Category.js';

const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017';

mongoose.connect(MONGO_DB_URI)
 .then(() => {
    console.log('Verbunden mit MongoDB.');
    
    const Categorys = [
        { name: 'Auto',
        icon: 'fa-solid fa-car'},
        { name: 'Bankgebühren',
        icon: 'fa-solid fa-sack-dollar'},
        { name: 'Beauty',
        icon: 'fa-solid fa-spa'},
        { name: 'Bücher',
        icon: 'fa-solid fa-book'},
        { name: 'Dienstleistungen',
        icon: 'fa-solid fa-bell-concierge' },
        { name: 'Elektronik',
        icon: 'fa-solid fa-laptop'},
        { name: 'Energie',
        icon: 'fa-solid fa-lightbulb' },
        { name: 'Freizeit',
        icon: 'fa-solid fa-face-grin-wide'},
        { name: 'Gesundheit',
        icon: 'fa-solid fa-staff-snake'},
        { name: 'Geschenke',
        icon: 'fa-solid fa-gift' },
        { name: 'Haushalt',
        icon: 'fa-solid fa-house-chimney-user' },
        { name: 'Internet',
        icon: 'fa-solid fa-wifi'},
        { name: 'Kleidung',
        icon: 'fa-solid fa-shirt'},
        { name: 'Lebensmittel',
        icon: 'fa-solid fa-basket-shopping'},
        { name: 'Miete',
        icon: 'fa-solid fa-house-chimney-window'},
        { name: 'Mobilfunk',
        icon: 'fa-solid fa-mobile'},
        { name: 'Musik',
        icon: 'fa-solid fa-music'},
        { name: 'Online-Shopping',
        icon: 'fa-solid fa-cart-shopping'},
        { name: 'Parkgebühren',
        icon: 'fa-solid fa-square-parking'},
        { name: 'Reisen',
        icon: 'fa-solid fa-plane'},
        { name: 'Schule',
        icon: 'fa-solid fa-school'},
        { name: 'Sport',
        icon: 'fa-solid fa-table-tennis-paddle-ball'},
        { name: 'Urlaub',
        icon: 'fa-solid fa-umbrella-beach'},
        { name: 'Versicherung',
        icon: 'fa-solid fa-car-burst'},
    ];

    Category.insertMany(Categorys)
      .then(() => {
         console.log('Kategorien erfolgreich hinzugefügt.');
         mongoose.disconnect();
      })
      .catch((error) => {
         console.error("Fehler beim Einfügen von Testdaten:", error);
         mongoose.disconnect();
       });
 })
      .catch((error) => {
         console.error('Fehler beim Verbinden mit MongoDB:', error);
 });