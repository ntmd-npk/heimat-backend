const PostsUsers = [
  {
    user_id: 1,
    blogs: [
      
      {
        _id: 2,
        title: "Anatomy of a Casual Date Night",
        content: `<p><strong>Wear something that feels good.</strong> For a Saturday night out, I sometimes wear a dress (how gorgeous is this one?!), but on a weeknight, I like to keep things feeling cool and casual. I pull on a cotton shirt with a berry print, swipe a tinted oil on my lips, and choose boyfriend jeans for a laid-back vibe.</p>`,
        created_date: "1/1/2022",
        upvote: 30,
        downvote: 5,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "I like to keep things feeling cool and casual.",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 1,
        description: "I like to keep things feeling cool and casual.",
        cover:
          "https://previews.123rf.com/images/eugenesergeev/eugenesergeev1306/eugenesergeev130600053/20095244-abstract-architecture-3d-background-with-perspective-view-of-blue-corridor-construction.jpg",
      },
      {
        _id: 3,
        title: "Whoa, Is This the Best Marriage Advice?",
        content: `<p>It was four months after my daughter was born when…</p><h2>Title</h2><p>I started to feel like I was losing myself. When I looked in the mirror, I no longer saw a bubbly, chatty woman, who lived to wear cute outfits and had enough energy to bake a new recipe after a full workday and three-hour commute.</p><p><br></p><ol><li class="ql-indent-3">One</li><li class="ql-indent-3">Two</li><li class="ql-indent-3">Three</li></ol><p><br></p><ul><li class="ql-indent-1 ql-align-justify">Instead, I saw frizzy hair peeking out of a baseball cap, a T-shirt soaked with milk, and a person who barely had enough stamina to make it through the day with her baby, let alone do anything else. Dishes piled up in the sink. Laundry was scattered all over the bedroom floor. And the thought of spending 30 minutes doing my hair and makeup or putting together an outfit no longer sounded fun. It just sounded wasteful.&nbsp;<em>Why use that precious time to make myself look presentable when I could catch up on sleep?</em></li></ul>`,
        created_date: "1/1/2022",
        upvote: 25,
        downvote: 7,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 2,
        description: "The other day, I was getting grumpy...",
        cover:
          "https://previews.123rf.com/images/eugenesergeev/eugenesergeev1403/eugenesergeev140300028/26350008-abstract-white-room-3d-interior-with-cubes-in-the-corner.jpg",
      },
      {
        _id: 4,
        title: "Have a Loving Weekend.",
        content: `<p>How are you doing this weekend? The news this week has been terrifying, and we are thinking every moment of the people of Ukraine. Here is a&nbsp;<a href="https://www.newyorker.com/books/double-take/russias-war-on-ukraine-in-context" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">New Yorker explainer</a>, if you’d like to read more, and here are&nbsp;<a href="https://www.globalcitizen.org/en/content/ways-to-help-ukraine-conflict/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">eight ways to help</a>. Please join us, if you can, in donating to the&nbsp;<a href="https://help.rescue.org/donate/ukraine-acq" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">International Rescue Committee</a>. We are also standing tall with the LGBTQ+ communities in&nbsp;<a href="https://www.nbcnews.com/nbc-out/out-politics-and-policy/texas-ag-says-transition-care-minors-child-abuse-state-law-rcna17176" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Texas</a>&nbsp;and&nbsp;<a href="https://www.nbcmiami.com/news/local/florida-house-passes-dont-say-gay-bill/2699251/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Florida</a>. We see you and will fight for you. Squeeze your loved ones, and stay safe this weekend.</p><p>If you’re in a blog-reading mood, here are a few links from around the web…</p><p><a href="http://www.dinneralovestory.com/cabbage-onion-tart/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Cabbage onion tart</a>.</p><p><a href="https://cupcakesandcashmere.com/lifestyle/how-my-first-year-as-a-single-dog-owner-changed-my-life" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">How being a single dog owner</a>&nbsp;changed my life.</p><p>Wow, I love&nbsp;<a href="https://instagram.com/joylabinjo" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">this painter’s work</a>.</p><p><a href="https://www.thekitchn.com/lasagna-recipe-reviews-23088991" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Which lasagna is the best lasagna</a>?</p><p><a href="https://www.penguinrandomhouse.com/books/688897/love-in-the-library-by-maggie-tokuda-hall-illustrated-by-yas-imamura/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Love in the Library</a>&nbsp;is a children’s book about finding love in a Japanese incarceration camp.</p><p>How gorgeous is&nbsp;<a href="https://www.houseandgarden.co.uk/gallery/dan-pearson-garden" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">this English garden</a>?</p><p><a href="https://www.instagram.com/p/CaZ9UgllYnw/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">It’s Anton</a>.</p><p>Foggy&nbsp;<a href="https://www.thisiscolossal.com/2022/02/joshua-singh-street-photography/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">San Francisco</a>.</p><p><a href="https://people.com/pets/photographer-captures-dogs-trying-to-catch-cheese-photos/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Dogs catching cheese</a>&nbsp;is the ultimate pick-me-up.</p><p>Plus, a great reader comment:</p><p>Says Jenny on&nbsp;<a href="https://cupofjo.com/2022/02/older-age-accomplishments/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">life’s a party, not a race</a>: “I have wasted years — YEARS! — of my one wild and precious life worrying about being late for milestones. What an utter crock of bullshite I stewed up for myself when I could’ve been idly flirting with the man with silver hair and tattooed forearms who works at the bakery! At 33, I’m proudly graduating medical school. I’m tired of the tyranny of my own internalized narrowness making me feel late when it’s my goddamn party to begin with. This particular party has a naked ring finger but also an old, sweet dog, a bed stand full of weird books, a supper table that is often filled with friends and festivals of dips, and rather a lot of very good coffee. I’m going to flirt outrageously with Hot Bakery Man and let myself enjoy all of this goodness with less scraggly worries about that to which I am allegedly late. I’m here, plump, succulent, vivacious, good at crosswords, no longer taking my own shit.”</p><p>(Photo by&nbsp;<a href="https://www.kariherer.com/florals" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(236, 58, 35);">Kari Herer</a>.)</p><p><em>Note: If you buy something through our links, we may earn an affiliate commission, at no cost to you. We recommend only products we genuinely like. Thank you so much.</em></p><pre class="ql-syntax" spellcheck="false">eeeeeeeeeefegggggggggg </pre>`,
        created_date: "1/1/2022",
        upvote: 12,
        downvote: 10,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 4,
        description: "I wanted to check out the buzzy book — and envy.",
        cover:
          "https://previews.123rf.com/images/milkos/milkos2101/milkos210101990/161953970-mature-woman-in-face-mask-approving-of-covid-19-vaccination-showing-thumb-up-gesture-during-coronavi.jpg",
      },
      {
        _id: 5,
        title: "Life’s a Party, Not a Race",
        content:
          "<p>Some months back, a friend sent me a debut novel she’d read and loved. It had a splashy cover with a jaunty typeface, like the literary equivalent of a Fanta commercial.</p><p>My reaction was a mix of interest — of course I wanted to check out the buzzy book — and envy. Another twenty-something wunderkind author.&nbsp;<em>How do they do it?</em>&nbsp;I wondered.&nbsp;<em>How do they find the focus? What wisdom do they draw upon when they’ve only been alive for, like, five minutes?</em>&nbsp;I pictured the “about the author” page, a cherubic face smiling atop a list of prodigious accomplishments. Because I am apparently a masochist, I looked them up. The author was in their 50s.</p>",
        created_date: "1/1/2022",
        upvote: 10,
        downvote: 2,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 3,
        description: "Some months back, a friend sent me a debut novel she’d read and loved.",
        cover:
          "https://previews.123rf.com/images/powerbeephoto/powerbeephoto2106/powerbeephoto210600020/169691242-.jpg",
      },
      {
        _id: 6,
        title: "What’s Your Best Kitchen Hack?",
        content:
          "<p>Some months back, a friend sent me a debut novel she’d read and loved. It had a splashy cover with a jaunty typeface, like the literary equivalent of a Fanta commercial.</p><p>My reaction was a mix of interest — of course I wanted to check out the buzzy book — and envy. Another twenty-something wunderkind author.&nbsp;<em>How do they do it?</em>&nbsp;I wondered.&nbsp;<em>How do they find the focus? What wisdom do they draw upon when they’ve only been alive for, like, five minutes?</em>&nbsp;I pictured the “about the author” page, a cherubic face smiling atop a list of prodigious accomplishments. Because I am apparently a masochist, I looked them up. The author was in their 50s.</p>",
        created_date: "1/1/2022",
        upvote: 30,
        downvote: 3,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 2,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/tomwang/tomwang2102/tomwang210200042/164297138-doctor-injecting-vaccine-for-students-in-high-school.jpg",
      },
      {
        _id: 7,
        title: "What’s Your Best Kitchen Hack?",
        content: `<p class="ql-align-center">Bao giờ cho đến ngày xưa?</p><p class="ql-align-center">Để tôi lại được kiếm 500 triệu đồng</p><p class="ql-align-center"><br></p><p class="ql-align-right"><strong><em>mydestine</em></strong></p>`,
        created_date: "1/1/2022",
        upvote: 25,
        downvote: 7,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 0,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
      {
        _id: 8,
        title: "What’s Your Best Kitchen Hack?",
        content: `<p class="ql-align-center">Bao giờ cho đến ngày xưa?</p><p class="ql-align-center">Để tôi lại được kiếm 500 triệu đồng</p><p class="ql-align-center"><br></p><p class="ql-align-right"><strong><em>mydestine</em></strong></p>`,
        created_date: "1/1/2022",
        upvote: 12,
        downvote: 10,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 0,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
    ],
  },
  {
    user_id: 2,
    blogs: [
      {
        _id: 1,
        title: "Life’s a Party, Not a Race",
        content:
          "<p>Some months back, a friend sent me a debut novel she’d read and loved. It had a splashy cover with a jaunty typeface, like the literary equivalent of a Fanta commercial.</p><p>My reaction was a mix of interest — of course I wanted to check out the buzzy book — and envy. Another twenty-something wunderkind author.&nbsp;<em>How do they do it?</em>&nbsp;I wondered.&nbsp;<em>How do they find the focus? What wisdom do they draw upon when they’ve only been alive for, like, five minutes?</em>&nbsp;I pictured the “about the author” page, a cherubic face smiling atop a list of prodigious accomplishments. Because I am apparently a masochist, I looked them up. The author was in their 50s.</p>",
        created_date: "1/1/2022",
        upvote: 10,
        downvote: 2,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 1,
        description: "Some months back, a friend sent me a debut novel she’d read and loved.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
      {
        _id: 2,
        title: "What’s Your Best Kitchen Hack?",
        content:
          "<p>Some months back, a friend sent me a debut novel she’d read and loved. It had a splashy cover with a jaunty typeface, like the literary equivalent of a Fanta commercial.</p><p>My reaction was a mix of interest — of course I wanted to check out the buzzy book — and envy. Another twenty-something wunderkind author.&nbsp;<em>How do they do it?</em>&nbsp;I wondered.&nbsp;<em>How do they find the focus? What wisdom do they draw upon when they’ve only been alive for, like, five minutes?</em>&nbsp;I pictured the “about the author” page, a cherubic face smiling atop a list of prodigious accomplishments. Because I am apparently a masochist, I looked them up. The author was in their 50s.</p>",
        created_date: "1/1/2022",
        upvote: 30,
        downvote: 5,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 1,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
      {
        _id: 3,
        title: "What’s Your Best Kitchen Hack?",
        content: `<p class="ql-align-center">Bao giờ cho đến ngày xưa?</p><p class="ql-align-center">Để tôi lại được kiếm 500 triệu đồng</p><p class="ql-align-center"><br></p><p class="ql-align-right"><strong><em>mydestine</em></strong></p>`,
        created_date: "1/1/2022",
        upvote: 25,
        downvote: 7,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 1,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
      {
        _id: 4,
        title: "What’s Your Best Kitchen Hack?",
        content: `<p class="ql-align-center">Bao giờ cho đến ngày xưa?</p><p class="ql-align-center">Để tôi lại được kiếm 500 triệu đồng</p><p class="ql-align-center"><br></p><p class="ql-align-right"><strong><em>mydestine</em></strong></p>`,
        created_date: "1/1/2022",
        upvote: 12,
        downvote: 10,
        listComment: [
          {
            _id: 1,
            from_user_id: 1,
            content: "This is comment",
            created_date: "1/1/20022",
            upvote: 1,
            downvote: 0,
          },
        ],
        category_id: 1,
        description:
          "Our best tricks, including how to get ketchup to pour right out of the bottle.",
        cover:
          "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
      },
    ],
  },
];

module.exports = PostsUsers;
