/*
 * Copyright (c) QuadProSoft.
 *
 * This software is copyrighted. Under the copyright laws, this software may not be copied, in whole or in part, without prior written consent of QuadProSoft.
 * This software is provided under the terms of a license between QuadProSoft and the recipient, and its use is subject to the terms of that license.
 */

/**
 * <code>AppResponse<code> class responsible to store response data sent by rest service.
 */
export class AppResponse {
  data: any;
  message: string;
  errors: string[];
  status: number;

  constructor(appResponse: any) {
    this.data = appResponse.data;
    this.errors = appResponse.errors;
    this.message = appResponse.message;
    this.status = appResponse.status;
  }
}
