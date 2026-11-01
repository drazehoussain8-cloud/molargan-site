# MolArgan — maquette de refonte (site statique)

HTML / CSS / JS vanilla, sans dépendance ni build. Ouvrir `index.html` dans un navigateur.

```
index.html          Accueil (+ sélection de 4 produits)
produits.html       Catalogue : 32 produits, filtres, recherche, fenêtre de détails
about.html          La coopérative (FR + AR)
assets/
  css/style.css     Design tokens (:root), composants, pages, responsive, animations
  js/icons.js       Sprite d'icônes SVG (injecté une fois pour toutes les pages)
  js/main.js        En-tête, barre de progression, apparition au scroll, compteur
  js/catalog.js     Cartes produits, filtres, recherche, fenêtre de détails, lien WhatsApp
  data/products.js  Données des produits (window.PRODUCTS) — seul fichier à éditer pour le catalogue
  img/              SVG : bouteille, scène arganier, icônes, favicon
```

## Ajouter / modifier un produit
Copier un objet dans `assets/data/products.js` et changer `id`, `cat` (argan | amlou | miel | cosmetiques),
`name`, `desc`, `img`, `price` ou `priceNote`, `options`. La page se met à jour toute seule.

## Notes
- Les photos produits pointent vers `molargan.com/wp-content/uploads/...` ; pour un hébergement indépendant,
  les télécharger dans `assets/img/products/` et changer `img`.
- Numéro WhatsApp : `window.WHATSAPP` en haut de `products.js`.
- Polices : Google Fonts (Cormorant Garamond, Jost, Tajawal).
