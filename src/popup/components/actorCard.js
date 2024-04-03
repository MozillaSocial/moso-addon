/**
 * @description
 * Card to display an ActivityPub Actor object
 * https://www.w3.org/TR/activitypub/#actors 
 */

customElements.define("actor-card", class ActorCard extends HTMLElement {
  #data
  #dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short'
  })

  initialize(value) {
    this.#data = value
  }

  connectedCallback() {
    // TODO: Sanitize this content!
    this.innerHTML = `
    <article>
      <header>
        <img src="${this.#data.avatar}">
        <h3>${this.#data.display_name || this.#data.username}</h3>
      </header>
      ${this.#data.note}
      <address>
        <a href="${this.#data.url}">${this.#data.url}</a>
      </address>
      <footer>
        ${this.#data.followers_count ? `<span>
          <button id="followActor" class="secondary" data-actorid="${this.#data.id}">Follow</button> &nbsp;${this.#data.followers_count} followers
          </span>` : ''}
        ${this.#data.last_status_at ? `<time datetime="${this.#data.last_status_at}">Last active ${this.#formatDate(this.#data.last_status_at)}</time>` : ''}
      </footer>
    </article>
    `
  }

  #formatDate(dateString) {
    const date = new Date(dateString)
    return this.#dateTimeFormat.format(date)
  }
})