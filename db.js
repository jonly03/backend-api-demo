const DB = [
  {
    id: "817379890",
    name: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1542654071-7ded22488685?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWlmZmVsJTIwdG93ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60",
    description: "Romantic gateway",
  },
  {
    id: "9748377540",
    name: "The Needle",
    location: "Seattle",
    photo:
      "https://images.unsplash.com/photo-1542223616-740d5dff7f56?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGhlJTIwbmVlZGxlJTIwc2VhdHRsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60",
    description: "Downtown Seattle",
  },
];

const UIDs = {
  817379890: true,
  9748377540: true,
};

exports.destinations = DB;
exports.UIDs = UIDs;
