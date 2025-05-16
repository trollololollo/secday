import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3, Ticket, LayoutGrid, Users, Minus, Plus } from "lucide-react";


const joueursData = [
  { nom: "Jannik Sinner", pays: "Italie", classement: 1, age: 23, main: "Droitier" },
  { nom: "Alexander Zverev", pays: "Allemagne", classement: 2, age: 28, main: "Droitier" },
  { nom: "Carlos Alcaraz", pays: "Espagne", classement: 3, age: 22, main: "Droitier" },
  { nom: "Taylor Fritz", pays: "Etats-Unis", classement: 4, age: 27, main: "Droitier" },
  { nom: "Jack Draper", pays: "Grande-Bretagne", classement: 5, age: 23, main: "Gaucher" },
  { nom: "Novak Djokovic", pays: "Serbie", classement: 6, age: 37, main: "Droitier" },
  { nom: "Casper Ruud", pays: "Norvège", classement: 7, age: 26, main: "Droitier" },
  { nom: "Alex De Minaur", pays: "Australie", classement: 8, age: 26, main: "Droitier" },
  { nom: "Lorenzo Musetti", pays: "Italie", classement: 9, age: 23, main: "Droitier" },
  { nom: "Holger Rune", pays: "Danemark", classement: 10, age: 22, main: "Droitier" },
];

const allData = {
  Djokovic: [
    { name: "1er tour", score: 7 },
    { name: "2e tour", score: 6 },
    { name: "1/4 finale", score: 4 },
    { name: "1/2 finale", score: 5 },
    { name: "Finale", score: 6 },
  ],
};

const tribunes = [
  { nom: "Tribune Présidentielle", prix: 250 },
  { nom: "Tribune Est", prix: 150 },
  { nom: "Tribune Ouest", prix: 130 },
  { nom: "Tribune Sud", prix: 120 },
];

const datesDisponibles = [
  "26 mai 2025", "27 mai 2025", "28 mai 2025", "29 mai 2025", "30 mai 2025"
];

