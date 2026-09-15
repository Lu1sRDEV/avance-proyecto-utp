const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PUERTO = 3000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON desde Angular

// Configuración de la conexión a MySQL
const conexion = mysql.createConnection({
    host: "localhost",
    port: "3305", // Cambia a "3305" si tu base de datos usa ese puerto
    database: "controlescolarbd",
    user: "root",
    password: "Alumno26#"
});

// Conectar a la base de datos
conexion.connect(error => {
    if (error) {
        console.error("❌ Error al conectar a la base de datos: " + error.message);
    } else {
        console.log("✅ Conexión exitosa a la base de datos 'controlescolarbd'");
    }
});

/**
 * 1. GET /alumnos
 * Obtiene la lista completa de todos los alumnos matriculados.
 */
app.get("/alumnos", (req, res) => {
    const consulta = "SELECT * FROM alumnos  ";
    
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            return res.status(500).json({ 
                error: "Error al consultar los alumnos", 
                detalles: error.message 
            });
        }
        res.json(resultados);
    });
});

/**
 * 2. POST /alumnos/matricular
 * Registra un nuevo alumno en la base de datos.
 */
app.post("/alumnos/matricular", (req, res) => {
    // Estructuramos el objeto alineado a las columnas de la tabla alumnos
    const nuevoAlumno = {
        alu_codigo: req.body.alu_codigo,
        alu_dni: req.body.alu_dni,
        alu_nombres: req.body.alu_nombres,
        alu_apellidos: req.body.alu_apellidos,
        alu_carrera: req.body.alu_carrera,
        alu_correo: req.body.alu_correo
    };

    const consulta = "INSERT INTO alumnos SET ?";

    conexion.query(consulta, nuevoAlumno, (error, resultado) => {
        if (error) {
            // Manejo del error en caso de DNI o Código duplicados (Error 1062 en MySQL)
            if (error.errno === 1062) {
                return res.status(400).json({ 
                    error: "El DNI o el Código de alumno ya se encuentra registrado." 
                });
            }
            return res.status(500).json({ 
                error: "Error al matricular al alumno", 
                detalles: error.message 
            });
        }
        
        res.status(201).json({ 
            mensaje: "Alumno matriculado correctamente", 
            id_generado: resultado.insertId 
        });
    });
});


/**
 * 3. PUT /alumnos/:id
 * Actualiza los datos de un alumno existente mediante su ID.
 */
app.put("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    const datosActualizados = {
        alu_codigo: req.body.alu_codigo,
        alu_dni: req.body.alu_dni,
        alu_nombres: req.body.alu_nombres,
        alu_apellidos: req.body.alu_apellidos,
        alu_carrera: req.body.alu_carrera,
        alu_correo: req.body.alu_correo
    };

    const consulta = "UPDATE alumnos SET ? WHERE alu_id = ?";

    conexion.query(consulta, [datosActualizados, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar alumno", detalles: error.message });
        }
        res.json({ mensaje: "Alumno actualizado correctamente", alumno: datosActualizados });
    });
});

/**
 * 4. DELETE /alumnos/:id
 * Elimina permanentemente a un alumno de la base de datos mediante su ID.
 */
app.delete("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    const consulta = "DELETE FROM alumnos WHERE alu_id = ?";

    conexion.query(consulta, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar alumno", detalles: error.message });
        }
        res.json({ mensaje: "Alumno eliminado correctamente" });
    });
});

// Iniciar el servidor web
app.listen(PUERTO, () => {
    console.log("🚀 Servidor backend corriendo en http://localhost:" + PUERTO);
});
