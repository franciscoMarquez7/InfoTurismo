// Importar librería para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo monumento
const Monumento = models.monumentos;

class MonumentoController {
  async createMonumento(req, res) {
    const monumento = req.body;

    try {
      const monumentoNuevo = await Monumento.create(monumento);

      res.status(201).json(Respuesta.exito(monumentoNuevo, "Monumento insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un monumento nuevo: ${monumento}`));
    }
  }

  async getAllMonumento(req, res) {
    try {
      const data = await Monumento.findAll(); // Recuperar todos los monumentos
      res.json(Respuesta.exito(data, "Datos de monumentos recuperados"));
    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los monumentos: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteMonumento(req, res) {
    const id = req.params.id;
    try {
      const numFilas = await Monumento.destroy({
        where: {
          id: id,
        },
      });
      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + id));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getMonumentoById(req, res) {
    const id = req.params.id;
    try {
      const fila = await Monumento.findByPk(id);
      if (fila) {
        res.json(Respuesta.exito(fila, "Monumento recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Monumento no encontrado"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async updateMonumento(req, res) {
    const monumento = req.body;
    const id = req.params.id;

    if (id != monumento.id) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id del monumento no coincide"));
    }

    try {
      const numFilas = await Monumento.update({ ...monumento }, { where: { id } });

      if (numFilas == 0) {
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + id));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }
  async getMonumentosByNombre (req, res) {
    let { nombre } = req.query;
  
    if (!nombre) {
      return res.status(400).json(Respuesta.error(null, "Falta el parámetro nombre"));
    }
  
    try {
      const monumentos = await Monumento.findAll({
        where: { nombre }
      });
  
      if (monumentos.length === 0) {
        return res.status(404).json(Respuesta.error(null, "No se encontraron monumentos con ese nombre"));
      }
  
      return res.status(200).json(Respuesta.exito(monumentos, "Monumentos encontrados"));
    } catch (error) {
      logMensaje("Error al filtrar monumentos por nombre: " + error);
      return res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  };
  
}

module.exports = new MonumentoController();
