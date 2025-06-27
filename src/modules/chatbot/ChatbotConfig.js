import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Asistente",
  initialMessages: [createChatBotMessage("¡Hola! ¿Cómo puedo ayudarte hoy?")],
  customStyles: {
    botMessageBox: { backgroundColor: "#0d6efd" },

    chatButton: {
      backgroundColor: "#7f1d1d",
    },
  },
};

export default config;
