export class LineReport {
    fontSize: number;

    text: string;
    textColor: number;

    // possição horizontal  - eixo x 
    x: number;

    // possição vertical  - eixo y 
    y: number;


    // todas a fontes existentes eu acho kkk
    font: string = 'times';
    // normal, bold, italic, underline
    fontStyle: string = 'normal';

    children: Array<LineReport>;
}
