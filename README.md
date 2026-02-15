# 🏥 Smart Emergency Triage - Morocco
**Système d'IA pour l'optimisation du triage et la gestion des flux aux urgences (CHU).**

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![Hackathon](https://img.shields.io/badge/AgorAI-Spring%20School%202026-orange)

## 📌 Context & Impact
Les services d'urgence au Maroc souffrent d'une surcharge chronique. Ce projet propose une solution **Hands-on** pour transformer la gestion des patients et sauver des vies.

### Le Problème
* **Attente :** 6 à 8 heures pour les cas non-urgents.
* **Mortalité :** 2-3% de décès évitables par manque de détection précoce des cas critiques.
* **Saturation :** 40% des admissions pourraient être redirigées vers des consultations externes.

### Notre Solution
Une plateforme intelligente qui automatise le score de priorité et prédit l'affluence pour une meilleure allocation des ressources médicales.

---

## 🚀 Fonctionnalités Clés
- **Triage P1-P5 :** Classification instantanée basée sur les constantes vitales et symptômes (XGBoost).
- **Forecasting d'Affluence :** Prédiction des pics de patients à 24h (LSTM).
- **Dashboard Temps Réel :** File d'attente intelligente avec alertes automatiques pour les cas critiques (P1/P2).
- **Optimisation :** Recommandation d'affectation des médecins en fonction de la charge.

---

## 🛠 Tech Stack
* **Intelligence Artificielle :** Python, Scikit-learn, XGBoost, TensorFlow.
* **Backend :** FastAPI (Performance & Inférence rapide).
* **Frontend :** React + Tailwind CSS (Interface ergonomique).
* **Data & Ops :** PostgreSQL, Docker.

---

## 📊 Performance du Modèle
| Métrique | Score | Impact Réel |
| :--- | :--- | :--- |
| **Précision (Triage)** | 87.3% | Réduction des erreurs humaines |
| **Recall (Cas Critiques)** | 92% | Sécurité patient accrue |
| **Temps d'inférence** | < 100ms | Triage immédiat dès l'admission |

---

## 🔧 Installation & Utilisation

### Prérequis
* Docker & Docker Compose

### Lancement rapide
```bash
# 1. Cloner le dépôt
git clone [https://github.com/votre-username/smart-triage-morocco.git](https://github.com/votre-username/smart-triage-morocco.git)
cd smart-triage-morocco

# 2. Lancer l'environnement avec Docker
docker-compose up -d
