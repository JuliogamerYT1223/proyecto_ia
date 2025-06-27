export default function ChatbotButton() {
  const chatUrl =
    "https://www.chatbase.co/chatbot-iframe/UmCTh3dPexkAt_ZHwFGpq";

  const openChat = () => {
    window.open(chatUrl, "_blank", "width=400,height=600");
  };

  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 bg-red-900 hover:bg-red-800 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer"
      aria-label="Abrir chatbot"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 3C6.48 3 2 6.58 2 11c0 1.85.82 3.53 2.19 4.86L3 21l5.41-1.72C9.29 19.76 10.61 20 12 20c5.52 0 10-3.58 10-8s-4.48-9-10-9z" />
      </svg>
    </button>
  );
}