const App = () => {
  const [section, setSection] = useState("billetterie");
  const [dateChoisie, setDateChoisie] = useState("");
  const [panier, setPanier] = useState([]);
  const [afficherPaiement, setAfficherPaiement] = useState(false);
  const [afficherFormulaireCarte, setAfficherFormulaireCarte] = useState(false);
  const [infosContact, setInfosContact] = useState({ nom: "", prenom: "", adresse: "", tel: "", email: "" });
  const [carte, setCarte] = useState({ numero: "", nom: "", code: "" });
  const [methodePaiement, setMethodePaiement] = useState("");

  const ajouterAuPanier = (item) => {
    setPanier((prev) => {
      const exist = prev.find((el) => el.nom === item.nom);
      if (exist) {
        return prev.map((el) =>
          el.nom === item.nom ? { ...el, quantite: el.quantite + 1 } : el
        );
      }
      return [...prev, { ...item, quantite: 1 }];
    });
  };

  const retirerDuPanier = (nom) => {
    setPanier((prev) =>
      prev
        .map((el) =>
          el.nom === nom ? { ...el, quantite: el.quantite - 1 } : el
        )
        .filter((el) => el.quantite > 0)
    );
  };

  const totalPrix = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  return (
    <div className="p-6 space-y-8 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(https://login.fft.fr/resources/3bai7/login/fft-iamgdi-reset/build/static/media/background-RG.0087ce54a82d38595a67.png)" }}>
      <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <BarChart3 className="w-6 h-6" />
          <h1 className="text-xl font-bold">Roland-Garros 2025</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setSection("stats")} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section === "stats" ? "bg-orange-600 text-white" : "bg-gray-300"}`}><LayoutGrid className="w-4 h-4" /> Statistiques</button>
          <button onClick={() => setSection("joueurs")} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section === "joueurs" ? "bg-orange-600 text-white" : "bg-gray-300"}`}><Users className="w-4 h-4" /> Joueurs</button>
          <button onClick={() => setSection("billetterie")} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section === "billetterie" ? "bg-orange-600 text-white" : "bg-gray-300"}`}><Ticket className="w-4 h-4" /> Billetterie</button>
        </div>
      </header>

      {section === "billetterie" && (
        <div className="bg-white p-6 rounded-xl shadow">
          {!afficherPaiement ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Réserver vos places</h2>
              <div className="mb-4">
                <label className="block mb-2">Sélectionner une date :</label>
                <select value={dateChoisie} onChange={(e) => setDateChoisie(e.target.value)} className="border p-2 rounded w-full">
                  <option value="">-- Choisir une date --</option>
                  {datesDisponibles.map((date) => (
                    <option key={date}>{date}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {tribunes.map((tribune) => (
                  <div key={tribune.nom} className="border p-4 rounded shadow flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{tribune.nom}</h3>
                      <p>{tribune.prix}€</p>
                    </div>
                    <button onClick={() => ajouterAuPanier(tribune)} className="bg-orange-600 text-white px-4 py-2 rounded">Ajouter</button>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-2">Panier</h3>
              {panier.length === 0 ? (
                <p>Votre panier est vide.</p>
              ) : (
                <div className="space-y-2">
                  {panier.map((item) => (
                    <div key={item.nom} className="flex justify-between items-center border p-2 rounded">
                      <div>
                        {item.nom} - {item.prix}€ x {item.quantite}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => retirerDuPanier(item.nom)} className="px-2 py-1 bg-gray-300 rounded"><Minus size={16} /></button>
                        <button onClick={() => ajouterAuPanier(item)} className="px-2 py-1 bg-gray-300 rounded"><Plus size={16} /></button>
                      </div>
                    </div>
                  ))}
                  <div className="text-right font-bold">Total : {totalPrix}€</div>
                  <div className="text-right">
                    <button onClick={() => setAfficherPaiement(true)} className="mt-4 bg-orange-600 text-white px-6 py-2 rounded shadow">Valider le panier</button>
                  </div>
                </div>
              )}
            </>
          ) : afficherFormulaireCarte ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Méthode de paiement</h3>
              <div className="flex gap-4 mb-6">
                <button onClick={() => setMethodePaiement("carte")} className={`px-4 py-2 rounded ${methodePaiement === "carte" ? "bg-orange-600 text-white" : "bg-gray-300"}`}>Carte de crédit</button>
                <button onClick={() => setMethodePaiement("paypal")} className={`px-4 py-2 rounded ${methodePaiement === "paypal" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>Payer avec PayPal</button>
              </div>

              {methodePaiement === "carte" && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input placeholder="Numéro de carte" className="border p-2 rounded" value={carte.numero} onChange={(e) => setCarte({ ...carte, numero: e.target.value })} />
                  <input placeholder="Nom sur la carte" className="border p-2 rounded" value={carte.nom} onChange={(e) => setCarte({ ...carte, nom: e.target.value })} />
                  <input placeholder="Code de sécurité" className="border p-2 rounded col-span-2" value={carte.code} onChange={(e) => setCarte({ ...carte, code: e.target.value })} />
                  <div className="col-span-2 flex justify-end">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded shadow">Valider le paiement</button>
                  </div>
                </div>
              )}

              {methodePaiement === "paypal" && (
                <div className="text-center">
                  <p className="mb-4">Vous allez être redirigé vers PayPal pour finaliser votre paiement.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded shadow">Continuer vers PayPal</button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-4">Vos informations</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Nom" className="border p-2 rounded" value={infosContact.nom} onChange={(e) => setInfosContact({ ...infosContact, nom: e.target.value })} />
                <input placeholder="Prénom" className="border p-2 rounded" value={infosContact.prenom} onChange={(e) => setInfosContact({ ...infosContact, prenom: e.target.value })} />
                <input placeholder="Adresse" className="border p-2 rounded col-span-2" value={infosContact.adresse} onChange={(e) => setInfosContact({ ...infosContact, adresse: e.target.value })} />
                <input placeholder="Téléphone" className="border p-2 rounded" value={infosContact.tel} onChange={(e) => setInfosContact({ ...infosContact, tel: e.target.value })} />
                <input placeholder="Email" className="border p-2 rounded" value={infosContact.email} onChange={(e) => setInfosContact({ ...infosContact, email: e.target.value })} />
              </div>
              <div className="mt-6">
                <h4 className="font-bold mb-2">Récapitulatif du panier</h4>
                {panier.map((item) => (
                  <div key={item.nom} className="border p-2 rounded mb-1">
                    {item.nom} - {item.quantite} x {item.prix}€
                  </div>
                ))}
                <div className="font-bold mt-2">Total : {totalPrix}€</div>
              </div>
              <div className="text-right mt-4">
                <button className="bg-orange-600 text-white px-6 py-2 rounded shadow" onClick={() => setAfficherFormulaireCarte(true)}>Procéder au paiement</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
