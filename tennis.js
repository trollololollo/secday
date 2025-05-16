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
    {"name": "Alexander Zverev", "country": "Allemagne", "ranking": 2, "age": 28, "hand": "Droitier"},
    {"name": "Carlos Alcaraz", "country": "Espagne", "ranking": 3, "age": 22, "hand": "Droitier"},
    {"name": "Taylor Fritz", "country": "Etats-Unis", "ranking": 4, "age": 27, "hand": "Droitier"},
    {"name": "Jack Draper", "country": "Grande-Bretagne", "ranking": 5, "age": 23, "hand": "Gaucher"},
    {"name": "Novak Djokovic", "country": "Serbie", "ranking": 6, "age": 37, "hand": "Droitier"},
    {"name": "Casper Ruud", "country": "Norvège", "ranking": 7, "age": 26, "hand": "Droitier"},
    {"name": "Alex De Minaur", "country": "Australie", "ranking": 8, "age": 26, "hand": "Droitier"},
    {"name": "Lorenzo Musetti", "country": "Italie", "ranking": 9, "age": 23, "hand": "Droitier"},
    {"name": "Holger Rune", "country": "Danemark", "ranking": 10, "age": 22, "hand": "Droitier"},
    {"name": "Daniil Medvedev", "country": "", "ranking": 11, "age": 29, "hand": "Droitier"},
    {"name": "Tommy Paul", "country": "Etats-Unis", "ranking": 12, "age": 27, "hand": "Droitier"},
    {"name": "Ben Shelton", "country": "Etats-Unis", "ranking": 13, "age": 22, "hand": "Gaucher"},
    {"name": "Arthur Fils", "country": "France", "ranking": 14, "age": 20, "hand": "Droitier"},
    {"name": "Grigor Dimitrov", "country": "Bulgarie", "ranking": 15, "age": 33, "hand": "Droitier"},
    {"name": "Frances Tiafoe", "country": "Etats-Unis", "ranking": 16, "age": 27, "hand": "Droitier"},
    {"name": "Andrey Rublev", "country": "", "ranking": 17, "age": 27, "hand": "Droitier"},
    {"name": "Francisco Cerundolo", "country": "Argentine", "ranking": 18, "age": 26, "hand": "Droitier"},
    {"name": "Stefanos Tsitsipas", "country": "Grèce", "ranking": 19, "age": 26, "hand": "Droitier"},
    {"name": "Tomas Machac", "country": "République tchèque", "ranking": 20, "age": 24, "hand": "Droitier"},
    {"name": "Jakub Mensik", "country": "République tchèque", "ranking": 21, "age": 19, "hand": "Droitier"},
    {"name": "Ugo Humbert", "country": "France", "ranking": 22, "age": 26, "hand": "Gaucher"},
    {"name": "Sebastian Korda", "country": "Etats-Unis", "ranking": 23, "age": 24, "hand": "Droitier"},
    {"name": "Karen Khachanov", "country": "", "ranking": 24, "age": 28, "hand": "Droitier"},
    {"name": "Alexei Popyrin", "country": "Australie", "ranking": 25, "age": 25, "hand": "Droitier"},
    {"name": "Alejandro Davidovich Fokina", "country": "Espagne", "ranking": 26, "age": 25, "hand": "Droitier"},
    {"name": "Felix Auger-Aliassime", "country": "Canada", "ranking": 27, "age": 24, "hand": "Droitier"},
    {"name": "Denis Shapovalov", "country": "Canada", "ranking": 28, "age": 26, "hand": "Gaucher"},
    {"name": "Brandon Nakashima", "country": "Etats-Unis", "ranking": 29, "age": 23, "hand": "Droitier"},
    {"name": "Matteo Berrettini", "country": "Italie", "ranking": 30, "age": 29, "hand": "Droitier"},
    {"name": "Hubert Hurkacz", "country": "Pologne", "ranking": 31, "age": 28, "hand": "Droitier"},
    {"name": "Alex Michelsen", "country": "Etats-Unis", "ranking": 32, "age": 20, "hand": "Droitier"},
    {"name": "Sebastian Baez", "country": "Argentine", "ranking": 33, "age": 24, "hand": "Droitier"},
    {"name": "Flavio Cobolli", "country": "Italie", "ranking": 34, "age": 23, "hand": "Droitier"},
    {"name": "Tallon Griekspoor", "country": "Pays-Bas", "ranking": 35, "age": 28, "hand": "Droitier"},
    {"name": "Giovanni Mpetshi Perricard", "country": "France", "ranking": 36, "age": 21, "hand": "Droitier"},
    {"name": "Matteo Arnaldi", "country": "Italie", "ranking": 37, "age": 24, "hand": "Droitier"},
    {"name": "Jiri Lehecka", "country": "République tchèque", "ranking": 38, "age": 23, "hand": "Droitier"},
    {"name": "Alexandre Muller", "country": "France", "ranking": 39, "age": 28, "hand": "Droitier"},
    {"name": "Nuno Borges", "country": "Portugal", "ranking": 40, "age": 28, "hand": "Droitier"},
    {"name": "Jordan Thompson", "country": "Australie", "ranking": 41, "age": 31, "hand": "Droitier"},
    {"name": "Alejandro Tabilo", "country": "Chili", "ranking": 42, "age": 27, "hand": "Gaucher"},
    {"name": "Gael Monfils", "country": "France", "ranking": 43, "age": 38, "hand": "Droitier"},
    {"name": "Lorenzo Sonego", "country": "Italie", "ranking": 44, "age": 30, "hand": "Droitier"},
    {"name": "Marcos Giron", "country": "Etats-Unis", "ranking": 45, "age": 31, "hand": "Droitier"},
    {"name": "Luciano Darderi", "country": "Italie", "ranking": 46, "age": 23, "hand": "Droitier"},
    {"name": "Miomir Kecmanovic", "country": "Serbie", "ranking": 47, "age": 25, "hand": "Droitier"},
    {"name": "David Goffin", "country": "Belgique", "ranking": 48, "age": 34, "hand": "Droitier"},
    {"name": "Pedro Martinez", "country": "Espagne", "ranking": 49, "age": 28, "hand": "Droitier"},
    {"name": "Zizou Bergs", "country": "Belgique", "ranking": 50, "age": 25, "hand": "Droitier"},
    {"name": "Tomas Martin Etcheverry", "country": "Argentine", "ranking": 51, "age": 25, "hand": "Droitier"},
    {"name": "Quentin Halys", "country": "France", "ranking": 52, "age": 28, "hand": "Droitier"},
    {"name": "Nicolas Jarry", "country": "Chili", "ranking": 53, "age": 29, "hand": "Droitier"},
    {"name": "Gabriel Diallo", "country": "Canada", "ranking": 54, "age": 23, "hand": "Droitier"},
    {"name": "Zhizhen Zhang", "country": "Chine", "ranking": 55, "age": 28, "hand": "Droitier"},
    {"name": "Roberto Bautista Agut", "country": "Espagne", "ranking": 56, "age": 37, "hand": "Droitier"},
    {"name": "Jacob Fearnley", "country": "Grande-Bretagne", "ranking": 57, "age": 23, "hand": "Droitier"},
    {"name": "Benjamin Bonzi", "country": "France", "ranking": 58, "age": 28, "hand": "Droitier"},
    {"name": "Roberto Carballes Baena", "country": "Espagne", "ranking": 59, "age": 32, "hand": "Droitier"},
    {"name": "Camilo Ugo Carabelli", "country": "Argentine", "ranking": 60, "age": 25, "hand": "Droitier"},
    {"name": "Fabian Marozsan", "country": "Hongrie", "ranking": 61, "age": 25, "hand": "Droitier"},
    {"name": "Kei Nishikori", "country": "Japon", "ranking": 62, "age": 35, "hand": "Droitier"},
    {"name": "Francisco Comesana", "country": "Argentine", "ranking": 63, "age": 24, "hand": "Droitier"},
    {"name": "Laslo Djere", "country": "Serbie", "ranking": 64, "age": 29, "hand": "Droitier"},
    {"name": "Joao Fonseca", "country": "Brésil", "ranking": 65, "age": 18, "hand": "Droitier"},
    {"name": "Jaume Munar", "country": "Espagne", "ranking": 66, "age": 28, "hand": "Droitier"},
    {"name": "Mattia Bellucci", "country": "Italie", "ranking": 68, "age": 23, "hand": "Gaucher"},
    {"name": "Damir Dzumhur", "country": "Bosnie-Herzégovine", "ranking": 69, "age": 32, "hand": "Droitier"},
    {"name": "Learner Tien", "country": "Etats-Unis", "ranking": 70, "age": 19, "hand": "Gaucher"},
    {"name": "Daniel Altmaier", "country": "Allemagne", "ranking": 71, "age": 26, "hand": "Droitier"},
    {"name": "Hamad Medjedovic", "country": "Serbie", "ranking": 72, "age": 21, "hand": "Droitier"},
    {"name": "Yunchaokete Bu", "country": "Chine", "ranking": 73, "age": 23, "hand": "Droitier"},
    {"name": "Yoshihito Nishioka", "country": "Japon", "ranking": 74, "age": 29, "hand": "Gaucher"},
    {"name": "Arthur Rinderknech", "country": "France", "ranking": 75, "age": 29, "hand": "Droitier"},
    {"name": "Alexander Bublik", "country": "Kazakhstan", "ranking": 76, "age": 27, "hand": "Droitier"},
    {"name": "Roman Safiullin", "country": "", "ranking": 77, "age": 27, "hand": "Droitier"},
    {"name": "Hugo Gaston", "country": "France", "ranking": 78, "age": 24, "hand": "Gaucher"},
    {"name": "Aleksandar Vukic", "country": "Australie", "ranking": 79, "age": 29, "hand": "Droitier"},
    {"name": "Aleksandar Kovacevic", "country": "Etats-Unis", "ranking": 80, "age": 26, "hand": "Droitier"},
    {"name": "Christopher O'Connell", "country": "Australie", "ranking": 81, "age": 30, "hand": "Droitier"},
    {"name": "Rinky Hijikata", "country": "Australie", "ranking": 82, "age": 24, "hand": "Droitier"},
    {"name": "Corentin Moutet", "country": "France", "ranking": 83, "age": 26, "hand": "Gaucher"},
    {"name": "Botic Van De Zandschulp", "country": "Pays-Bas", "ranking": 85, "age": 29, "hand": "Droitier"},
    {"name": "Raphael Collignon", "country": "Belgique", "ranking": 86, "age": 23, "hand": "Droitier"},
    {"name": "Jan-Lennard Struff", "country": "Allemagne", "ranking": 87, "age": 35, "hand": "Droitier"},
    {"name": "Adam Walton", "country": "Australie", "ranking": 88, "age": 26, "hand": "Droitier"},
    {"name": "Kamil Majchrzak", "country": "Pologne", "ranking": 89, "age": 29, "hand": "Droitier"},
    {"name": "James Duckworth", "country": "Australie", "ranking": 90, "age": 33, "hand": "Droitier"},
    {"name": "Cameron Norrie", "country": "Grande-Bretagne", "ranking": 91, "age": 29, "hand": "Gaucher"},
    {"name": "Vit Kopriva", "country": "République tchèque", "ranking": 92, "age": 27, "hand": "Droitier"},
    {"name": "Jesper De Jong", "country": "Pays-Bas", "ranking": 93, "age": 24, "hand": "Droitier"},
    {"name": "Reilly Opelka", "country": "Etats-Unis", "ranking": 94, "age": 27, "hand": "Droitier"},
    {"name": "Mackenzie Mcdonald", "country": "Etats-Unis", "ranking": 96, "age": 30, "hand": "Droitier"},
    {"name": "Pablo Carreno Busta", "country": "Espagne", "ranking": 98, "age": 33, "hand": "Droitier"},
    {"name": "Mariano Navone", "country": "Argentine", "ranking": 99, "age": 24, "hand": "Droitier"},
    {"name": "Francesco Passaro", "country": "Italie", "ranking": 101, "age": 24, "hand": "Droitier"},
    {"name": "Hugo Dellien", "country": "Bolivie", "ranking": 103, "age": 31, "hand": "Droitier"},
    {"name": "Thiago Monteiro", "country": "Brésil", "ranking": 106, "age": 30, "hand": "Gaucher"},
    {"name": "Jaime Faria", "country": "Portugal", "ranking": 108, "age": 21, "hand": "Droitier"},
    {"name": "Arthur Cazaux", "country": "France", "ranking": 116, "age": 22, "hand": "Droitier"},
    {"name": "Valentin Royer", "country": "France", "ranking": 117, "age": 23, "hand": "Droitier"},
    {"name": "Terence Atmane", "country": "France", "ranking": 119, "age": 23, "hand": "Gaucher"},
    {"name": "Tristan Schoolkate", "country": "Australie", "ranking": 129, "age": 24, "hand": "Droitier"},
    {"name": "Dusan Lajovic", "country": "Serbie", "ranking": 131, "age": 34, "hand": "Droitier"},
    {"name": "Stan Wawrinka", "country": "Suisse", "ranking": 132, "age": 40, "hand": "Droitier"},
    {"name": "Marton Fucsovics", "country": "Hongrie", "ranking": 134, "age": 33, "hand": "Droitier"},
    {"name": "Emilio Nava", "country": "Etats-Unis", "ranking": 137, "age": 23, "hand": "Droitier"},
    {"name": "Sebastian Ofner", "country": "Autriche", "ranking": 143, "age": 29, "hand": "Droitier"},
    {"name": "Pierre-Hugues Herbert", "country": "France", "ranking": 148, "age": 34, "hand": "Droitier"},
    {"name": "Richard Gasquet", "country": "France", "ranking": 160, "age": 38, "hand": "Droitier"},
    {"name": "Jenson Brooksby", "country": "Etats-Unis", "ranking": 166, "age": 24, "hand": "Droitier"},
    {"name": "Emil Ruusuvuori", "country": "Finlande", "ranking": 235, "age": 26, "hand": "Droitier"},
    {"name": "Tomas Martin Etcheverry", "country": "Argentine", "ranking": 51, "age": 25, "hand": "Droitier"},
    {"name": "Quentin Halys", "country": "France", "ranking": 52, "age": 28, "hand": "Droitier"},
    {"name": "Nicolas Jarry", "country": "Chili", "ranking": 53, "age": 29, "hand": "Droitier"},
    {"name": "Gabriel Diallo", "country": "Canada", "ranking": 54, "age": 23, "hand": "Droitier"},
    {"name": "Zhizhen Zhang", "country": "Chine", "ranking": 55, "age": 28, "hand": "Droitier"},
    {"name": "Roberto Bautista Agut", "country": "Espagne", "ranking": 56, "age": 37, "hand": "Droitier"},
    {"name": "Jacob Fearnley", "country": "Grande-Bretagne", "ranking": 57, "age": 23, "hand": "Droitier"},
    {"name": "Benjamin Bonzi", "country": "France", "ranking": 58, "age": 28, "hand": "Droitier"},
    {"name": "Roberto Carballes Baena", "country": "Espagne", "ranking": 59, "age": 32, "hand": "Droitier"},
    {"name": "Camilo Ugo Carabelli", "country": "Argentine", "ranking": 60, "age": 25, "hand": "Droitier"},
    {"name": "Fabian Marozsan", "country": "Hongrie", "ranking": 61, "age": 25, "hand": "Droitier"},
    {"name": "Kei Nishikori", "country": "Japon", "ranking": 62, "age": 35, "hand": "Droitier"},
    {"name": "Francisco Comesana", "country": "Argentine", "ranking": 63, "age": 24, "hand": "Droitier"},
    {"name": "Laslo Djere", "country": "Serbie", "ranking": 64, "age": 29, "hand": "Droitier"},
    {"name": "Joao Fonseca", "country": "Brésil", "ranking": 65, "age": 18, "hand": "Droitier"},
    {"name": "Jaume Munar", "country": "Espagne", "ranking": 66, "age": 28, "hand": "Droitier"},
    {"name": "Mattia Bellucci", "country": "Italie", "ranking": 68, "age": 23, "hand": "Gaucher"},
    {"name": "Damir Dzumhur", "country": "Bosnie-Herzégovine", "ranking": 69, "age": 32, "hand": "Droitier"},
    {"name": "Learner Tien", "country": "Etats-Unis", "ranking": 70, "age": 19, "hand": "Gaucher"},
    {"name": "Daniel Altmaier", "country": "Allemagne", "ranking": 71, "age": 26, "hand": "Droitier"},
    {"name": "Hamad Medjedovic", "country": "Serbie", "ranking": 72, "age": 21, "hand": "Droitier"},
    {"name": "Yunchaokete Bu", "country": "Chine", "ranking": 73, "age": 23, "hand": "Droitier"},
    {"name": "Yoshihito Nishioka", "country": "Japon", "ranking": 74, "age": 29, "hand": "Gaucher"},
    {"name": "Arthur Rinderknech", "country": "France", "ranking": 75, "age": 29, "hand": "Droitier"},
    {"name": "Alexander Bublik", "country": "Kazakhstan", "ranking": 76, "age": 27, "hand": "Droitier"},
    {"name": "Roman Safiullin", "country": "", "ranking": 77, "age": 27, "hand": "Droitier"},
    {"name": "Hugo Gaston", "country": "France", "ranking": 78, "age": 24, "hand": "Gaucher"},
    {"name": "Aleksandar Vukic", "country": "Australie", "ranking": 79, "age": 29, "hand": "Droitier"},
    {"name": "Aleksandar Kovacevic", "country": "Etats-Unis", "ranking": 80, "age": 26, "hand": "Droitier"},
    {"name": "Christopher O'Connell", "country": "Australie", "ranking": 81, "age": 30, "hand": "Droitier"},
    {"name": "Rinky Hijikata", "country": "Australie", "ranking": 82, "age": 24, "hand": "Droitier"},
    {"name": "Corentin Moutet", "country": "France", "ranking": 83, "age": 26, "hand": "Gaucher"},
    {"name": "Botic Van De Zandschulp", "country": "Pays-Bas", "ranking": 85, "age": 29, "hand": "Droitier"},
    {"name": "Raphael Collignon", "country": "Belgique", "ranking": 86, "age": 23, "hand": "Droitier"},
    {"name": "Jan-Lennard Struff", "country": "Allemagne", "ranking": 87, "age": 35, "hand": "Droitier"},
    {"name": "Adam Walton", "country": "Australie", "ranking": 88, "age": 26, "hand": "Droitier"},
    {"name": "Kamil Majchrzak", "country": "Pologne", "ranking": 89, "age": 29, "hand": "Droitier"},
    {"name": "James Duckworth", "country": "Australie", "ranking": 90, "age": 33, "hand": "Droitier"},
    {"name": "Cameron Norrie", "country": "Grande-Bretagne", "ranking": 91, "age": 29, "hand": "Gaucher"},
    {"name": "Vit Kopriva", "country": "République tchèque", "ranking": 92, "age": 27, "hand": "Droitier"},
    {"name": "Jesper De Jong", "country": "Pays-Bas", "ranking": 93, "age": 24, "hand": "Droitier"},
    {"name": "Reilly Opelka", "country": "Etats-Unis", "ranking": 94, "age": 27, "hand": "Droitier"},
    {"name": "Mackenzie Mcdonald", "country": "Etats-Unis", "ranking": 96, "age": 30, "hand": "Droitier"},
    {"name": "Pablo Carreno Busta", "country": "Espagne", "ranking": 98, "age": 33, "hand": "Droitier"},
    {"name": "Mariano Navone", "country": "Argentine", "ranking": 99, "age": 24, "hand": "Droitier"},
    {"name": "Francesco Passaro", "country": "Italie", "ranking": 101, "age": 24, "hand": "Droitier"},
    {"name": "Hugo Dellien", "country": "Bolivie", "ranking": 103, "age": 31, "hand": "Droitier"},
    {"name": "Thiago Monteiro", "country": "Brésil", "ranking": 106, "age": 30, "hand": "Gaucher"},
    {"name": "Jaime Faria", "country": "Portugal", "ranking": 108, "age": 21, "hand": "Droitier"},
    {"name": "Arthur Cazaux", "country": "France", "ranking": 116, "age": 22, "hand": "Droitier"},
    {"name": "Valentin Royer", "country": "France", "ranking": 117, "age": 23, "hand": "Droitier"},
    {"name": "Terence Atmane", "country": "France", "ranking": 119, "age": 23, "hand": "Gaucher"},
    {"name": "Tristan Schoolkate", "country": "Australie", "ranking": 129, "age": 24, "hand": "Droitier"},
    {"name": "Dusan Lajovic", "country": "Serbie", "ranking": 131, "age": 34, "hand": "Droitier"},
    {"name": "Stan Wawrinka", "country": "Suisse", "ranking": 132, "age": 40, "hand": "Droitier"},
    {"name": "Marton Fucsovics", "country": "Hongrie", "ranking": 134, "age": 33, "hand": "Droitier"},
    {"name": "Emilio Nava", "country": "Etats-Unis", "ranking": 137, "age": 23, "hand": "Droitier"},
    {"name": "Sebastian Ofner", "country": "Autriche", "ranking": 143, "age": 29, "hand": "Droitier"},
    {"name": "Pierre-Hugues Herbert", "country": "France", "ranking": 148, "age": 34, "hand": "Droitier"},
    {"name": "Richard Gasquet", "country": "France", "ranking": 160, "age": 38, "hand": "Droitier"},
    {"name": "Jenson Brooksby", "country": "Etats-Unis", "ranking": 166, "age": 24, "hand": "Droitier"},
    {"name": "Emil Ruusuvuori", "country": "Finlande", "ranking": 235, "age": 26, "hand": "Droitier"}
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
      {section === "joueurs" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Liste des Joueurs</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex gap-2 items-center">
              <label>Main :</label>
              <select value={handFilter} onChange={(e) => setHandFilter(e.target.value)} className="border p-1 rounded">
                <option value="all">Tous</option>
                <option value="droitier">Droitier</option>
                <option value="gaucher">Gaucher</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label>Sexe :</label>
              <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border p-1 rounded">
                <option value="all">Tous</option>
                <option value="Homme">Hommes</option>
                <option value="Femme">Femmes</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label>Pays :</label>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="border p-1 rounded">
                <option value="all">Tous</option>
                {countries.map((pays, idx) => <option key={idx} value={pays}>{pays}</option>)}
              </select>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Nom</th><th>Pays</th><th>Classement</th><th>Âge</th><th>Main</th>
              </tr>
            </thead>
            <tbody>
              {filteredJoueurs.map((j, idx) => (
                <tr key={idx} className="border-t">
                  <td>{j.name}</td>
                  <td>{j.country}</td>
                  <td>{j.ranking}</td>
                  <td>{j.age}</td>
                  <td>{j.hand}</td>
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
