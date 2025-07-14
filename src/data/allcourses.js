import velovoLogo from "../assets/velovo.svg";
console.log(velovoLogo);

console.log(velovoLogo);
// ➔ Chemin construit par le bundler (ex: /assets/velovo.12345.svg)

export const allCourses = [
  {
    id: "1",
    title: "Introduction à React",
    description: "Apprenez les bases de React.js avec des exemples pratiques.",
    thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    level: "beginner",
  },
  {
    id: "2",
    title: "JavaScript moderne",
    description: "Comprenez ES6+, async/await, map/filter/reduce.",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    level: "advanced",
  },
  {
    id: "3",
    title: "Tailwind CSS pour les débutants",
    description: "Créez des interfaces belles et responsives avec Tailwind.",
    thumbnail: "https://img.youtube.com/vi/dFgzHOX84xQ/hqdefault.jpg",
    level: "advanced",
  },
  {
    id: "4",
    title: "API REST avec Node.js",
    description: "Construisez des APIs sécurisées avec Express.",
    thumbnail: "https://img.youtube.com/vi/lY6icfhap2o/hqdefault.jpg",
    level: "beginner",
  },
  {
    id: "5",
    title: "PostgreSQL et Prisma",
    description: "Gérez vos bases de données relationnelles efficacement.",
    thumbnail: "https://img.youtube.com/vi/5hzZtqCNQKk/hqdefault.jpg",
    level: "all",
  },
  {
    id: "excel-avance",
    title: "Formation Excel Avancée",
    description: "Maîtrisez Excel du débutant à expert.",
    thumbnail: velovoLogo,
    level: "advanced",
  },
  {
    id: "gestion-projet",
    title: "Gestion de Projet",
    description: "Devenez chef de projet certifié.",
    thumbnail: velovoLogo,
    level: "beginner",
  },
  {
    id: "dev-web",
    title: "Développement Web",
    description: "Construisez des sites modernes avec React et Node.js.",
    thumbnail: velovoLogo,
    level: "advanced",
  },
];
