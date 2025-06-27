class ActionProvider {
  API_BASE_URL = import.meta.env.VITE_SOME_KEY;
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async handleUserMessage(message) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botReply = this.createChatBotMessage(data.response);

      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, botReply],
      }));
    } catch (error) {
      const errorReply = this.createChatBotMessage(
        "Ocurrió un error al conectarse al servidor."
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, errorReply],
      }));
    }
  }
}

export default ActionProvider;
