import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
class EmailService {
  static transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  static async sendMail(mailOptions) {
    try {
      await EmailService.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  static async sendCompanyPassword(companyEmail, companyName, password) {
    const mailOptions = {
      from: 'PMT <no-reply@yourcompany.com>',
      to: companyEmail,
      subject: 'Your Company Account Password for Project Management',
      text: `
        Dear ${companyName},
        Your account has been created successfully. Your password is: ${password}
        Please change it after your first login.
        Best Regards,
        PMT Support Team
      `,
    };
    await EmailService.sendMail(mailOptions);
  }
  static async sendPin(userEmail, username, otp) {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Welcome to PMT',
      text: `
        Dear ${username},
        Your account has been created successfully. Your OTP is: ${otp}.
        Best Regards,
        PMT Support Team
      `,
    };

    await EmailService.sendMail(mailOptions);
  }
  static async sendProjectCreation(userEmail, project) {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Project Created',
      text: `
        Dear ${userEmail},
        Your project has been created successfully.
        Project Title: ${project.title}
        Project Description: ${project.description}
        Project Status: ${project.status}
        Project Deadline: ${project.endDate}
        Best Regards,
        PMT Support Team
      `,
    };

    await EmailService.sendMail(mailOptions);
  }
  static async projectUpdated(userEmail, project) {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Project Updated',
      text: `
        Dear ${userEmail},
        Your project has been updated.
        Project Title: ${project.title}
        Project Description: ${project.description}
        Project Status: ${project.status}
        Project Deadline: ${project.endDate}
        Best Regards,
        PMT Support Team
      `,
    };
    await EmailService.sendMail(mailOptions);
  }
  static async projectClosed() {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Project Closed',
      text: `
      Dear ${userEmail},
      Project has been Closed: ${projectTitle}
      Best Regards,
      PMT Support Team
      `
    }
    await EmailService.sendMail(mailOptions);
  }
  static async sendTaskCreation(userEmail, taskTitle) {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Task Created',
      text: `
        Dear ${userEmail},
        A new task has been created: ${taskTitle}
        Best Regards,
        PMT Support Team
      `,
    };
    await EmailService.sendMail(mailOptions);
  }
  static async taskUpdated() {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Task Created',
      text: `
        Dear ${userEmail},
        Task has been Updated: ${taskTitle}
        Best Regards,
        PMT Support Team
      `,
    }
  }
  static async taskClosed() {
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject: 'Task Closed',
      text: `
        Dear ${userEmail},
        Task has been Closed: ${taskTitle}
        Best Regards,
        PMT Support Team
        `
    }
    await EmailService.sendMail(mailOptions);
  }
  static async createComment(username,title){
    const mailOptions = {
      from: 'PMT <no-reply@PMT.com>',
      to: userEmail,
      subject:'Comment on Task',
      text:`${username}, commented on your Task ${title}`
  }
  await EmailService.sendMail(mailOptions);
}
}

export default EmailService;
