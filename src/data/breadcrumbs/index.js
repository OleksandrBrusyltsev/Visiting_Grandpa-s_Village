export const breadcrumbs = [
    {
      id: 0,
      link: "",
      text: "ГОЛОВНА",
    },
    {
      id: 1,
      link: "houses",
      text: "ЖИТИ",
      subNav: 'custom'
    },
    { 
      id: 2, 
      link: "dishes", 
      text: "ЇСТИ" 
    },
    {
      id: 3,
      link: "leisure",
      text: "БАЙДИКУВАТИ",
    },
    {
      id: 4,
      link: "memories",
      text: "СПОГАДИ",
      subNav: 'custom'
    },
    {
      id: 5,
      link: "contacts",
      text: "ЗНАЙТИ МЕНЕ",
    },
    {
      id: 6,
      link: "booking",
      text: "ЗАВІТАТИ",
      subNav: [
        {
          id: 1,
          link: "options",
          text: "варіанти бронювань",
        },
        {
          id: 2,
          link: "payment",
          text: "оплата",
        },
        {
          id: 3,
          link: "rules",
          text: "Умови бронювання та правила перебування",
        }
      ]
    },
  ];