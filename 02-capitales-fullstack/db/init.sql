-- Se ejecuta automáticamente la primera vez que arranca el contenedor de Postgres
-- (todo lo que esté en /docker-entrypoint-initdb.d/). Es idempotente: se puede
-- volver a correr a mano sin duplicar datos, por ejemplo contra la base de Render.

-- unaccent permite buscar "neuquen" y encontrar "Neuquén"
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE IF NOT EXISTS capitales (
    id        SERIAL PRIMARY KEY,
    nombre    TEXT NOT NULL,
    provincia TEXT NOT NULL UNIQUE
);

INSERT INTO capitales (nombre, provincia) VALUES
    ('La Plata', 'Buenos Aires'),
    ('Ciudad Autónoma de Buenos Aires', 'CABA'),
    ('San Fernando del Valle de Catamarca', 'Catamarca'),
    ('Resistencia', 'Chaco'),
    ('Rawson', 'Chubut'),
    ('Córdoba', 'Córdoba'),
    ('Corrientes', 'Corrientes'),
    ('Paraná', 'Entre Ríos'),
    ('Formosa', 'Formosa'),
    ('San Salvador de Jujuy', 'Jujuy'),
    ('Santa Rosa', 'La Pampa'),
    ('La Rioja', 'La Rioja'),
    ('Mendoza', 'Mendoza'),
    ('Posadas', 'Misiones'),
    ('Neuquén', 'Neuquén'),
    ('Viedma', 'Río Negro'),
    ('Salta', 'Salta'),
    ('San Juan', 'San Juan'),
    ('San Luis', 'San Luis'),
    ('Río Gallegos', 'Santa Cruz'),
    ('Santa Fe', 'Santa Fe'),
    ('Santiago del Estero', 'Santiago del Estero'),
    ('Ushuaia', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur'),
    ('San Miguel de Tucumán', 'Tucumán')
ON CONFLICT (provincia) DO NOTHING;
