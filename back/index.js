require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Modèle utilisateur
const User = mongoose.model("User", new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}));

// Route de test
app.get("/", (req, res) => res.send("Backend OK"));

// Lire tous les utilisateurs
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Ajouter un utilisateur
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

// Connexion MongoDB puis lancement du serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(process.env.PORT, () =>
      console.log(`Serveur sur http://localhost:${process.env.PORT}`));
  })
  .catch(err => console.error("Erreur MongoDB :", err.message));