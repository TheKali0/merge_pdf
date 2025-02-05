
async function mergePDFs() {
    const files = document.getElementById('files').files;

    if (files.length < 2) {
        alert("Please select at least two PDF files!");
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());

        copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
        });
    }

    const mergedPdfBytes = await pdfDoc.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(mergedPdfBlob);

    const downloadLink = document.getElementById('download');
    downloadLink.href = url;
    downloadLink.style.display = 'inline-block';
    downloadLink.download = 'merged.pdf';
}
