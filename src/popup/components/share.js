/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import MosoMainBase from './mainbase.js';

customElements.define('moso-share', class MosoShare extends MosoMainBase {
  #in_reply_to_id = undefined;

  connectedCallback() {
    super.connectedCallback();

    this.innerHTML = `
    <style>
      button.primary{
        align-self: end;
      }
    </style>
    <h2>Share something!</h2>
    <fieldset>
      <textarea id="shareBody"></textarea>
      <button class="primary" id="share">Post</button>
    </fieldset>
    <div id="replyStatus"></div>
    `;

    document.getElementById("shareBody").focus();
  }

  setData(url, status) {
    const textarea = document.getElementById("shareBody");

    if (url) {
      textarea.value = `\n\n${url}`;
      textarea.selectionEnd = 0;
    }

    textarea.focus();

    if (status) {
      this.#in_reply_to_id = status.id;

      const card = document.createElement('status-card');
      card.initialize(status);
      document.getElementById("replyStatus").append(card);
    }
  }

  async handleEvent(e) {
    if (e.target.id === 'share') {
      const body = document.getElementById("shareBody").value; // TODO: validation
      this.sendMessage("post", {
        /* TODO: other flags */
        body,
        in_reply_to_id: this.#in_reply_to_id,
      });

      // TODO: show a loading icon...
    }
  }

  shown() {
    const textarea = document.getElementById("shareBody");
    textarea.value = '';

    const replyStatus = document.getElementById("replyStatus");
    while (replyStatus.firstChild) replyStatus.firstChild.remove();
  }
});