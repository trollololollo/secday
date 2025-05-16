import React, { useState } from "react";
import { BarChart3, Ticket, LayoutGrid, Users, Minus, Plus } from "lucide-react";

const joueursData = [
  { nom: "Jannik Sinner", pays: "Italie", classement: 1, age: 23, main: "Droitier", genre: "Homme" },
  { nom: "Alexander Zverev", pays: "Allemagne", classement: 2, age: 28, main: "Droitier", genre: "Homme" },
  { nom: "Carlos Alcaraz", pays: "Espagne", classement: 3, age: 22, main: "Droitier", genre: "Homme" },
  { nom: "Taylor Fritz", pays: "Etats-Unis", classement: 4, age: 27, main: "Droitier", genre: "Homme" },
  { nom: "Jack Draper", pays: "Grande-Bretagne", classement: 5, age: 23, main: "Gaucher",  genre: "Homme" },
  { nom: "Novak Djokovic", pays: "Serbie", classement: 6, age: 37, main: "Droitier", genre: "Homme" },
  { nom: "Casper Ruud", pays: "Norvège", classement: 7, age: 26, main: "Droitier", genre: "Homme" },
  { nom: "Alex De Minaur", pays: "Australie", classement: 8, age: 26, main: "Droitier", genre: "Homme" },
  { nom: "Lorenzo Musetti", pays: "Italie", classement: 9, age: 23, main: "Droitier", genre: "Homme" },
  { nom: "Holger Rune",   pays: "Danemark",   classement: 10, age: 22, main: "Droitier", genre: "Homme" },
];

const tribunes = [
  { nom: "Tribune Présidentielle", prix: 250 },
  { nom: "Tribune Est",            prix: 150 },
  { nom: "Tribune Ouest",          prix: 130 },
  { nom: "Tribune Sud",            prix: 120 },
];

const datesDisponibles = [
  "26 mai 2025", "27 mai 2025", "28 mai 2025", "29 mai 2025", "30 mai 2025"
];

