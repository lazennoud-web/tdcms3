const API = "http://localhost:5000/api/users";

async function charger() {
  const res = await fetch(API);
  const users = await res.json();
  document.getElementById("liste").innerHTML = users
    .map(u => `<li>${u.prenom} ${u.nom} - ${u.email}</li>`)
    .join("");
}

document.getElementById("envoyer").addEventListener("click", async () => {
  const data = {
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    email: document.getElementById("email").value,
  };

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  document.getElementById("message").textContent =
    res.ok ? "Utilisateur ajouté !" : "Erreur : " + result.erreur;

  charger();
});

charger();