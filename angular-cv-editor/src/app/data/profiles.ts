import { RawData } from '../models/cv.model';

export interface Profile {
  key: string;
  label: string;
  icon: string;
  short: string;
  styles: string[]; // style keys coherent with the métier
}

export const PROFILES: Profile[] = [
  { key: 'dev', label: 'Développement & IT', icon: 'code', short: 'Full-stack, back, front, mobile', styles: ['min-white', 'min-ink', 'duo-forest', 'duo-linen', 'col-forest', 'col-ink', 'col-sky', 'band-forest'] },
  { key: 'data', label: 'Data & IA', icon: 'chart', short: 'Data scientists, analystes, ML', styles: ['min-white', 'min-sky', 'duo-forest', 'duo-cherry', 'col-forest', 'col-sky', 'band-forest', 'cen-white'] },
  { key: 'devops', label: 'DevOps & Cloud', icon: 'server', short: 'DevOps, SRE, cloud, infra', styles: ['min-ink', 'min-white', 'col-ink', 'col-forest', 'duo-forest', 'band-forest'] },
  { key: 'design', label: 'Design & Produit', icon: 'palette', short: 'UX/UI, product & brand design', styles: ['cen-linen', 'cen-cherry', 'cen-sage', 'band-terra', 'band-sage', 'col-cherry', 'duo-cherry', 'band-linen', 'col-sky', 'min-white'] },
  { key: 'security', label: 'Cybersécurité', icon: 'shield', short: 'SOC, pentest, sécurité SI', styles: ['min-ink', 'col-ink', 'col-forest', 'duo-forest', 'min-white', 'band-forest'] },
  { key: 'pm', label: 'Gestion de projet', icon: 'briefcase', short: 'Chefs de projet, product managers', styles: ['duo-forest', 'duo-linen', 'col-forest', 'col-sky', 'band-forest', 'band-linen', 'min-white', 'cen-white'] },
  { key: 'btp', label: 'Artisanat & BTP', icon: 'wrench', short: 'Manuel : électricien, plombier, BTP', styles: ['min-white', 'min-ink', 'col-forest', 'col-ink', 'duo-forest', 'band-forest'] },
  { key: 'public', label: 'Fonction publique', icon: 'landmark', short: 'Administratif, territorial, État', styles: ['min-white', 'col-forest', 'duo-forest', 'col-ink', 'min-ink', 'band-linen'] },
  { key: 'sante', label: 'Santé & Social', icon: 'heart', short: 'Infirmier, aide-soignant, social', styles: ['col-sky', 'cen-linen', 'duo-linen', 'col-forest', 'band-sage', 'cen-sage', 'min-white'] },
  { key: 'commerce', label: 'Commerce & Vente', icon: 'bag', short: 'Tertiaire : vente, retail, accueil', styles: ['band-forest', 'band-terra', 'cen-cherry', 'cen-linen', 'col-cherry', 'duo-cherry', 'band-sage', 'min-white'] },
];

