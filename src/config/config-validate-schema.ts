import * as Joi from "joi";

export const configSchema = Joi.object({
  ROOT_PAT: Joi.string(),
  DB: Joi.object({
    URI: Joi.string(),
    database: Joi.string(),
  })
})
