const Ajv = require('ajv');
const ajv = new Ajv({ coerceTypes: true, removeAdditional: true });

function validateBody(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) return res.status(400).json({ error: 'invalid_body', details: validate.errors });
    next();
  };
}

function validateQuery(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.query);
    if (!valid) return res.status(400).json({ error: 'invalid_query', details: validate.errors });
    next();
  };
}

module.exports = { validateBody, validateQuery };