export const PROFILE_DATA: Record<string, RawData> = {
  dev: {
    fullName: 'Alexandre Martin', title: 'Développeur Full-Stack', email: 'alexandre.martin@email.com', phone: '+33 6 12 34 56 78', location: 'Nantes, France', website: 'github.com/amartin', photo: null,
    summary: "Développeur full-stack avec 7 ans d'expérience dans la conception d'applications web performantes. J'aime les architectures claires, le code testé et les produits qui rendent service.",
    experiences: [
      { role: 'Développeur Full-Stack Senior', company: 'Atelier Lumen', location: 'Nantes', period: "2022 — Aujourd'hui", desc: "Conception d'une plateforme SaaS (React, Node.js) servant 50 000 utilisateurs.\nMigration vers une architecture microservices : -40 % de latence.\nEncadrement technique de 3 développeurs." },
      { role: 'Développeur Back-End', company: 'Studio Verso', location: 'Paris', period: '2019 — 2022', desc: "Conception d'API REST & GraphQL et mise en place de la CI/CD.\nOptimisation de requêtes PostgreSQL sur une base de 10M de lignes." },
      { role: 'Développeur Web', company: 'Maison Édith', location: 'Rennes', period: '2017 — 2019', desc: "Développement de sites e-commerce sur mesure (PHP, Vue.js)." },
    ],
    education: [
      { degree: "Diplôme d'Ingénieur en Informatique", school: 'IMT Atlantique', period: '2014 — 2017', details: 'Spécialité Génie Logiciel & Systèmes distribués.' },
      { degree: 'Classes Préparatoires MP', school: 'Lycée Clemenceau, Nantes', period: '2012 — 2014', details: '' },
    ],
    skills: [
      { name: 'JavaScript / TypeScript', level: 5 }, { name: 'React & Next.js', level: 5 }, { name: 'Node.js', level: 4 },
      { name: 'Python', level: 4 }, { name: 'SQL / PostgreSQL', level: 4 }, { name: 'Docker / Kubernetes', level: 3 }, { name: 'AWS', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Allemand', level: 'Notions' }],
    interests: 'Open source, Échecs, Course à pied, Veille techno',
    links: [{ label: 'Certif. AWS Solutions Architect (2023)', url: '' }, { label: 'GitHub', url: 'github.com/amartin' }, { label: 'LinkedIn', url: 'in/amartin' }],
  },
  data: {
    fullName: 'Inès Bélanger', title: 'Data Scientist', email: 'ines.belanger@email.com', phone: '+33 6 23 45 67 89', location: 'Lyon, France', website: 'github.com/ibelanger', photo: null,
    summary: "Data scientist passionnée par la mise en production de modèles ML utiles. 6 ans à transformer des données brutes en décisions, du notebook au déploiement.",
    experiences: [
      { role: 'Senior Data Scientist', company: 'Atelier Lumen', location: 'Lyon', period: "2021 — Aujourd'hui", desc: "Modèles de prévision de la demande (Python, PyTorch) : +18 % de précision.\nIndustrialisation MLOps (MLflow, Airflow) sur AWS SageMaker.\nMentorat de 2 data analysts." },
      { role: 'Data Scientist', company: 'Studio Verso', location: 'Paris', period: '2019 — 2021', desc: "Systèmes de recommandation et A/B testing à grande échelle.\nDashboards décisionnels (dbt, Looker)." },
      { role: 'Data Analyst', company: 'Maison Édith', location: 'Rennes', period: '2017 — 2019', desc: "Analyses statistiques et reporting automatisé (SQL, Python)." },
    ],
    education: [
      { degree: 'Master Statistiques & Machine Learning', school: 'Sorbonne Université', period: '2015 — 2017', details: 'Mention Très Bien.' },
      { degree: 'Licence Mathématiques Appliquées', school: 'Université Lyon 1', period: '2012 — 2015', details: '' },
    ],
    skills: [
      { name: 'Python', level: 5 }, { name: 'Machine Learning', level: 5 }, { name: 'PyTorch / TensorFlow', level: 4 },
      { name: 'SQL', level: 4 }, { name: 'Spark / Big Data', level: 3 }, { name: 'MLOps', level: 4 }, { name: 'Data Visualisation', level: 4 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Espagnol', level: 'Intermédiaire' }],
    interests: 'Kaggle, Lecture scientifique, Piano, Randonnée',
    links: [{ label: 'Certif. TensorFlow Developer (2022)', url: '' }, { label: 'GitHub', url: 'github.com/ibelanger' }, { label: 'Kaggle', url: 'kaggle.com/ibelanger' }],
  },
  devops: {
    fullName: 'Thomas Réau', title: 'Ingénieur DevOps / SRE', email: 'thomas.reau@email.com', phone: '+33 6 34 56 78 90', location: 'Toulouse, France', website: 'github.com/treau', photo: null,
    summary: "Ingénieur DevOps orienté fiabilité et automatisation. J'industrialise les plateformes cloud, du pipeline CI/CD à l'observabilité, pour des déploiements sereins.",
    experiences: [
      { role: 'Ingénieur SRE', company: 'Atelier Lumen', location: 'Toulouse', period: "2021 — Aujourd'hui", desc: "Migration vers Kubernetes (EKS), 99,98 % de disponibilité.\nInfrastructure as Code (Terraform) et GitOps (ArgoCD).\nRéduction de 60 % du temps de déploiement." },
      { role: 'Ingénieur DevOps', company: 'Studio Verso', location: 'Paris', period: '2018 — 2021', desc: "Pipelines CI/CD (GitLab CI), monitoring (Prometheus, Grafana)." },
      { role: 'Administrateur Systèmes', company: 'Maison Édith', location: 'Bordeaux', period: '2016 — 2018', desc: "Gestion de parcs Linux et automatisation (Bash, Ansible)." },
    ],
    education: [
      { degree: "Diplôme d'Ingénieur Systèmes & Réseaux", school: 'INSA Toulouse', period: '2013 — 2016', details: '' },
      { degree: 'DUT Réseaux & Télécoms', school: 'IUT Bordeaux', period: '2011 — 2013', details: '' },
    ],
    skills: [
      { name: 'Kubernetes', level: 5 }, { name: 'Terraform', level: 5 }, { name: 'AWS / GCP', level: 4 },
      { name: 'Docker', level: 5 }, { name: 'CI/CD', level: 4 }, { name: 'Ansible', level: 4 }, { name: 'Prometheus / Grafana', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }],
    interests: 'Homelab, Domotique, VTT, Café de spécialité',
    links: [{ label: 'Certif. CKA — Kubernetes (2022)', url: '' }, { label: 'Certif. AWS DevOps Pro', url: '' }, { label: 'GitHub', url: 'github.com/treau' }],
  },
  design: {
    fullName: 'Camille Laurent', title: 'Designer Produit & UX', email: 'camille.laurent@email.com', phone: '+33 6 45 67 89 01', location: 'Nantes, France', website: 'camillelaurent.design', photo: null,
    summary: "Designer produit à la croisée du branding et de l'UX. Je transforme des idées sensibles en interfaces claires, chaleureuses et utilisables.",
    experiences: [
      { role: 'Lead Product Designer', company: 'Atelier Lumen', location: 'Nantes', period: "2022 — Aujourd'hui", desc: "Direction du design de l'app mobile, +35 % de rétention.\nMise en place du design system multi-marques.\nEncadrement de 2 designers." },
      { role: 'Product Designer', company: 'Studio Verso', location: 'Paris', period: '2019 — 2022', desc: "Refonte du parcours d'achat e-commerce.\nRecherche utilisateur et tests d'utilisabilité." },
      { role: 'Designer Graphique', company: 'Maison Édith', location: 'Rennes', period: '2017 — 2019', desc: "Identités visuelles et supports print pour 20+ clients." },
    ],
    education: [
      { degree: "Master Design d'Interaction", school: "L'École de Design Nantes", period: '2015 — 2017', details: '' },
      { degree: 'Licence Arts Appliqués', school: 'Université Rennes 2', period: '2012 — 2015', details: '' },
    ],
    skills: [
      { name: 'Figma', level: 5 }, { name: 'Design System', level: 5 }, { name: 'Prototypage', level: 4 },
      { name: 'Recherche UX', level: 4 }, { name: 'Direction artistique', level: 4 }, { name: 'HTML / CSS', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Espagnol', level: 'Intermédiaire' }],
    interests: 'Photographie argentique, Céramique, Typographie, Randonnée',
    links: [{ label: 'Portfolio', url: 'camillelaurent.design' }, { label: 'Dribbble', url: 'dribbble.com/claurent' }, { label: 'LinkedIn', url: 'in/camillelaurent' }],
  },
  security: {
    fullName: 'Sofia Nguyen', title: 'Analyste Cybersécurité', email: 'sofia.nguyen@email.com', phone: '+33 6 56 78 90 12', location: 'Paris, France', website: 'github.com/snguyen', photo: null,
    summary: "Analyste cybersécurité spécialisée en détection et réponse aux incidents. J'aime traquer les menaces, durcir les systèmes et sensibiliser les équipes.",
    experiences: [
      { role: 'Analyste SOC Senior', company: 'Atelier Lumen', location: 'Paris', period: "2021 — Aujourd'hui", desc: "Détection et réponse aux incidents (SIEM Splunk) : -45 % de temps de réponse.\nTests d'intrusion internes et durcissement (CIS).\nThreat hunting et veille CTI." },
      { role: 'Consultante Sécurité', company: 'Studio Verso', location: 'Paris', period: '2019 — 2021', desc: "Audits de sécurité et pentests web (OWASP).\nMise en conformité ISO 27001." },
      { role: 'Administratrice Sécurité', company: 'Maison Édith', location: 'Lille', period: '2017 — 2019', desc: "Gestion des accès, pare-feu et politiques de sécurité." },
    ],
    education: [
      { degree: "Master Sécurité des Systèmes d'Information", school: 'EPITA', period: '2015 — 2017', details: '' },
      { degree: 'Licence Informatique', school: 'Université de Lille', period: '2012 — 2015', details: '' },
    ],
    skills: [
      { name: 'SIEM / Splunk', level: 5 }, { name: "Tests d'intrusion", level: 4 }, { name: 'Réseau / Firewall', level: 4 },
      { name: 'Python', level: 4 }, { name: 'OWASP', level: 4 }, { name: 'ISO 27001', level: 3 }, { name: 'Forensic', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Vietnamien', level: 'Bilingue' }],
    interests: 'CTF, Crochetage, Échecs, Lecture',
    links: [{ label: 'Certif. OSCP (2022)', url: '' }, { label: 'Certif. CEH', url: '' }, { label: 'GitHub', url: 'github.com/snguyen' }],
  },
  pm: {
    fullName: 'Julien Mercier', title: 'Product Manager / Chef de Projet', email: 'julien.mercier@email.com', phone: '+33 6 67 89 01 23', location: 'Lyon, France', website: 'in/jmercier', photo: null,
    summary: "Product manager orienté delivery. Je fais le pont entre métier, design et tech pour livrer des produits utiles, dans les temps et le budget.",
    experiences: [
      { role: 'Product Manager', company: 'Atelier Lumen', location: 'Lyon', period: "2021 — Aujourd'hui", desc: "Pilotage d'une roadmap produit B2B (3 équipes, 12 personnes).\nCadrage, priorisation (RICE) et suivi des KPIs.\n+28 % d'activation en un an." },
      { role: 'Chef de Projet Digital', company: 'Studio Verso', location: 'Paris', period: '2018 — 2021', desc: "Gestion de projets web en agile (Scrum), de l'idéation au lancement." },
      { role: 'Consultant Junior', company: 'Maison Édith', location: 'Lyon', period: '2016 — 2018', desc: "Cadrage fonctionnel et coordination de prestataires." },
    ],
    education: [
      { degree: "Master Management de l'Innovation", school: 'EM Lyon', period: '2014 — 2016', details: '' },
      { degree: 'Licence Économie-Gestion', school: 'Université Lyon 2', period: '2011 — 2014', details: '' },
    ],
    skills: [
      { name: 'Gestion de projet', level: 5 }, { name: 'Agile / Scrum', level: 5 }, { name: 'Roadmap produit', level: 4 },
      { name: 'Jira', level: 4 }, { name: 'Analyse de données', level: 3 }, { name: 'UX Research', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Allemand', level: 'Intermédiaire' }],
    interests: 'Trail, Œnologie, Podcasts produit, Voyage',
    links: [{ label: 'Certif. PSM I — Scrum (2021)', url: '' }, { label: 'Certif. PRINCE2', url: '' }, { label: 'LinkedIn', url: 'in/jmercier' }],
  },
  btp: {
    fullName: 'Lucas Garnier', title: 'Électricien du Bâtiment', email: 'lucas.garnier@email.com', phone: '+33 6 78 90 12 34', location: 'Angers, France', website: 'Permis B — Véhiculé', photo: null,
    summary: "Électricien qualifié avec 8 ans d'expérience en installation et rénovation, du résidentiel au tertiaire. Rigoureux, autonome et attaché à la sécurité et au respect des normes.",
    experiences: [
      { role: "Électricien Chef d'équipe", company: 'Bâti Ouest', location: 'Angers', period: "2020 — Aujourd'hui", desc: "Installation et mise aux normes (NF C 15-100) sur chantiers résidentiels et tertiaires.\nEncadrement d'une équipe de 3 électriciens et apprentis.\nLecture de plans et coordination avec les autres corps de métier." },
      { role: 'Électricien', company: 'Sève Élec', location: 'Nantes', period: '2015 — 2020', desc: "Pose de tableaux, réseaux courants forts et faibles.\nDépannage et maintenance préventive chez les clients." },
      { role: 'Apprenti Électricien', company: 'Maison Édith', location: 'Cholet', period: '2013 — 2015', desc: "Apprentissage sur chantiers neufs et de rénovation." },
    ],
    education: [
      { degree: 'Brevet Professionnel Électricien', school: "CFA d'Angers", period: '2013 — 2015', details: '' },
      { degree: 'CAP Électricien', school: 'Lycée Pro Henri Dunant', period: '2011 — 2013', details: '' },
    ],
    skills: [
      { name: 'Installation électrique', level: 5 }, { name: 'Mise aux normes NF C 15-100', level: 5 }, { name: 'Lecture de plans', level: 4 },
      { name: 'Courants faibles', level: 4 }, { name: 'Dépannage', level: 4 }, { name: 'Sécurité chantier', level: 5 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Notions' }],
    interests: 'Mécanique auto, Football, Bricolage',
    links: [{ label: 'Habilitation électrique B2V / BR à jour', url: '' }, { label: 'CACES Nacelle', url: '' }, { label: 'Permis B', url: '' }],
  },
  public: {
    fullName: 'Nadia Benali', title: 'Secrétaire Administrative', email: 'nadia.benali@email.com', phone: '+33 6 89 01 23 45', location: 'Rennes, France', website: '', photo: null,
    summary: "Agente administrative avec 10 ans d'expérience dans la fonction publique territoriale. Sens du service public, discrétion et maîtrise des procédures administratives.",
    experiences: [
      { role: 'Secrétaire Administrative', company: 'Mairie de Rennes', location: 'Rennes', period: "2018 — Aujourd'hui", desc: "Gestion des dossiers administratifs et accueil du public.\nRédaction de courriers et de comptes rendus de réunion.\nSuivi budgétaire du service (logiciel CIRIL)." },
      { role: "Agente d'accueil", company: 'Conseil Départemental 35', location: 'Rennes', period: '2014 — 2018', desc: "Accueil physique et téléphonique, orientation des usagers.\nClassement et archivage des dossiers." },
      { role: 'Adjointe Administrative', company: 'CCAS', location: 'Vitré', period: '2012 — 2014', desc: "Instruction des demandes d'aide sociale." },
    ],
    education: [
      { degree: 'Concours Adjoint Administratif Territorial', school: 'CDG 35', period: '2012', details: 'Lauréate, catégorie C.' },
      { degree: 'BTS Assistant de Gestion PME-PMI', school: 'Lycée Bréquigny', period: '2010 — 2012', details: '' },
    ],
    skills: [
      { name: 'Rédaction administrative', level: 5 }, { name: 'Accueil du public', level: 5 }, { name: 'Bureautique (Word / Excel)', level: 4 },
      { name: 'Gestion de dossiers', level: 4 }, { name: 'Comptabilité publique', level: 3 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Arabe', level: 'Bilingue' }, { name: 'Anglais', level: 'Intermédiaire' }],
    interests: 'Bénévolat associatif, Lecture, Randonnée',
    links: [{ label: 'Concours Adjoint Administratif (2012)', url: '' }, { label: 'Formation Marchés publics', url: '' }],
  },
  sante: {
    fullName: 'Hélène Faure', title: "Infirmière Diplômée d'État", email: 'helene.faure@email.com', phone: '+33 6 90 12 34 56', location: 'Tours, France', website: '', photo: null,
    summary: "Infirmière D.E. avec 7 ans d'expérience en milieu hospitalier et en clinique. Empathie, sang-froid et rigueur dans le suivi des protocoles de soins.",
    experiences: [
      { role: 'Infirmière D.E.', company: 'CHU de Tours', location: 'Tours', period: "2019 — Aujourd'hui", desc: "Soins en service de médecine interne, suivi de 12 à 15 patients.\nCoordination avec l'équipe médicale et les familles.\nTutorat d'étudiants infirmiers." },
      { role: 'Infirmière', company: 'Clinique Saint-Gatien', location: 'Tours', period: '2016 — 2019', desc: "Soins post-opératoires et préparation des patients au bloc." },
      { role: 'Aide-Soignante', company: 'EHPAD Les Tilleuls', location: 'Blois', period: '2014 — 2016', desc: "Accompagnement des résidents et soins de confort." },
    ],
    education: [
      { degree: "Diplôme d'État d'Infirmier", school: 'IFSI de Tours', period: '2013 — 2016', details: '' },
      { degree: 'Baccalauréat Scientifique', school: 'Lycée Descartes', period: '2013', details: '' },
    ],
    skills: [
      { name: 'Soins infirmiers', level: 5 }, { name: "Gestion de l'urgence", level: 4 }, { name: 'Relation patient', level: 5 },
      { name: "Protocoles d'hygiène", level: 5 }, { name: 'Dossier de soins informatisé', level: 4 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Intermédiaire' }],
    interests: 'Yoga, Course à pied, Cuisine',
    links: [{ label: "Diplôme d'État Infirmier (2016)", url: '' }, { label: 'Inscription Ordre National des Infirmiers', url: '' }],
  },
  commerce: {
    fullName: 'Maxime Roux', title: 'Responsable de Magasin', email: 'maxime.roux@email.com', phone: '+33 6 01 23 45 67', location: 'Bordeaux, France', website: 'in/maximeroux', photo: null,
    summary: "Responsable de magasin avec 9 ans d'expérience dans le retail. Orienté résultats, j'anime les équipes, pilote le chiffre d'affaires et soigne l'expérience client.",
    experiences: [
      { role: 'Responsable de Magasin', company: 'Boutique Lumen', location: 'Bordeaux', period: "2020 — Aujourd'hui", desc: "Management d'une équipe de 8 vendeurs : +15 % de CA en 2 ans.\nGestion des stocks, du merchandising et des plannings.\nSuivi des indicateurs de vente et des objectifs." },
      { role: 'Adjoint Responsable', company: 'Studio Verso Retail', location: 'Toulouse', period: '2016 — 2020', desc: "Animation des ventes et formation des nouveaux vendeurs." },
      { role: 'Conseiller de Vente', company: 'Maison Édith', location: 'Bordeaux', period: '2014 — 2016', desc: "Vente, encaissement et fidélisation client." },
    ],
    education: [
      { degree: 'BTS Management Commercial Opérationnel', school: 'Lycée Montesquieu', period: '2012 — 2014', details: '' },
      { degree: 'Bac Pro Commerce', school: 'Lycée des Métiers', period: '2010 — 2012', details: '' },
    ],
    skills: [
      { name: "Management d'équipe", level: 5 }, { name: 'Techniques de vente', level: 5 }, { name: 'Gestion des stocks', level: 4 },
      { name: 'Merchandising', level: 4 }, { name: 'Relation client', level: 5 }, { name: 'Encaissement', level: 4 },
    ],
    languages: [{ name: 'Français', level: 'Natif' }, { name: 'Anglais', level: 'Courant' }, { name: 'Espagnol', level: 'Notions' }],
    interests: 'Sport collectif, Voyages, Cuisine',
    links: [{ label: 'Formation Management (2019)', url: '' }, { label: 'Permis B', url: '' }],
  },
};
