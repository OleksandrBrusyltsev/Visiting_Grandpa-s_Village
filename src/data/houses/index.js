export const houses = [
  {
    name: "hatynka-dida-moroza",
    title: [
      {
        language: "uk",
        text: "Хатинка Діда Мороза",
      },
      {
        language: "en",
        text: "Hatynka Dida Moroza",
      },
    ],
    rental_price: 1300,

    // for booking component on the house page: {adult: number,child: number,} - if elsewhere except of Horomy rooms max_children > 0
    price_addons: false,

    max_adults: 2,
    max_children: 0,
    rooms: [],
    photoDecor: "/images/houses/house/decor/hatynka-dida-moroza.svg",
    swiper: [
      "/images/houses/house/hatynka-dida-moroza/hatynka-dida-moroza-1-1.png",
      "/images/houses/house/hatynka-dida-moroza/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/hatynka-dida-moroza/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345875/ivo9lsgtpu8sdxgfexje.jpg",
    ],
    text: `Запрошую тебе в чарівну **хатинку Діда Мороза**. Це місце, де в справжній казці зливаються екологічність та відпочинок в комфортних умовах. В Хатинці є все, що потрібно: **ванна кімната з душем та туалетом, холодильник і телевізор.**\n\n Наша хатинка розташована серед природи, в обіймах пишних ялинок та зелених дерев. Фасад оформлений **натуральними матеріалами**, включаючи дерево та природні складники. Декорування відображає **традиційний стиль українського села**, що приваблює як маленьких так і великих гостей.\n\n Усередині хатинки тебе чекає затишне приміщення, розраховане на **2 людей**. Там кожна деталь наповнена моєю турботою.\n\n В зимовий період Хатинка Дідуся наповнюється особливо теплою атмосферою, бо я придумав створити в середині **Баньку**, щоб мої відвідувачі змогли розслабитись та сповна насолодитись часом, проведеним в Еко-садибі “На селі у Дідуся”.`,
    id: 0,
    coordinates: {
      topSmall: 45,
      leftSmall: 130,
      topSmallDifference: 45,
      leftSmallDifference: 170,
      topMedium: 90,
      leftMedium: 300,
      topMediumDifference: 50,
      leftMediumDifference: 200,
      topLarge: 140,
      leftLarge: 500,
    },
  },
  {
    name: "svitlytsia",
    title: [
      {
        language: "uk",
        text: "Світлиця",
      },
      {
        language: "en",
        text: "Svitlytsia",
      },
    ],
    rental_price: 1300,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 2,
    max_children: 1,
    rooms: [],
    photoDecor: "/images/houses/house/decor/svitlytsia.svg",
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/svitlytsia-2.png",
      "/images/houses/house/svitlytsia/svitlytsia-3.png",
      "/images/houses/house/svitlytsia/svitlytsia-4.png",
      "/images/houses/house/svitlytsia/svitlytsia-5.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345880/lsltjnm01dbek1jb05od.jpg",
    ],
    text: `Запрошую тебе в унікальну оселю "Світлиця" у нашій Еко-садибі "На селі у Дідуся". Це місце, де затишок і екологічність переплітаються з комфортом, створюючи неповторну атмосферу справжньої казки для наших гостей.\n\n В "Світлиці" є все, що потрібно для приємного відпочинку: зручна спальня для двох осіб, повністю обладнана ванна кімната з душем та туалетом, холодильник і телевізор. Кожна деталь внутрішнього приміщення пронизана моєю турботою про гостей.\n\n Розташована "Світлиця" серед буйного зеленого лісу та величних ялин, що надає нашій садибі неповторності. Фасад виконаний з натуральних матеріалів - дерева та інших природних елементів, що підкреслює її органічність та злагодженість з природою.\n\n Декор "Світлиці" відображає традиційний український стиль, який приваблює і дітей, і дорослих своєю автентичністю та затишком.\n\n Особливо у зимовий період "Світлиця" сповнюється теплою атмосферою. Я вирішив здивувати наших гостей, створивши в середині справжню баньку, де можна розслабитись і насолодитись моментом відпочинку після насиченого дня.\n\n Запрошую тебе відвідати "Світлицю" у нашій Еко-садибі "На селі у Дідуся", де кожен момент стає особливим, а кожен гість - цінним членом нашої родини.`,
    id: 1,
    coordinates: {
      topSmall: 30,
      leftSmall: 190,
      topSmallDifference: 30,
      leftSmallDifference: 210,
      topMedium: 60,
      leftMedium: 400,
      topMediumDifference: 30,
      leftMediumDifference: 260,
      topLarge: 90,
      leftLarge: 660,
    },
  },
  {
    name: "hatynka-babky-izhachky",
    title: [
      {
        language: "uk",
        text: "Хатинка Бабки-Їжачки",
      },
      {
        language: "en",
        text: "Hatynka Babky Izhachky",
      },
    ],
    rental_price: 950,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 2,
    max_children: 1,
    rooms: [],
    photoDecor: "/images/houses/house/decor/hatynka-babky-izhachky.svg",
    swiper: [
      "/images/houses/house/hatynka-babky-izhachky/hatynka-babky-izhachky-1.png",
      "/images/houses/house/hatynka-babky-izhachky/hatynka-babky-izhachky-2.png",
      "/images/houses/house/hatynka-babky-izhachky/hatynka-babky-izhachky-3.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345875/ydij7hsodfgc8yvlnil6.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 2,
    coordinates: {
      topSmall: 60,
      leftSmall: 290,
      topSmallDifference: 45,
      leftSmallDifference: 275,
      topMedium: 105,
      leftMedium: 565,
      topMediumDifference: 55,
      leftMediumDifference: 355,
      topLarge: 160,
      leftLarge: 920,
    },
  },
  {
    name: "komora-de-lyuks",
    title: [
      {
        language: "uk",
        text: "Комора Де Люкс",
      },
      {
        language: "en",
        text: "Komora De Lyuks",
      },
    ],
    rental_price: 1300,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 2,
    max_children: 1,
    rooms: [],
    photoDecor: "/images/houses/house/decor/komora-de-lyuks.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345877/rrg5nwgx6ppba6qpdck8.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 3,
    coordinates: {
      topSmall: 80,
      leftSmall: 70,
      topSmallDifference: 60,
      leftSmallDifference: 130,
      topMedium: 140,
      leftMedium: 200,
      topMediumDifference: 70,
      leftMediumDifference: 150,
      topLarge: 210,
      leftLarge: 350,
    },
  },
  {
    name: "opochyvalnia",
    title: [
      {
        language: "uk",
        text: "Опочивальня",
      },
      {
        language: "en",
        text: "Opochyvalnia",
      },
    ],
    rental_price: 1300,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 2,
    max_children: 1,
    rooms: [],
    photoDecor: "/images/houses/house/decor/opochyvalnia.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345879/oe1zuqlg9k5mg36vqy0n.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 4,
    coordinates: {
      topSmall: 60,
      leftSmall: 95,
      topSmallDifference: 50,
      leftSmallDifference: 155,
      topMedium: 110,
      leftMedium: 250,
      topMediumDifference: 60,
      leftMediumDifference: 180,
      topLarge: 170,
      leftLarge: 430,
    },
  },
  {
    name: "hornytsia",
    title: [
      {
        language: "uk",
        text: "Горниця",
      },
      {
        language: "en",
        text: "Hornytsia",
      },
    ],
    rental_price: 1300,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 2,
    max_children: 1,
    rooms: [],
    photoDecor: "/images/houses/house/decor/hornytsia.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345876/x8byu9uxfuau78na6k1t.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 5,
    coordinates: {
      topSmall: 15,
      leftSmall: 125,
      topSmallDifference: 30,
      leftSmallDifference: 170,
      topMedium: 45,
      leftMedium: 295,
      topMediumDifference: 30,
      leftMediumDifference: 205,
      topLarge: 75,
      leftLarge: 500,
    },
  },
  {
    name: "maisternia-hnomiv",
    title: [
      {
        language: "uk",
        text: "Майстерня Гномів",
      },
      {
        language: "en",
        text: "Maisternia Hnomiv",
      },
    ],
    rental_price: 1800,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 5,
    max_children: 0,
    rooms: [],
    photoDecor: "/images/houses/house/decor/maisternia-hnomiv.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345878/zkesaqmdsfsk2ofwzy4n.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 6,
    coordinates: {
      topSmall: 90,
      leftSmall: 265,
      topSmallDifference: 70,
      leftSmallDifference: 255,
      topMedium: 160,
      leftMedium: 520,
      topMediumDifference: 90,
      leftMediumDifference: 330,
      topLarge: 250,
      leftLarge: 850,
    },
  },
  {
    name: "teremok",
    title: [
      {
        language: "uk",
        text: "Теремок",
      },
      {
        language: "en",
        text: "Teremok",
      },
    ],
    rental_price: 750,
    price_addons: false,
    max_adults: 2,
    max_children: 0,
    rooms: [],
    photoDecor: "/images/houses/house/decor/teremok.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345881/esdertz6nrzd0kucpsgr.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 7,
    coordinates: {
      topSmall: 60,
      leftSmall: 240,
      topSmallDifference: 55,
      leftSmallDifference: 245,
      topMedium: 115,
      leftMedium: 485,
      topMediumDifference: 65,
      leftMediumDifference: 315,
      topLarge: 180,
      leftLarge: 800,
    },
  },
  {
    name: "khoromy",
    title: [
      {
        language: "uk",
        text: "Хороми",
      },
      {
        language: "en",
        text: "Khoromy",
      },
    ],
    rental_price: 0,
    price_addons: {
      adult: 200,
      child: 150,
    },
    max_adults: 0,
    max_children: 0,
    rooms: [
      {
        name: "hornytsia",
        title: [
          {
            language: "uk",
            text: "Горниця",
          },
          {
            language: "en",
            text: "Hornytsia",
          },
        ],
        rental_price: 1300,
        price_addons: {
          adult: 200,
          child: 150,
        },
        max_adults: 2,
        max_children: 1,
        rooms: [],
        // fake
        photoDecor: "/images/houses/house/decor/teremok.svg",
        // fake
        swiper: [
          "/images/houses/house/svitlytsia/svitlytsia-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
        ],
        photo: [
          "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345876/x8byu9uxfuau78na6k1t.jpg",
        ],
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
        id: 5,
        coordinates: {
          topSmall: 35,
          leftSmall: 235,
          topSmallDifference: 35,
          leftSmallDifference: 245,
          topMedium: 70,
          leftMedium: 480,
          topMediumDifference: 40,
          leftMediumDifference: 300,
          topLarge: 110,
          leftLarge: 780,
        },
      },
      {
        name: "hornytsia",
        title: [
          {
            language: "uk",
            text: "Горниця",
          },
          {
            language: "en",
            text: "Hornytsia",
          },
        ],
        rental_price: 1300,
        price_addons: {
          adult: 200,
          child: 150,
        },
        max_adults: 2,
        max_children: 1,
        rooms: [],
        // fake
        photoDecor: "/images/houses/house/decor/teremok.svg",
        // fake
        swiper: [
          "/images/houses/house/svitlytsia/svitlytsia-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
        ],
        photo: [
          "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345876/x8byu9uxfuau78na6k1t.jpg",
        ],
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
        id: 5,
        coordinates: {
          topSmall: 35,
          leftSmall: 235,
          topSmallDifference: 35,
          leftSmallDifference: 245,
          topMedium: 70,
          leftMedium: 480,
          topMediumDifference: 40,
          leftMediumDifference: 300,
          topLarge: 110,
          leftLarge: 780,
        },
      },
      {
        name: "hornytsia",
        title: [
          {
            language: "uk",
            text: "Горниця",
          },
          {
            language: "en",
            text: "Hornytsia",
          },
        ],
        rental_price: 1300,
        price_addons: {
          adult: 200,
          child: 150,
        },
        max_adults: 2,
        max_children: 1,
        rooms: [],
        // fake
        photoDecor: "/images/houses/house/decor/teremok.svg",
        // fake
        swiper: [
          "/images/houses/house/svitlytsia/svitlytsia-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
          "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
        ],
        photo: [
          "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345876/x8byu9uxfuau78na6k1t.jpg",
        ],
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
        id: 5,
        coordinates: {
          topSmall: 35,
          leftSmall: 235,
          topSmallDifference: 35,
          leftSmallDifference: 245,
          topMedium: 70,
          leftMedium: 480,
          topMediumDifference: 40,
          leftMediumDifference: 300,
          topLarge: 110,
          leftLarge: 780,
        },
      },
    ],
    // fake
    photoDecor: "/images/houses/house/decor/khoromy.svg",
    // fake
    swiper: [
      "/images/houses/house/svitlytsia/svitlytsia-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-2-1.png",
      "/images/houses/house/svitlytsia/hatynka-dida-moroza-3-1.png",
    ],
    photo: [
      "https://res.cloudinary.com/dzbm3urzv/image/upload/v1720345877/czorzi3frevroezpzv45.jpg",
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat qui dolorum corrupti ab nisi impedit, ad, exercitationem repellendus saepe iste dolorem ipsam! Doloribus, eum sed! Ad quam assumenda eveniet accusantium?",
    id: 8,
    coordinates: {
      topSmall: 35,
      leftSmall: 235,
      topSmallDifference: 35,
      leftSmallDifference: 245,
      topMedium: 70,
      leftMedium: 480,
      topMediumDifference: 40,
      leftMediumDifference: 300,
      topLarge: 110,
      leftLarge: 780,
    },
  },
];
