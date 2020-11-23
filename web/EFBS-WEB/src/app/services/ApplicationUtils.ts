import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { ApplicationConstants } from './ApplicationConstants';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class ApplicationUtils {

  constructor(private logger: NGXLogger) { }

  showNotificationSuccess(msgDivId, alertType, alertMsg) {
    var alertMsgDiv = "<div class=\"alert alert-" + alertType + " alert-dismissible\" role=\"alert\">";
    alertMsgDiv += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    alertMsgDiv += "" + alertMsg + "";
    alertMsgDiv += "</div>";
    $(msgDivId).html(alertMsgDiv);


    $('html, body').animate({ scrollTop: (0) }, 2000);
    if(alertType == ApplicationConstants.SUCCESS_LABLE){
      window.setTimeout(function() {
        $(".alert-"+alertType+"").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
        });
      }, 15000); // 15s
    }

  }

  handelError<T>(operation = 'Operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed : ${error.message}`);
      return of(result as T);// Return empty result to keep runnig our application.
    };
  }

}