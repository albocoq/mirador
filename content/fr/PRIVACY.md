# Politique de confidentialité d'Altalaya

**Dernière mise à jour :** 22 septembre 2026

Altalaya est une carte communautaire de points de vue (miradors). Cette politique explique quelles données nous collectons, pourquoi, et comment vous pouvez les contrôler.

**Notre principe :** nous ne vendons pas vos données. Nous n'inventons pas de fausses statistiques. Nous utilisons vos informations uniquement pour faire fonctionner l'application et protéger la communauté.

---

## 1. À qui s'applique cette politique

Cette politique couvre :

- L'application mobile Altalaya (iOS et Android) et les services backend associés que nous opérons
- Ce site public (pages légales, liens de téléchargement APK et pages web associées à Altalaya)

Si vous n'acceptez pas cette politique, veuillez ne pas utiliser l'application ni le site.

---

## 2. Données que nous collectons

### Informations de compte

Lorsque vous créez un compte (e-mail ou connexion Google), nous pouvons stocker :

- Adresse e-mail
- Nom d'affichage et nom d'utilisateur
- Photo de profil (si vous en ajoutez une)
- Bio (si vous en ajoutez une)
- Identifiants d'authentification fournis par notre fournisseur d'auth (Supabase / Google)
- Statut Early Founder (`is_founder`) si vous soutenez volontairement le projet via notre lien de paiement

### Contenu que vous créez (UGC)

Lorsque vous ajoutez un spot, une photo ou du texte, nous stockons :

- Titre, description et tags du spot
- Photos que vous téléversez (sélectionnées dans votre photothèque)
- Emplacement du spot que vous choisissez de publier (coordonnées et infos de lieu que vous fournissez)
- Horodatages et paternité pour que les autres voient qui a partagé quoi

Avant l'envoi, les photos peuvent être **redimensionnées et compressées sur votre appareil** (côté client) pour réduire la taille et la bande passante. Nous n'utilisons pas votre photothèque pour autre chose que les médias que vous choisissez explicitement d'envoyer.

Vous pouvez supprimer votre propre contenu à tout moment depuis l'application. La suppression le retire de la vue publique ; des sauvegardes peuvent conserver des copies résiduelles pendant une courte période pour la sécurité et la récupération.

### Spots enregistrés

Si vous enregistrez (ajoutez aux favoris) un mirador, nous stockons cette association sur votre compte pour synchroniser votre liste « Guardados » entre sessions. Les listes enregistrées sont privées à votre compte, sauf si vous publiez ensuite du contenu associé.

### Localisation de votre appareil

Nous demandons la **localisation uniquement pendant que vous utilisez l'application** (premier plan / « when in use »).

Nous l'utilisons strictement pour :

- Centrer la carte sur votre zone actuelle
- Calculer l'azimut solaire / les aides à l'heure dorée sur la carte

Nous pouvons **mettre en cache la dernière position connue sur l'appareil** (stockage local sécurisé) pour rouvrir la carte plus vite. Ce cache reste sur votre appareil et n'est ni vendu ni utilisé à des fins publicitaires.

Nous ne faisons **pas** :

- De suivi de localisation en arrière-plan
- D'enregistrement continu de vos déplacements sur nos serveurs
- De vente ou partage de votre position en direct avec des annonceurs

Vous pouvez refuser ou révoquer l'autorisation de localisation dans les réglages de l'appareil. L'application fonctionnera toujours, mais le centrage de la carte et les aides solaires peuvent être limités.

### Préférences et session sur l'appareil

Stockés localement sur votre appareil (ex. Expo SecureStore), non vendus :

- Jetons de session d'auth nécessaires pour rester connecté
- Préférence de type de carte (standard / satellite / terrain)
- Cache de dernière position connue (voir ci-dessus)

### Données techniques et d'usage

Pour garder le service fiable et sécurisé, nous pouvons traiter :

- Type d'appareil, version de l'OS et version de l'app
- Journaux de plantage / d'erreurs
- État basique de connectivité réseau (ex. bannière hors ligne)
- Jetons de session nécessaires pour rester connecté

### Commentaires que vous envoyez

Si vous utilisez « Enviar comentarios » dans Réglages, votre appareil ouvre votre client e-mail. Ce que vous écrivez et envoyez est traité comme une correspondance e-mail ordinaire. Nous ne parcourons pas silencieusement votre boîte mail.

### Signalements et blocages (sécurité UGC)

Lorsque vous signalez un spot ou bloquez un autre utilisateur dans l'app, nous stockons le minimum nécessaire pour appliquer vos préférences et modérer la communauté :

- **Signalements de spots :** `reporter_id`, `spot_id`, `reason` (texte libre optionnel) et un horodatage
- **Blocages d'utilisateurs :** `blocker_id`, `blocked_id` et un horodatage

L'accès est protégé par la **sécurité au niveau des lignes (RLS)** sur Supabase afin que :

- Vous puissiez créer et gérer **vos propres** signalements et blocages
- Les autres utilisateurs ne puissent pas lire votre liste de blocage privée ni vos signalements comme un graphe social
- Les opérateurs / outils de modération puissent examiner les signalements pour protéger la communauté

