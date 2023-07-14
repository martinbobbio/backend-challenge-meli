import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Challenge de Mercado Libre",
      version: "1.0.0",
      description: "Documentation made by: Martin Bobbio",
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
