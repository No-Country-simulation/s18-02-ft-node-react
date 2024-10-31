import { envs } from "../config/envs/env.config";
import { transport } from "../config/nodemailer/nodemailer.config";

interface IEmail {
  email: string;
  name: string;
  token: string;
}
export class Emails {
  static sendConfirmationEmail = async (parameters: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Confirma tu email - TeachApp",
        html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Bienvenido a TeachApp!</h2>
              <p>Hola, <strong>${parameters.name}</strong>,</p>
              <p>Gracias por registrarte a TeachApp! Para terminar el registro, debes confirmer tu email.</p>
              <p style="text-align: center;">
                <a href="${envs.FRONTEND_URL}/auth/confirm-account/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirm account</a>
              </p>
              <p style="color: #888;">Este token expira en 30 minutos.</p>
              <p>Si no te has registrado a TeachApp, por favor ignora este email.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
            </div>
          </div>`,
      });
    } catch (error) {
      throw new Error("Ocurrió un error al enviar el correo de confirmación");
    }
  };
  static sendResetPasswordEmail = async (parameters: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Cambio de contraseña - TeachApp",
        html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Recuperación de contraseña</h2>
              <p>Hola, <strong>${parameters.name}</strong>,</p>
              <p>Para elegir una contraseña nueva, ingresa en el siguiente enlace.</p>
              <p style="text-align: center;">
                <a href="${envs.FRONTEND_URL}/auth/reset-password/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirmar Cuenta</a>
              </p>
              <p style="color: #888;">Este token expira en 30 minutos.</p>
              <p>Si no has pedido un cambio de contraseña, ignora este mensaje.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
            </div>
          </div>`,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de confirmacion");
    }
  };

  static sendWelcomeToProject = async (parameters: IEmail) => {
    try {
      await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Bienvenido al proyecto - TeachApp",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center;">Bienvenido al proyecto</h2>
            <p>Hola, <strong>${parameters.name}</strong>,</p>
            <p>Te damos la bienvenida al proyecto TeachApp. Estamos emocionados de tenerte con nosotros y esperamos que disfrutes de todas las funcionalidades que hemos preparado para ti.</p>
            <p style="text-align: center;">
              <a href="${envs.FRONTEND_URL}/auth/reset-password/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirmar Cuenta</a>
            </p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
            <p>¡Gracias por unirte a nosotros!</p>
            <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
          </div>
        </div>
        `,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de bienvenida al proyecto");
    }
  };

  static sendEmailReservationToStudent = async (parameters: IEmail) => {
    try {
      //TODO: parameters.date, parameters.time, parameters.teacher

      await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Reservación de clase - TeachApp",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center;">Solicitud de reservación de clase enviada</h2>
            <p>Hola, <strong>${parameters.name}</strong>,</p>
            <p>Nos complace informarte que hemos recibido tu solicitud de reservación para la clase.</p>
            <p>Detalles de la solicitud:</p>
            <ul>
              <li><strong>Fecha:</strong> parameters.date</li> ----> Cambiar aca 
              <li><strong>Hora:</strong> parameters.time</li> ---> Cambiar aca
              <li><strong>Profesor:</strong> parameters.teacher</li> ---> Cambiar aca
            </ul>
            <p>Te notificaremos una vez que tu reservación haya sido confirmada.</p>
            <p>Si tienes alguna pregunta o necesitas modificar tu solicitud, no dudes en ponerte en contacto con nosotros.</p>
            <p>¡Gracias por elegir TeachApp!</p>
            <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
          </div>
        </div>
        `,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de reservacion al estudiante");
    }
  };

  static sendEmailReservationToTeacher = async (parameters: IEmail) => {
    try {
      //TODO: parameters.date, parameters.time, parameters.teacher

      await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Reservación de clase - TeachApp",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center;">Solicitud de reservación de clase</h2>
            <p>Hola, <strong>${parameters.name}</strong>,</p>
            <p>Te informamos que has recibido una nueva solicitud de reservación de clase.</p>
            <p>Detalles de la solicitud:</p>
            <ul>
              <li><strong>Fecha:</strong> parameters.date</li> ---> Cambiar aca 
              <li><strong>Hora:</strong> parameters.time</li> ---> Cambiar aca
              <li><strong>Estudiante:</strong> parameters.student</li> ---> Cambiar aca
            </ul>
            <p>Por favor, revisa tu calendario y confirma la disponibilidad para esta clase.</p>
            <p>Si tienes alguna pregunta o necesitas modificar la solicitud, no dudes en ponerte en contacto con nosotros.</p>
            <p>¡Gracias por ser parte de TeachApp!</p>
            <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
          </div>
        </div>
        `,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de reservacion al profesor");
    }
  };

  static SendEmailReservationConfirmedToStudent = async (parameters: IEmail) => {
    try {
      //TODO: parameters.date, parameters.time, parameters.teacher

      await transport.sendMail({
        from: '"TeachApp" <no-reply@teachapp.com>',
        to: parameters.email,
        subject: "Reservación de clase confirmada - TeachApp",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center;">Reservación de clase confirmada</h2>
            <p>Hola, <strong>${parameters.name}</strong>,</p>
            <p>Nos complace informarte que tu reservación para la clase ha sido confirmada por el profesor.</p>
            <p>Detalles de la clase:</p>
            <ul>
              <li><strong>Fecha:</strong> parameters.date</li> ---> Cambiar aca
              <li><strong>Hora:</strong> parameters.time</li> ---> Cambiar aca
              <li><strong>Profesor:</strong> parameters.teacher</li> ---> Cambiar aca
            </ul>
            <p>Si tienes alguna pregunta o necesitas modificar tu reservación, no dudes en ponerte en contacto con nosotros.</p>
            <p>¡Gracias por elegir TeachApp!</p>
            <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 TeachApp. Todos los derechos reservados.</p>
          </div>
        </div>
        `,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de reservacion confirmada al estudiante");
    }
  };
}