**Comment nous utilisons ces données :**

- **Blocages :** masquer les spots de cet utilisateur sur **votre** vue carte (et surfaces associées qui respectent votre liste)
- **Signalements :** file d'attente pour revue de modération ; un signalement ne **supprime pas** à lui seul le contenu pour tout le monde

### Cartes

Les tuiles cartographiques et services associés sont fournis par Google Maps (via `react-native-maps`). Lorsque la carte se charge, Google peut recevoir des données techniques selon la [politique de confidentialité de Google](https://policies.google.com/privacy). Nous ne contrôlons pas le traitement indépendant de Google.

### Ce site — cookies et analytique

Ce site est distinct de l'application mobile. Sur le site, nous pouvons utiliser :

- **Stockage strictement nécessaire** — par exemple mémoriser votre choix de cookies analytiques dans le navigateur (`localStorage`). Cela sert à respecter votre décision et ne vous suit pas sur d'autres sites.
- **Google Analytics 4 (GA4)** — **uniquement si vous acceptez** via la bannière cookies. Si vous refusez (ou avant de choisir), nous ne chargeons **pas** les scripts Google Analytics et nous n'envoyons **pas** d'événements analytiques.

Lorsque l'analytique est acceptée, Google peut traiter des données telles que :

- Pages vues et parcours de navigation approximatifs sur ce site
- Événements que nous configurons (ouverture du menu de téléchargement APK, clics Drive ou VirusTotal, navigation Confidentialité/Conditions, contact, etc.)
- Localisation approximative dérivée de l'IP (pays / région), infos techniques appareil / navigateur, et source de référencement
- Identifiants en ligne (y compris cookies ou identifiants clients similaires utilisés par Google Analytics)

**Finalité :** comprendre comment les visiteurs utilisent ce site (trafic, engagement, liens utiles) pour l'améliorer. Nous n'utilisons **pas** Google Analytics sur ce site pour de la publicité personnalisée.

**Base légale (UE/EEE/UK le cas échéant) :** consentement. Vous pouvez retirer votre consentement à tout moment via **Paramètres cookies** dans le pied de page (ou en effaçant les données du site dans le navigateur). Le retrait n'affecte pas la licéité du traitement antérieur.

**Conservation :** la rétention Google Analytics suit le réglage configuré dans notre propriété GA4 (généralement en mois). Votre choix de consentement est stocké localement dans le navigateur jusqu'à modification ou suppression.

**Transferts internationaux :** Google peut traiter des données analytiques sur des serveurs hors UE/EEE (y compris aux États-Unis). Le traitement Google est décrit dans la [politique de confidentialité de Google](https://policies.google.com/privacy) et les conditions Google Analytics. Le cas échéant, ces transferts s'appuient sur des garanties appropriées proposées par Google (par ex. clauses contractuelles types).

**Vos choix :** Accepter ou Refuser dans la bannière ; modifier plus tard via Paramètres cookies ; utiliser aussi les contrôles du navigateur / extensions d'opt-out. Bloquer l'analytique n'empêche pas l'accès aux pages Confidentialité, Conditions ou liens de téléchargement.

### Soutien volontaire (Early Founder)

Les paiements de soutien optionnels sont traités par **Stripe** sur le checkout hébergé Stripe. Stripe gère les données de carte selon sa propre politique. Nous pouvons recevoir la confirmation qu'un paiement a réussi et stocker un badge fondateur sur votre profil. Nous ne stockons pas les numéros de carte complets dans Altalaya.

---

## 3. Comment nous utilisons vos données

Nous utilisons vos données pour :

- Vous authentifier et maintenir votre compte
- Afficher la carte communautaire, votre profil et vos spots enregistrés
- Héberger les photos et informations de spots que vous publiez
- Calculer les aides solaires sur l'appareil / dans l'app à partir de la localisation
- Appliquer le statut Early Founder lorsque vous soutenez le projet
- Modérer le contenu nuisible ou illégal
- Traiter les signalements de spots et les blocages pour masquer du contenu sur votre carte et examiner les abus
- Corriger les bugs et améliorer la fiabilité
- Respecter la loi lorsque cela est requis

Nous n'utilisons **pas** vos données pour de la revente publicitaire ciblée, et nous ne vendons pas de données personnelles.

---

## 4. Où les données sont stockées et qui les traite

Nous utilisons **Supabase** pour l'authentification, le stockage en base, l'hébergement des photos et les tables de sécurité UGC (dont `spot_reports` et `user_blocks`) avec RLS. Les données sont traitées sur l'infrastructure Supabase selon leurs conditions et pratiques de sécurité.

Nous pouvons aussi nous appuyer sur :

- **Google** — connexion Google et Google Maps (app) ; Google Analytics 4 sur ce site **uniquement avec votre consentement**
- **Stripe** — paiements optionnels Early Founder
- **Apple / Google** — distribution de l'app, rapports de plantage et services des stores, selon la configuration de ces plateformes
- **Hébergement du site** — notre hébergeur web (par ex. Vercel) peut traiter des journaux techniques de connexion (IP, user-agent, horodatages) pour servir le site et sécuriser l'infrastructure

Ces prestataires traitent les données uniquement autant que nécessaire pour nous fournir leurs services.

La connexion OAuth peut revenir vers l'app via des deep links (ex. schémas d'URL personnalisés comme `altalaya://`). Ces redirections transportent des jetons d'auth uniquement autant que nécessaire pour terminer la connexion.

---

## 5. Partage

Nous partageons des données personnelles uniquement lorsque :

- Vous publiez du contenu destiné à être public (spots, photos, champs de profil que vous choisissez d'afficher)
- Un prestataire en a besoin pour faire fonctionner Altalaya (ex. hébergement Supabase, Stripe pour les paiements volontaires)
- La loi l'exige (demande légale valide)
- C'est nécessaire pour protéger les utilisateurs, le public ou l'intégrité du service (fraude, abus, sécurité), y compris l'examen des signalements

Nous ne **vendons pas** vos informations personnelles.

---

## 6. Conservation et suppression de compte

- Données de compte : conservées tant que le compte est actif
- Spots / photos publics : conservés jusqu'à suppression par vous, ou retrait pour violation de règles
- Associations spots enregistrés : conservées jusqu'à désenregistrement ou suppression du compte
- Blocages : conservés jusqu'à déblocage ou suppression du compte
- Signalements : conservés autant que raisonnablement nécessaire pour la modération, la sécurité et les litiges
- Sessions / jetons d'auth : conservés jusqu'à déconnexion ou expiration
- Journaux : conservés seulement aussi longtemps que raisonnablement nécessaire pour la sécurité et le débogage

**Suppression de compte dans l'app :** depuis Réglages, vous pouvez supprimer définitivement votre compte. Ce processus retire votre profil, vos spots, les photos associées en stockage (au mieux), vos blocages, et vous déconnecte. Les signalements que vous avez déposés ou concernant votre contenu peuvent être conservés lorsque la loi, la sécurité ou un litige l'exigent. Des sauvegardes résiduelles peuvent exister brièvement pour la sécurité et la récupération.

Vous pouvez aussi nous écrire (voir ci-dessous) pour demander une suppression ou d'autres droits sur vos données.

---

## 7. Vos choix et vos droits

Selon votre lieu de résidence (par ex. UE/EEE, UK, Californie), vous pouvez avoir le droit de :

- Accéder à vos données personnelles
- Corriger des données inexactes
- Supprimer vos données
- Exporter les données que vous avez fournies
- Vous opposer à certains traitements ou les restreindre
- Retirer votre consentement (ex. localisation ou photothèque, ou cookies analytiques du site)

Dans l'app, vous pouvez déjà :

- Modifier votre profil (y compris l'avatar depuis la photothèque)
- Supprimer les spots et photos que vous avez téléversés
- Enregistrer / retirer des spots
- Signaler un spot ou bloquer un utilisateur depuis le menu détail d'un mirador (⋯ → Reportar / Bloquear)
- Vous déconnecter
- Supprimer votre compte depuis Réglages
- Révoquer les permissions de localisation ou média dans les réglages système

Sur ce site, vous pouvez :

- Accepter ou refuser Google Analytics via la bannière cookies
- Modifier ce choix à tout moment via **Paramètres cookies** dans le pied de page
- Lire cette politique et les Conditions d'utilisation sans accepter l'analytique

Pour exercer d'autres droits, écrivez-nous à l'adresse ci-dessous. Nous pourrons d'abord vérifier votre identité.

---

## 8. Enfants

Altalaya ne s'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles d'enfants. Si vous pensez qu'un enfant a créé un compte, contactez-nous et nous prendrons les mesures appropriées.

---

## 9. Sécurité

Nous utilisons des protections standard de l'industrie fournies par notre stack d'hébergement et d'auth (transport chiffré, contrôles d'accès, API authentifiées, RLS Supabase sur les tables sensibles comme signalements et blocages, stockage sécurisé de session sur appareil lorsque disponible). Aucune méthode de transmission ou de stockage n'est sécurisée à 100 %. Utilisez un mot de passe fort et protégez votre appareil.

---

## 10. Nature et responsabilité outdoor (contexte des données)

Altalaya aide à découvrir de vrais lieux en nature. Publier un spot ne donne pas le droit d'entrer sur un terrain privé, d'ignorer les règles locales ou de nuire à l'environnement. Les données de localisation que vous partagez sur des lieux doivent être exactes et respectueuses. Voir nos Conditions d'utilisation pour les règles de conduite sur les sites réels.

---

## 11. Modifications

Nous pouvons mettre à jour cette politique. Dans ce cas, nous changerons la date « Dernière mise à jour » et, le cas échéant, vous informerons dans l'app ou par d'autres moyens raisonnables. Continuer à utiliser le service après une mise à jour signifie que vous acceptez la politique révisée.

---

## 12. Contact

Questions sur la confidentialité ou demandes relatives aux données :

**E-mail :** privacy@altalaya.app  
**App :** Altalaya  
**Dans l'app :** Profil → Privacidad y Términos, Réglages → Legal, et détail mirador → ⋯ → Reportar / Bloquear
