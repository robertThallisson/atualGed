import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Base } from '../base';
import { LineReport } from './line-report';

export class ReportBase {
  constructor(public base: Base) {}
  titulo = 'Relatório';
  print(
    value?: string,
    headers?: Array<LineReport>,
    name?: string,
    title?: string,
    print: boolean = false,
    landscape: boolean = false,
    rodape?: Array<LineReport>
  ) {
    if (!title) {
      title = this.titulo;
    }
    if (headers) {
      this.printContent(headers, value, name, title, print, landscape, rodape);
    } else {
      this.printSinple(value, name, title, print);
    }
  }

  printSinple(
    value?: string,
    name?: string,
    title?: string,
    print: boolean = false,
    landscape: boolean = false
  ) {
    const doc = landscape ? new jsPDF('landscape') : new jsPDF();
    const pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.addImage(
      '../../../assets/ANM_BAIXO_W.png',
      'JPEG',
      pageWidth - 60,
      5,
      60,
      20
    );
    let imgEmpresa = this.base.getImagemLogoEmpresa();
    if (imgEmpresa === '/assets/img/employdefault.jpg') {
      imgEmpresa = '../../..' + imgEmpresa;
    }
    doc.addImage(imgEmpresa, 'JPEG', 10, 5, 60, 20);
    doc.setFontSize(18);
    doc.text(title, 14, 28);
    doc.setFont('', 'bold');


    let currentpage = 0;

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const footer = function(pagina) {
      if (currentpage < doc.putTotalPages.length) {
      //  const imgData =

          // HEADER
    //   doc.setFontSize(20);
     //   doc.setTextColor(40);

     //   if (imgData) doc.addImage(imgData, 'JPEG', 400, 30, 60, 60);

        let str = 'Página ' + (currentpage + 1);
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' de ' + doc.putTotalPages.length;
        }
        doc.setFontSize(10);
        doc.text(
          str,
          pageWidth - 30,
          doc.internal.pageSize.height - 10
        );

        doc.text(
          `© ${new Date().getFullYear()} MundoBitInfo - Soluções.`,
          pageWidth / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
        currentpage++;
      }
    };

    autoTable(doc, {
      html: value ? value : '#tabela',
      startY: 28,
      showHead: 'firstPage',
      didDrawPage: footer
    });
    let finalY = (doc as any).lastAutoTable.finalY; // The y position on the page
    doc.text("Hello!", 14, finalY );
    try {
      if (print) {
        doc.save(name ? name + '.pdf' : 'report.pdf');
      } else {
        doc.autoPrint();
        const dataSrc = doc.output('dataurlstring');
        const win = window.open('');
        win.document.write(
          '<iframe width="100%" height="100%" src="' +
            dataSrc +
            '"></embed></body></html>'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  printContent(
    headers: Array<LineReport>,
    value?: string,
    name?: string,
    title?: string,
    print: boolean = false,
    landscape: boolean = false,
    rodape?: Array<LineReport>
  ) {
    // add image doc.addImage('examples/images/Octonyan.jpg', 'JPEG', 15, 40, 180, 180);

    const doc = landscape ? new jsPDF('landscape') : new jsPDF();
    const pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.addImage(
      '../../../assets/ANM_BAIXO_W.jpg',
      'JPEG',
      pageWidth - 60,
      5,
      60,
      20
    );
    let imgEmpresa = this.base.getImagemLogoEmpresa();
    if (imgEmpresa === '/assets/img/employdefault.jpg') {
      imgEmpresa = '../../..' + imgEmpresa;
    }
    doc.addImage(imgEmpresa, 'JPEG', 10, 5, 60, 20);
    let y = 33;
    headers.forEach((element, index) => {
      doc.setFontSize(11);
      doc.setTextColor(100);
      if (element.fontSize > 0) {
        doc.setFontSize(element.fontSize);
      }
      if (element.textColor > 0) {
        doc.setTextColor(element.textColor);
      }
      doc.setFont(element.font, element.fontStyle);
      if (index > 0) {
        y += element.fontSize > 0 ? element.fontSize : 7;
      }
      doc.text(element.text, 14, y);
    });

    doc.setFontSize(18);
    doc.setFont('', 'bold');
    doc.text(title, pageWidth / 2, 28, { align: 'center' });

    let currentpage = 0;

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const footer = function(pagina) {
      if (currentpage < doc.putTotalPages.length) {
      //  const imgData =

          // HEADER
    //   doc.setFontSize(20);
     //   doc.setTextColor(40);

     //   if (imgData) doc.addImage(imgData, 'JPEG', 400, 30, 60, 60);

        let str = 'Página ' + (currentpage + 1);
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' de ' + doc.putTotalPages.length;
        }
        doc.setFontSize(10);
        doc.text(
          str,
          pageWidth - 30,
          doc.internal.pageSize.height - 10
        );

        doc.text(
          `© ${new Date().getFullYear()} MundoBitInfo - Soluções.`,
          pageWidth / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
        currentpage++;
      }
    };

    autoTable(doc, {
      html: value ? value : '#tabela',
      startY: 3 + y,
      didDrawPage: footer
    });

    let finalY = (doc as any).lastAutoTable.finalY  + 5; // The y position on the page

    rodape.forEach((element, index) => {
      doc.setFontSize(11);
      doc.setTextColor(100);
      if (element.fontSize > 0) {
        doc.setFontSize(element.fontSize);
      }
      if (element.textColor > 0) {
        doc.setTextColor(element.textColor);
      }
      doc.setFont(element.font, element.fontStyle);
      if (index > 0) {
        finalY += element.fontSize > 0 ? element.fontSize : 7;
      }
      doc.text(element.text, 14, finalY);
    });
    try {
      if (print) {
        doc.save(name ? name + '.pdf' : 'report.pdf');
      } else {
        doc.autoPrint();
        const dataSrc = doc.output('dataurlstring');
        const win = window.open('', '_blank');
        win.document.write(
          '<iframe width="100%" height="100%" src="' +
            dataSrc +
            '"></embed></body></html>'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
