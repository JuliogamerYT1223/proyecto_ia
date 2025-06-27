import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoPNG from "../../assets/logo.png";

const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

function ChatBotComponent() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! ¿Cómo puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const endRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { from: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Ocurrió un error al conectarse al servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-5 right-5 bg-red-900 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition transform duration-200 cursor-pointer text-xl"
      >
        <div className="w-7 h-7 flex items-center justify-center">
          <i className="fa-solid fa-message text-white text-xl"></i>
        </div>
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-23 right-5 md:right-5 w-full md:w-80 max-w-full md:max-w-sm h-[90vh] md:h-[460px] rounded-xl shadow-xl overflow-hidden z-50 border bg-white flex flex-col"
          >
            <div className="flex items-center gap-3 p-4 border-b bg-gray-100">
              <img
                src={LogoPNG}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm font-poppins">
                  Viña los reyes
                </p>
                <p className="text-xs text-gray-500 font-poppins">
                  vinalosreyes@gmail.com
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 bg-white scrollbar-hide">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl text-sm max-w-[75%] break-words font-poppins ${
                      msg.from === "bot"
                        ? "bg-gray-100 text-black"
                        : "bg-red-900 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-black font-poppins">
                    ...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex items-center border-t p-3 bg-white">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none font-poppins"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-red-900 text-white px-4 py-2 rounded-full text-sm font-poppins cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBotComponent;
