import { Notificacao } from './../../model/objetc/notificacao';
import { Router } from '@angular/router';
import { TipoNotificacao } from './../../model/enums/tipo-notificacao.enum';
import { NotificaoService } from './../../service/sigobra/notificao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent  {
  constructor(
    public notificaoService: NotificaoService,
    private router: Router
  ) { }


  click(item: Notificacao) {

    switch (item.tipoNotificacao) {
      case TipoNotificacao.CONTA_PAGAR:
        this.router.navigate(['menu/contas-pagar']);
        break;

      case TipoNotificacao.AGENDA:
        this.router.navigate(['menu/agendas']);
        break;
      default:
        break;
    }
  }

  isContaPagar(item: Notificacao) {
    return item.tipoNotificacao === TipoNotificacao.CONTA_PAGAR;
  }

  isAgenda(item: Notificacao) {
    return item.tipoNotificacao === TipoNotificacao.AGENDA;
  }

  isNovidade(item: Notificacao) {
    return item.tipoNotificacao === TipoNotificacao.NOVIDADES;
  }
}
