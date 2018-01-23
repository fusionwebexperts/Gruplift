(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("/tables/jsgrid-db", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.tablesJsgridDb = mod.exports;
  }
})(this, function () {
  "use strict";

  (function () {

    var db = {

      loadData: function loadData(filter) {
        return $.grep(this.clients, function (client) {
          return (!filter.Nome || client.Nome.indexOf(filter.Nome) > -1) && (!filter.Morada || client.Morada.indexOf(filter.Morada) > -1) ;
        });
      },

      insertItem: function insertItem(insertingClient) {
        this.clients.push(insertingClient);
      },

      updateItem: function updateItem(updatingClient) {},

      deleteItem: function deleteItem(deletingClient) {
        var clientIndex = $.inArray(deletingClient, this.clients);
        this.clients.splice(clientIndex, 1);
      }

    };

    window.db = db;

    db.clients = [{
      "Nome": "Cliente Teste",
      "Morada": "Av. João Corte real nº231",
      "Data de registo": "20-15-2017",
      "Equipamentos": "<button class='equip'>Ver</button>",
      "Mais Informação": "<button class='equip'>Ver</button>",
    },
    {
      "Nome": "Cliente Teste",
      "Morada": "Av. João Corte real nº231",
      "Data de registo": "20-15-2017",
      "Equipamentos": "<button class='equip'>Ver</button>",
      "Mais Informação": "<button class='equip'>Ver</button>",
    },
    {
      "Nome": "Cliente Teste",
      "Morada": "Av. João Corte real nº231",
      "Data de registo": "20-15-2017",
      "Equipamentos": "<button class='equip'>Ver</button>",
      "Mais Informação": "<button class='equip'>Ver</button>",
    },
    {
      "Nome": "Cliente Teste",
      "Morada": "Av. João Corte real nº231",
      "Data de registo": "20-15-2017",
      "Equipamentos": "<button class='equip'>Ver</button>",
      "Mais Informação": "<button class='equip'>Ver</button>",
    },
    {
      "Nome": "Cliente Teste",
      "Morada": "Av. João Corte real nº231",
      "Data de registo": "20-15-2017",
      "Equipamentos": "<button class='equip'>Ver</button>",
      "Mais Informação": "<button class='equip'>Ver</button>",

    }];

    
  })();

  
});

