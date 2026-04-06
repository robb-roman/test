const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// 🔌 Conexión a MongoDB
mongoose.connect("TU_URL_DE_MONGODB")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// 📦 Modelo (estructura de datos)
const ContactoSchema = new mongoose.Schema({
  nombre: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

const Contacto = mongoose.model("Contacto", ContactoSchema);

// 🚀 Endpoint
app.post("/api/contacto", async (req, res) => {
  const { nombre, mensaje } = req.body;

  try {
    // 💾 Guardar en DB
    const nuevo = new Contacto({ nombre, mensaje });
    await nuevo.save();

    // 📲 WhatsApp
    const telefono = "5218112345678";
    const texto = `Hola, soy ${nombre}. ${mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    res.json({ whatsapp: url });

  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));