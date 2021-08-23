import jsPDF from "jspdf";


var doc = new jsPDF()

doc.addPage()

doc.text(20, 20, "hiii Test")

export default doc