const App = () => {
  const [section, setSection]               = useState("billetterie");
  const [handFilter, setHandFilter]         = useState("all");
  const [genderFilter, setGenderFilter]     = useState("all");
  const [countryFilter, setCountryFilter]   = useState("all");
  const [dateChoisie, setDateChoisie]       = useState("");
  const [panier, setPanier]                 = useState([]);
  const [afficherPaiement, setAfficherPaiement]         = useState(false);
  const [afficherFormulaireCarte, setAfficherFormulaireCarte] = useState(false);
  const [infosContact, setInfosContact]     = useState({ nom:"", prenom:"", adresse:"", tel:"", email:"" });
  const [carte, setCarte]                   = useState({ numero:"", nom:"", code:"" });
  const [methodePaiement, setMethodePaiement] = useState("");

  // liste des pays pour le filtre
  const countries = ["all", ...Array.from(new Set(joueursData.map(j => j.pays)))];

  // joueurs filtrés
  const filteredJoueurs = joueursData.filter(j => {
    const okMain    = handFilter === "all" || j.main   === handFilter;
    const okGenre   = genderFilter === "all" || j.genre === genderFilter;
    const okCountry = countryFilter === "all" || j.pays  === countryFilter;
    return okMain && okGenre && okCountry;
  });

  const ajouterAuPanier = item => {
    setPanier(prev => {
      const exist = prev.find(el => el.nom === item.nom);
      if (exist) {
        return prev.map(el =>
          el.nom === item.nom
            ? { ...el, quantite: el.quantite + 1 }
            : el
        );
      }
      return [...prev, { nom: item.nom, prix: item.prix, quantite: 1 }];
    });
  };

  const retirerDuPanier = nom => {
    setPanier(prev =>
      prev
        .map(el =>
          el.nom === nom ? { ...el, quantite: el.quantite - 1 } : el
        )
        .filter(el => el.quantite > 0)
    );
  };

  const totalPrix = panier.reduce((sum, it) => sum + it.prix * it.quantite, 0);

  return (
    <div className="p-6 min-h-screen bg-cover bg-center space-y-8"
      style={{ backgroundImage: "url(https://login.fft.fr/resources/.../background-RG.png)" }}
    >
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <BarChart3 className="w-6 h-6" />
          <h1 className="text-xl font-bold">Roland-Garros 2025</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setSection("stats")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section==="stats"?"bg-orange-600 text-white":"bg-gray-300"}`}>
            <LayoutGrid className="w-4 h-4" /> Statistiques
          </button>
          <button onClick={() => setSection("joueurs")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section==="joueurs"?"bg-orange-600 text-white":"bg-gray-300"}`}>
            <Users className="w-4 h-4" /> Joueurs
          </button>
          <button onClick={() => setSection("billetterie")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 ${section==="billetterie"?"bg-orange-600 text-white":"bg-gray-300"}`}>
            <Ticket className="w-4 h-4" /> Billetterie
          </button>
        </div>
      </header>

      {section === "joueurs" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-bold">Liste des Joueurs</h2>
          <div className="flex gap-4">
            <select value={handFilter} onChange={e=>setHandFilter(e.target.value)} className="border p-1 rounded">
              <option value="all">Tous</option>
              <option value="Droitier">Droitier</option>
              <option value="Gaucher">Gaucher</option>
            </select>
            <select value={genderFilter} onChange={e=>setGenderFilter(e.target.value)} className="border p-1 rounded">
              <option value="all">Tous</option>
              <option value="Homme">Hommes</option>
              <option value="Femme">Femmes</option>
            </select>
            <select value={countryFilter} onChange={e=>setCountryFilter(e.target.value)} className="border p-1 rounded">
              {countries.map((c,i)=><option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Pays</th>
                <th className="p-2 border">Classement</th>
                <th className="p-2 border">Âge</th>
                <th className="p-2 border">Main</th>
              </tr>
            </thead>
            <tbody>
              {filteredJoueurs.map((j,i)=>(
                <tr key={i} className="hover:bg-orange-50">
                  <td className="p-2 border">{j.nom}</td>
                  <td className="p-2 border">{j.pays}</td>
                  <td className="p-2 border text-center">{j.classement}</td>
                  <td className="p-2 border text-center">{j.age}</td>
                  <td className="p-2 border text-center">{j.main}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section === "billetterie" && (
        <div className="bg-white p-6 rounded-xl shadow">
          {!afficherPaiement ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Réserver vos places</h2>
              <div className="mb-4">
                <label>Sélectionner une date :</label>
                <select
                  value={dateChoisie}
                  onChange={e=>setDateChoisie(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">-- Choisir une date --</option>
                  {datesDisponibles.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {tribunes.map(t=>(
                  <div key={t.nom} className="border p-4 rounded shadow flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{t.nom}</h3>
                      <p>{t.prix}€</p>
                    </div>
                    <button
                      onClick={()=>ajouterAuPanier({ nom: t.nom, prix: t.prix })}
                      className="bg-orange-600 text-white px-4 py-2 rounded"
                    >Ajouter</button>
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-bold">Panier</h3>
              {panier.length===0
                ? <p>Votre panier est vide.</p>
                : <>
                    {panier.map(it=>(
                      <div key={it.nom} className="flex justify-between items-center border p-2 rounded mb-2">
                        <span>{it.nom} – {it.prix}€ × {it.quantite}</span>
                        <div className="flex gap-2">
                          <button onClick={()=>retirerDuPanier(it.nom)} className="bg-gray-300 p-1 rounded"><Minus size={16}/></button>
                          <button onClick={()=>ajouterAuPanier(it)} className="bg-gray-300 p-1 rounded"><Plus size={16}/></button>
                        </div>
                      </div>
                    ))}
                    <div className="text-right font-bold">Total : {totalPrix}€</div>
                    <div className="text-right mt-4">
                      <button onClick={()=>setAfficherPaiement(true)}
                        className="bg-orange-600 text-white px-6 py-2 rounded shadow"
                      >Valider le panier</button>
                    </div>
                  </>
              }
            </>
          ) : afficherFormulaireCarte ? (
            <>
              {/* Méthode de paiement… */}
            </>
          ) : (
            <>
              {/* Informations contact + récapitulatif + bouton procéder… */}
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default App;
