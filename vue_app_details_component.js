const domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
  const config = {
    apiKey: "AIzaSyDMn-sNlJ5lIF1YVeLqujt_JXCL_Ac8tO8",
    authDomain: "roy-oswalt-collection.firebaseapp.com",
    databaseURL: "https://roy-oswalt-collection.firebaseio.com",
    projectId: "roy-oswalt-collection",
    storageBucket: "roy-oswalt-collection.appspot.com",
    messagingSenderId: "81132660105"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();

  const sharedMethods = {
    // FIXME: I would prefer this to be a `toggle` event listener on the <details>,
    // but I don't want this to fire if `toggleAllYears` is used.
    toggleIndividual: function (event) {
      const parentNode = event.target.parentNode;
      const offsetGap = 50;
      if (parentNode.open) {
        window.scrollTo(0, $(parentNode).offset().top - offsetGap);
      }
    },
    buildCardString: function (card) {
      let baseString = card.year + ' ' + card.set + ' #' + card.number;
      if (card.other_info != '') {
        baseString += ' ' + card.other_info;
      }
      if (card.other_players != '') {
        baseString += ' w/' + card.other_players;
      }
      if (card.serial_numbered != '') {
        let serialNumbered = card.serial_numbered;
        if (Array.isArray(serialNumbered)) {
          serialNumbered = serialNumbered.join(', ');
          let lastCommma = serialNumbered.lastIndexOf(', ');
          serialNumbered = serialNumbered.substring(0, lastCommma) + '' + serialNumbered.substring(lastCommma + 2);
        }
        baseString += ' ' + serialNumbered;
      }
      if (card.grade != '') {
        let grade = card.grade;
        if (Array.isArray(grade)) {
          grade = grade.join(', ');
        }
        baseString += ' ' + grade;
      }
      return baseString;
    },
    buildHashData: function (card) {
      let cardSet = card.set;
      if (cardSet.indexOf('/') > 0) {
        cardSet = cardSet.replace(/\//g, '');
      }
      return card.year + '-' + cardSet.replace(/\s+/g, '-').toLowerCase();
    },
    openFirstLink: function (event) {
      event.preventDefault();
      $('a[data-caption="' + event.target.alt + '"]').trigger('click');
    }
  }

  const DetailsComponent = {
    template: `
    <details class="details-year" :open="localStorage.isOpen">
      <summary class="details-year__summary" @click="toggleIndividual">
        <svg role="presentation" class="details-year__toggle" xmlns="http://www.w3.org/2000/svg" height="40"
          width="40" viewBox="0 0 40 40">
          <rect class="details-year__toggle-border" stroke-linejoin="round" height="40" width="40"
            stroke="#206287" stroke-linecap="round" stroke-width="4" fill="#fff"></rect>
          <g class="details-year__toggle-plus-wrapper">
            <rect class="details-year__toggle-vertical-line" height="25" width="4" y="7" x="18" stroke-width="0"
              fill="#206287"></rect>
            <rect class="details-year__toggle-horizontal-line" transform="matrix(0,-1,-1,0,0,0)" height="25"
              width="4" y="-32" x="-22" stroke-width="0" fill="#206287"></rect>
          </g>
        </svg>
        <h2 class="details-year__summary-header">{{Object.values(card)[0].total}}</h2>
      </summary>
      <ol class="yearGroup figure-list">
        <li v-for="card in Object.values(card)[0].all_cards">
          <figure class="figure-list__figure">
            <figcaption class="figure-list__caption">
              <span>{{buildCardString(card)}}</span>
            </figcaption>
            <div v-if="card.img_src === ''" class="image-unavailable">
              <svg role="presentation" class="image-unavailable__svg" viewBox="0 0 32 32">
                <use xlink:href="#image-unavailable__svg" />
              </svg>
              <strong class="image-unavailable__caption">Image available eventually</strong>
            </div>
            <a v-else-if="card.img_src != '' && !Array.isArray(card.img_src)" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="card.img_src">
              <img alt="" :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']">
            </a>
            <a v-else v-for="img in card.img_src" aria-label="Open Image in Gallery" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="img">
              <img alt="" :data-src="img" :class="[card.img_size, 'lazyload', 'thumbnail']">
            </a>
          </figure>
        </li>
      </ol>
    </details>
    `,
    props: {
      card: {}
    },
    methods: sharedMethods
  };

  const DetailsNoThumbnailsComponent = {
    template: `
    <details class="details-year" :open="localStorage.isOpen">
      <summary class="details-year__summary" @click="toggleIndividual">
        <svg role="presentation" class="details-year__toggle" xmlns="http://www.w3.org/2000/svg" height="40"
          width="40" viewBox="0 0 40 40">
          <rect class="details-year__toggle-border" stroke-linejoin="round" height="40" width="40"
            stroke="#206287" stroke-linecap="round" stroke-width="4" fill="#fff"></rect>
          <g class="details-year__toggle-plus-wrapper">
            <rect class="details-year__toggle-vertical-line" height="25" width="4" y="7" x="18" stroke-width="0"
              fill="#206287"></rect>
            <rect class="details-year__toggle-horizontal-line" transform="matrix(0,-1,-1,0,0,0)" height="25"
              width="4" y="-32" x="-22" stroke-width="0" fill="#206287"></rect>
          </g>
        </svg>
        <h2 class="details-year__summary-header">{{Object.values(card)[0].total}}</h2>
      </summary>
      <div class="p">
				<ol class="yearGroup numbered-list">
          <li v-for="card in Object.values(card)[0].all_cards">
            <span v-if="card.img_src === ''">
              {{buildCardString(card)}}
            </span>
            <a v-else-if="card.img_src != '' && !Array.isArray(card.img_src)" data-fancybox="gallery" class="inserts" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="card.img_src">
              {{buildCardString(card)}}
            </a>
            <a v-else aria-label="Open Image in Gallery" class="inserts" data-fancybox="gallery" :data-hash="buildHashData(card)" :data-caption="buildCardString(card)" :href="card.img_src[0]">
              {{buildCardString(card)}}
            </a>
          </li>
        </ol>
        <ul class="imgColumn">
          <li v-for="card in Object.values(card)[0].all_cards.filter((card) => {return card.img_src != ''})">
            <a v-if="card.img_src != '' && !Array.isArray(card.img_src)" @click="openFirstLink" aria-label="Open Image in Gallery" :href="card.img_src">
              <img alt="" :data-src="card.img_src" :class="[card.img_size, 'lazyload', 'thumbnail']" :alt="buildCardString(card)">
            </a>
            <a v-else-if="card.img_src != '' && Array.isArray(card.img_src)" @click="openFirstLink" class="activate-gallery" aria-label="Open Image in Gallery" :href="card.img_src[0]">
              <img alt="" :data-src="card.img_src[0]" :class="[card.img_size, 'lazyload', 'thumbnail']" :alt="buildCardString(card)">
            </a>
          </li>
        </ul>
      </div>
    </details>
    `,
    props: {
      card: {}
    },
    methods: sharedMethods
  };

  window.app = new Vue({
    el: '#wrapper',
    components: {
      'details-component': DetailsComponent,
      'details-no-thumbnails-component': DetailsNoThumbnailsComponent
    },
    data: {
      allCards: [],
      yearsRange: 'loading...',
      overallTotal: 'loading...',
      lastUpdated: 'loading...',
      ISODate: '',
      menuIsOpen: false
    },
    created: function () {
      category = document.getElementById('wrapper').dataset.category;
      db.collection('cards/cards_document/cards_subcollection').doc(category).get().then((snapshot) => {
        this.allCards = snapshot.data()['all_cards_by_years'];
        this.overallTotal = snapshot.data()['overall_total'];
        const date = snapshot.data()['last_updated'].toDate();
        this.ISODate = date.toISOString();
        this.lastUpdated = this.buildLastUpdated(date);
        this.yearsRange = this.buildYearsRange();
      });
    },
    updated: function () {
      this.startFancybox();
      this.triggerFancyboxHash();
      $(window).on('hashchange', this.triggerFancyboxHash);
    },
    methods: {
      buildLastUpdated: function (data) {
        return data.toLocaleDateString('en-US',
          { year: 'numeric', month: 'short', day: 'numeric' });
      },
      buildYearsRange: function () {
        let allCards = this.allCards;
        return Object.keys(allCards[0])[0] + ' - ' + Object.keys(allCards[allCards.length - 1])[0];
      },
      startFancybox: function () {
        // TODO: Possibly find a way to remove the appended index number in the custom `data-hash`
        // without messing up the back button and history.
        $('[data-fancybox="gallery"]').fancybox({
          loop: true,
          animationEffect: 'fade',
          animationDuration: 300,
          buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
          ]
        });
      },
      triggerFancyboxHash: function () {
        let hash = window.location.hash
        if (hash != '') {
          hash = hash.replace(hash, hash.substr(1));
          let parts = hash.split('-');
          parts.pop();
          hash = parts.join('-');
          $('a[data-hash=' + hash + ']').trigger('click');
        }
      },
      toggleAllYears: function (open) {
        $('.details-year').prop('open', open);
        if (open) {
          return localStorage.setItem('isOpen', open);
        }
          return localStorage.removeItem('isOpen');
      },
      toggleMenuButton: function () {
        if (this.menuIsOpen) {
          return this.menuIsOpen = false
        }
        return this.menuIsOpen = true;
      }
    }
  });
});
