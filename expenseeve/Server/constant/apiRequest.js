var apiRequest = {
  auth: {
    login: {
      url: "/user/login",
      vFlag: 0,
      mandatory: []
    },
    logout: {
      url: "/user/logout",
      vFlag: 0,
      mandatory: []
    }
  },
  post: {
    createUser: {
      url: "/user/create",
      vFlag: 0,
      mandatory: []
    },
    updateBudget: {
      url: "/budget/update",
      vFlag: 0,
      mandatory: []
    },
    createCategory: {
      url: "/category/create",
      vFlag: 0,
      mandatory: []
    },
    listCategory: {
      url: "/category/list",
      vFlag: 0,
      mandatory: []
    },
    listActiveCategory: {
      url: "/category/active/list",
      vFlag: 0,
      mandatory: []
    },
    delCategory: {
      url: "/category/delete",
      vFlag: 0,
      mandatory: []
    },
    undoCategory: {
      url: "/category/undo",
      vFlag: 0,
      mandatory: []
    },
    removeCategory: {
      url: "/category/remove",
      vFlag: 0,
      mandatory: []
    },
    addExpense: {
      url: "/expense/add",
      vFlag: 0,
      mandatory: []
    },
    editExpense: {
      url: "/expense/edit",
      vFlag: 0,
      mandatory: []
    },
    deleteExpense: {
      url: "/expense/delete",
      vFlag: 0,
      mandatory: []
    },
    updateExpense: {
      url: "/expense/update",
      vFlag: 0,
      mandatory: []
    },
    undoExpense: {
      url: "/expense/undo",
      vFlag: 0,
      mandatory: []
    },
    listExpense: {
      url: "/expense/list",
      vFlag: 0,
      mandatory: []
    },
    getSettings: {
      url: "/setting",
      vFlag: 0,
      mandatory: []
    },
    getExpenseById: {
      url: "/expense/expById",
      vFlag: 0,
      mandatory: []
    }
  },
  get: {
    helloRequest: {
      url: "/hello",
      vFlag: 0,
      mandatory: []
    },
    getBudget: {
      url: "/budget",
      vFlag: 0,
      mandatory: []
    }
  }
};

module.exports = apiRequest;
