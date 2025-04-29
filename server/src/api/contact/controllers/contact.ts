/**
 * contact controller
 */

// import { factories } from '@strapi/strapi'
// export default factories.createCoreController('api::contact.contact');


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx); // Save to Strapi

    const { name, email, subject, message } = ctx.request.body.data;

    // Send email to yourself
    await strapi.plugins['email'].services.email.send({
      to: 'duniola4u@gmail.com',
      from: 'duniola4u@gmail.com',
      subject: `New contact from ${name} - ${subject}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    });

    return response;
  },
}));
