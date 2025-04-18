import dotenv from 'dotenv';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

// Carrega variáveis do .env
dotenv.config();

// Configura o transporte de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Lista de tarefas por dia da semana
const weeklyTasks = {
  1: [ // Segunda-feira
    { time: '07:30', message: 'Trabalhar' },
    { time: '11:00', message: 'Almoçar' },
    { time: '12:00', message: 'Dormir' },
    { time: '16:20', message: 'Praticar inglês com o ChatGPT' },
    { time: '17:00', message: 'HackerRank' },
    { time: '21:00', message: 'Estudar Matematica' },
    { time: '22:00', message: 'Fazer o simulado' },
  ],
  2: [ // Terça-feira
    { time: '07:30', message: 'Trabalhar' },
    { time: '11:00', message: 'Almoçar' },
    { time: '12:00', message: 'Dormir' },
    { time: '16:20', message: 'Praticar inglês com o ChatGPT' },
    { time: '17:00', message: 'HackerRank' },
    { time: '21:00', message: 'Estudar Matematica' },
    { time: '23:00', message: 'Fazer o simulado' },
  ],
  3: [ // Quarta-feira
    { time: '07:30', message: 'Trabalhar' },
    { time: '11:00', message: 'Almoçar' },
    { time: '12:00', message: 'Dormir' },
    { time: '16:20', message: 'Praticar inglês com o ChatGPT' },
    { time: '17:00', message: 'HackerRank' },
    { time: '21:00', message: 'Estudar Matematica' },
    { time: '23:00', message: 'Fazer o simulado' },
  ],
  4: [ // Quinta-feira
    { time: '07:30', message: 'Trabalhar' },
    { time: '11:00', message: 'Almoçar' },
    { time: '12:00', message: 'Dormir' },
    { time: '16:20', message: 'Praticar inglês com o ChatGPT' },
    { time: '17:00', message: 'HackerRank' },
    { time: '21:00', message: 'Estudar Matematica' },
    { time: '23:15', message: 'Fazer o simulado' },
  ],
    5: [ // Sexta-feira
        { time: '07:30', message: 'Trabalhar' },
        { time: '11:00', message: 'Almoçar' },
        { time: '12:00', message: 'Dormir' },
        { time: '16:20', message: 'Praticar inglês com o ChatGPT' },
        { time: '17:00', message: 'HackerRank' },
        { time: '21:00', message: 'Estudar Matematica' },
        { time: '23:00', message: 'Fazer o simulado' },
    ],
    6: [ // Sábado
    { time: '08:00', message: 'Estudar programação' },
    { time: '22:37', message: 'Praticar inglês com o ChatGPT' },
    ],
    0: [ // Domingo
    { time: '08:00', message: 'Estudar programação' },
    { time: '22:37', message: 'Praticar inglês com o ChatGPT' },
    ],
  // Tu pode adicionar Quinta (4), Sexta (5), etc.
};

// Agendamento das tarefas
Object.entries(weeklyTasks).forEach(([dayOfWeek, tasks]) => {
  tasks.forEach(({ time, message }) => {
    const [hour, minute] = time.split(':');
    const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;
    
    cron.schedule(cronTime, () => {
      sendEmail(`[${getWeekdayName(dayOfWeek)}] ${message}`);
      console.log(`📧 Email enviado: ${message} (${time})`);
    });
  });
});

// Função para enviar e-mail
function sendEmail(task) {
    const [timeLabel, ...msgParts] = task.split(' ');
    const messageText = msgParts.join(' ');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `⏰ Lembrete da sua tarefa às ${timeLabel}`,
      text: `
  Olá, Victor! 👋
  
  Este é um lembrete da sua tarefa programada para hoje:
  
  🕒 Horário: ${timeLabel}  
  📌 Tarefa: ${messageText}
  
  Lembre-se: pequenas ações criam grandes hábitos.  
  Você está no caminho certo! 🚀
  
  Boa sorte com sua rotina!  
  — Seu assistente de produtividade
      `.trim()
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error(error);
      console.log('✅ Email enviado:', info.response);
    });
  }
  

// Traduz número do dia para nome
function getWeekdayName(day) {
  const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return dias[parseInt(day)];
}
