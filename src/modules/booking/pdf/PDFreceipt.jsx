import jsPDF from "jspdf";
import logo from "../../../assets/logo.png";
import { forwardRef, useImperativeHandle } from "react";

const PDFreceipt = forwardRef(({ obtenerResumenReserva }, ref) => {
  const generarPDF = async () => {
    const pdf = new jsPDF();

    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = () => {
      pdf.addImage(logoImg, "PNG", 20, 10, 40, 40);

      let y = 60;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("Resumen de la Reserva", 105, y, { align: "center" });

      y += 4;
      pdf.setLineWidth(0.5);
      pdf.line(20, y, 190, y);
      y += 6;

      const resumen = obtenerResumenReserva();
      const boxHeight = Object.keys(resumen).length * 10 + 10;

      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(20, y, 170, boxHeight, 5, 5, "F");

      y += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);

      for (const [clave, valor] of Object.entries(resumen)) {
        pdf.setFont("helvetica", "bold");
        pdf.text(`${clave.charAt(0).toUpperCase() + clave.slice(1)}:`, 25, y);
        pdf.setFont("helvetica", "normal");
        pdf.text(`${valor}`, 80, y);
        y += 10;
      }

      y += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text("Gracias por confiar en nosotros. ¡Te esperamos!", 105, y, {
        align: "center",
      });

      pdf.save("resumen_reserva.pdf");
    };
  };

  useImperativeHandle(ref, () => ({
    generarPDF,
  }));

  return null;
});

export default PDFreceipt;
