import {
  faGrid5,
  faListUl,
  faScaleBalanced,
  faUser,
  // faUsers,
  faWandSparkles,
} from "@fortawesome/pro-regular-svg-icons";

export const navItems = {
  footer: [
    { name: "About", link: "/about" },
    { name: "Impressum", link: "/impressum" },
    { name: "Datenschutz", link: "/datenschutz" },
  ],
  navBar: [
    {
      name: "Play",
      icon: faGrid5,
      link: "/",
      subItems: [
        { name: "Game 1", link: "/" },
        { name: "Game 2 a game I played with my friends", link: "/" },
      ],
    },
    { name: "Lists", icon: faListUl, link: "/entrylist" },
    { name: "My Game", icon: faWandSparkles, link: "/game" },
    // { name: "Social", icon: faUsers, link: "" },
    { name: "User", icon: faUser, link: "/user" },
    {
      name: "About",
      icon: faScaleBalanced,
      link: "/impressum",
      subItems: [
        { name: "About", link: "/about" },
        { name: "Impressum", link: "/impressum" },
        { name: "Datenschutz", link: "/datenschutz" },
      ],
    },
  ],
};
