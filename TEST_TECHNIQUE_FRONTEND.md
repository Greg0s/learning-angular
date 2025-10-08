# Test Technique - Développeur Frontend Angular

## Objectif

Évaluer vos compétences sur les patterns avancés Angular utilisés dans notre application de gestion de transport.

## Stack : Angular 14+, Material Design, RxJS, SCSS

---

## **Contexte**

Créez une application de gestion de véhicules avec les patterns architecturaux spécifiques à notre base de code.

---

## **PARTIE 1 - Setup & Architecture**

Initialisez un projet Angular avec :

- Structure modulaire (core/, shared/, modules/)
- Angular Material + **AG Grid Community**
- **OnPush** obligatoire sur tous les composants
- **ViewEncapsulation.None**

---

## **PARTIE 2 - Modèles**

Créez les interfaces TypeScript pour :

- `Vehicle` (id, licensePlate, brand, model, year, fuelType, capacity, isActive, driver?, maintenanceDate?)
- `Driver` (id, firstName, lastName, licenseNumber)
- `FuelType` enum (DIESEL, GASOLINE, ELECTRIC, HYBRID)

---

## **PARTIE 3 - CVA Simple**

Créez un `fuel-type-control.component.ts` qui :

- Implémente **ControlValueAccessor ET Validator**
- Utilise Material `mat-select` pour les types de carburant

---

## **PARTIE 4 - CVA Formulaire**

Créez un `driver-form.component.ts` qui :

- CVA multi-inputs avec FormGroup interne typé
- 3 champs : firstName, lastName, licenseNumber
- Validation personnalisée du numéro de permis (12 chiffres)
- **CSS Grid** pour organiser les champs en layout responsive

---

## **PARTIE 5 - RxJS Avancé**

Implémentez `vehicle.service.ts` avec :

- `BehaviorSubject` pour la liste complète des véhicules
- **Filtrage réactif** : combinez la liste + terme de recherche à l'aide d'opérateur(s) rxjs
- Observable `filteredVehicles$` qui se met à jour automatiquement
- Méthodes CRUD retournant des Observables
- Simulation d'API avec délais

**Concept** : Quand la liste OU le terme de recherche change, le filtrage se recalcule automatiquement.

Puis `vehicle-list.component.ts` avec :

- Formulaire de recherche reactive (debounce 300ms)
- Pattern `takeUntil` pour les subscriptions
- **AG Grid** pour afficher `filteredVehicles$` avec colonnes configurables
- Actions sur les lignes (éditer, supprimer)

---

## **PARTIE 6 - Intégration & Layout**

Créez `vehicle-create.component.ts` qui :

- Utilise vos deux CVA dans un FormGroup principal
- **CSS Grid** pour organiser le layout du formulaire
- Validation complète du formulaire
- Soumission vers le service

Et `vehicle-dashboard.component.ts` :

- **CSS Grid** pour organiser search + grille
- Zones distinctes : header, filters, grid, actions

---

## **Évaluation**

### Points critiques

- **CVA complets** (ControlValueAccessor + Validator)
- **Architecture OnPush** respectée
- **Pattern takeUntil** appliqué
- **FormGroup typés**
- **RxJS reactive** (combineLatest, debounce)
- **CSS Grid** pour layouts responsives
- **AG Grid** intégré avec données reactives

### Livrables

- Projet Angular fonctionnel
- README avec instructions de lancement

### Ressources autorisées

- Documentation officielle (Angular, RxJS, Material, AG Grid)
- Stack Overflow et forums techniques
- **IA autorisée** (ChatGPT, Copilot, etc.)

---

**Le test évalue votre capacité à produire du code fonctionnel respectant nos patterns**

_Durée réaliste : 3-4h pour un développeur expérimenté_
