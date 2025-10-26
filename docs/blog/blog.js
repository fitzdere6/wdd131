const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description:
      'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Book cover for Septimus Heap 1',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '****'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description:
      'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc:
      'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Book cover for Magnus Chase 1',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 3,
    title: 'Belgariad Book One: Pawn of Prophecy',
    date: 'Feb 12, 2022',
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf—a father and daughter granted near-immortality by one of the Gods—set out on a complex mission.",
    imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
    imgAlt: 'Book cover for Pawn of Prophecy',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐⭐'
  }
];

(function () {
  const host = document.getElementById('posts');
  if (!host) {
    console.error('No #posts container found.');
    return;
  }

  const toISO = (s) => {
    const d = new Date(s);
    if (isNaN(d)) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const normalizeStars = (s) => {
    if (/★|⭐/.test(s)) {
      const count = (s.match(/★|⭐/g) || []).length;
      return { text: s, count };
    }
    const count = (s.match(/\*/g) || []).length;
    return { text: '★'.repeat(count) + '☆'.repeat(5 - count), count };
  };

  const articleHTML = (a) => {
    const iso = toISO(a.date);
    const { text: stars, count } = normalizeStars(a.stars);
    return `
      <article class="post">
        <aside class="meta">
          <p class="date"><time ${iso ? `datetime="${iso}"` : ''}>${a.date}</time></p>
          <p class="age">${a.ages}</p>
          <p class="genre">${a.genre}</p>
          <p class="rating" aria-label="Rating: ${count} out of 5 stars" title="${count}/5">${stars}</p>
        </aside>
        <div class="content">
          <h2 class="title"><a href="#" rel="bookmark">${a.title}</a></h2>
          <figure class="cover"><img src="${a.imgSrc}" alt="${a.imgAlt}"></figure>
          <p class="excerpt">${a.description} <a class="readmore" href="#">Read More…</a></p>
        </div>
      </article>
    `;
  };

  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  host.innerHTML = sorted.map(articleHTML).join('');
})();
