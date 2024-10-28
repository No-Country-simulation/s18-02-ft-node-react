import UserModel from "../models/User.model";
import ClassModel from "../models/Class.model";
import { fakerES as faker } from "@faker-js/faker";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";

export class SeedService {
  constructor(private readonly userModel = UserModel, private readonly classModel = ClassModel) {}

  async createUsers() {
    try {
      const subjectsList = [
        "Matemáticas",
        "Ciencias",
        "Historia",
        "Geografía",
        "Lengua y Literatura",
        "Física",
        "Química",
        "Biología",
        "Arte",
        "Música",
        "Educación Física",
        "Inglés",
        "Informática",
        "Filosofía",
        "Psicología",
      ];

      const commonPassword = "TeachApp1";
      const hashedPassword = await hashPassword(commonPassword);

      const commonDescription =
        "Soy un profesor apasionado por la educación, con más de 10 años de experiencia en la enseñanza de diversas materias. Me enfoco en inspirar a mis alumnos y fomentar un ambiente de aprendizaje positivo y estimulante.";

      const users = [];

      for (let i = 0; i < 30; i++) {
        const fullName = faker.person.fullName();
        const username = this.generateUsername(fullName);
        const subjects = faker.helpers.arrayElements(subjectsList, { min: 1, max: 2 });

        const schedulePreferences = {
          monday: this.generateRandomTimeSlots(),
          tuesday: this.generateRandomTimeSlots(),
          wednesday: this.generateRandomTimeSlots(),
          thursday: this.generateRandomTimeSlots(),
          friday: this.generateRandomTimeSlots(),
          saturday: this.generateRandomTimeSlots(),
          sunday: this.generateRandomTimeSlots(),
        };

        const user = new this.userModel({
          name: fullName,
          username: username,
          email: faker.internet.email(),
          password: hashedPassword,
          role: "teacher",
          avatar: faker.image.avatar(),
          subjects: subjects,
          description: commonDescription,
          birthday: faker.date.birthdate({ min: 25, max: 60, mode: "age" }),
          classPrice: faker.number.int({ min: 5000, max: 12000 }),
          classMode: "remoto",
          schedulePreferences: {
            monday: this.generateRandomTimeSlots(),
            tuesday: this.generateRandomTimeSlots(),
            wednesday: this.generateRandomTimeSlots(),
            thursday: this.generateRandomTimeSlots(),
            friday: this.generateRandomTimeSlots(),
            saturday: this.generateRandomTimeSlots(),
            sunday: this.generateRandomTimeSlots(),
          },
        });

        users.push(user);
      }

      await this.userModel.insertMany(users);
      return {
        status: "success",
        message: "Se han cargado 30 profesores a la base de datos.",
        payload: users,
      };
    } catch (error) {
      console.error("Error al crear usuarios:", error);
      throw error;
    }
  }

  private generateUsername(fullName: string) {
    const [firstName, lastName] = fullName.toLowerCase().split(" ");
    const randomNumber = faker.number.int({ min: 1, max: 999 });
    return `${firstName}.${lastName}${randomNumber}`;
  }

  private generateRandomTimeSlots() {
    const timeSlots = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];

    const slotsPerDay = faker.number.int({ min: 2, max: 5 });
    return faker.helpers.arrayElements(timeSlots, slotsPerDay);
  }
}
