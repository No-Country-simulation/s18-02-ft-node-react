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
        from: '"Proyecto" <no-reply@proyecto.com>',
        to: parameters.email,
        subject: "Confirma tu email - Proyecto",
        html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Bienvenido a Proyecto!</h2>
              <p>Hola, <strong>${parameters.name}</strong>,</p>
              <p>Gracias por registrarte a Proyecto! Para terminar el registro, debes confirmer tu email.</p>
              <p style="text-align: center;">
                <a href="${envs.FRONTEND_URL}/auth/confirm-account/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirm account</a>
              </p>
              <p style="color: #888;">Este token expira en 30 minutos.</p>
              <p>Si no te has registrado a Proyecto, por favor ignora este email.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Proyecto. Todos los derechos reservados.</p>
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
        from: '"Proyecto" <no-reply@proyecto.com>',
        to: parameters.email,
        subject: "Cambio de contraseña - Proyecto",
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
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Proyecto. Todos los derechos reservados.</p>
            </div>
          </div>`,
      });
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de confirmacion");
    }
  };
}
